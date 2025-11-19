const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Task = require('../models/Task');
const Team = require('../models/Team');
const Activity = require('../models/Activity');

// @desc      Get tasks
// @route     GET /api/v1/tasks
// @access    Private
exports.getTasks = asyncHandler(async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).populate('projectId');
        res.json(res.advancedResults);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Add task
// @route     POST /api/v1/tasks
// @access    Private
exports.addTask = asyncHandler(async (req, res, next) => {
    try {
        const { title, description, projectId, assignedTo, priority, status } = req.body;

        const task = new Task({
            title,
            description,
            projectId,
            assignedTo,
            priority,
            status,
            userId: req.user._id
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Update task
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.updateTask = asyncHandler(async (req, res, next) => {
    try {
        const updates = req.body;

        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        Object.keys(updates).forEach(key => {
            task[key] = updates[key];
        });

        await task.save();
        res.json(task);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Delete task
// @route     DELETE /api/v1/tasks/:id
// @access    Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Auto-reassign tasks
// @route     POST /api/v1/tasks/reassign
// @access    Private
exports.reassignTask = asyncHandler(async (req, res, next) => {
    try {
        const teams = await Team.find({ userId: req.user._id });
        const tasks = await Task.find({ userId: req.user._id, status: { $ne: 'Done' } });

        // Build member map with current task counts
        const memberMap = new Map();
        teams.forEach(team => {
            team.members.forEach(member => {
                memberMap.set(member._id.toString(), {
                    id: member._id,
                    name: member.name,
                    role: member.role,
                    capacity: member.capacity,
                    currentTasks: 0,
                    tasks: []
                });
            });
        });

        // Count current tasks per member
        tasks.forEach(task => {
            if (task.assignedTo) {
                const memberId = task.assignedTo.toString();
                if (memberMap.has(memberId)) {
                    const member = memberMap.get(memberId);
                    member.currentTasks++;
                    member.tasks.push(task);
                }
            }
        });

        const reassignments = [];
        let changesMade = 0;

        // Find overloaded members and their reassignable tasks
        memberMap.forEach((member) => {
            const overload = member.currentTasks - member.capacity;

            if (overload > 0) {
                // Get tasks that can be moved (Low and Medium priority only)
                const movableTasks = member.tasks
                    .filter(t => t.priority !== 'High')
                    .sort((a, b) => {
                        // Sort by priority: Low first, then Medium
                        if (a.priority === 'Low' && b.priority !== 'Low') return -1;
                        if (a.priority !== 'Low' && b.priority === 'Low') return 1;
                        return 0;
                    })
                    .slice(0, overload);

                // Try to reassign each movable task
                movableTasks.forEach(task => {
                    // Find available members with capacity
                    const availableMembers = Array.from(memberMap.values())
                        .filter(m => {
                            // Must have capacity and not be the current assignee
                            return m.currentTasks < m.capacity && m.id.toString() !== member.id.toString();
                        })
                        .sort((a, b) => a.currentTasks - b.currentTasks);

                    if (availableMembers.length > 0) {
                        const newMember = availableMembers[0];

                        // Update task
                        task.assignedTo = newMember.id;

                        // Update member counts
                        member.currentTasks--;
                        newMember.currentTasks++;

                        reassignments.push({
                            taskId: task._id,
                            taskTitle: task.title,
                            fromMember: member.name,
                            toMember: newMember.name,
                            task: task
                        });

                        changesMade++;
                    }
                });
            }
        });

        // Save all updated tasks and log activities
        for (const reassignment of reassignments) {
            await reassignment.task.save();

            // Log activity
            const activity = new Activity({
                message: `Task "${reassignment.taskTitle}" reassigned from ${reassignment.fromMember} to ${reassignment.toMember}`,
                userId: req.user._id
            });
            await activity.save();
        }

        res.json({
            message: `Reassignment complete! ${changesMade} task(s) reassigned.`,
            count: changesMade,
            reassignments: reassignments.map(r => ({
                taskTitle: r.taskTitle,
                from: r.fromMember,
                to: r.toMember
            }))
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.checkCapacity = asyncHandler(async (req, res, next) => {
    try {
        const { memberId, teamId } = req.body;

        const team = await Team.findOne({ _id: teamId, userId: req.user._id });

        if (!team) {
            return next(new ErrorResponse('Team not found', 404));
        }

        const member = team.members.id(memberId);
        if (!member) {
            return next(new ErrorResponse('Member not found', 404));
        }

        // Count current active tasks for this member
        const currentTasks = await Task.countDocuments({
            assignedTo: memberId,
            userId: req.user._id,
            status: { $ne: 'Done' }
        });

        const isOverCapacity = currentTasks >= member.capacity;

        res.json({
            member: {
                name: member.name,
                capacity: member.capacity,
                currentTasks: currentTasks
            },
            isOverCapacity,
            warning: isOverCapacity
                ? `${member.name} has ${currentTasks} tasks but capacity is ${member.capacity}. Assign anyway?`
                : null
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.autoAssign = asyncHandler(async (req, res, next) => {
    try {
        const { teamId } = req.body;

        const team = await Team.findOne({ _id: teamId, userId: req.user._id });

        if (!team) {
            return next(new ErrorResponse('Team not found', 404));
        }

        // Get task counts for all members
        const memberLoads = await Promise.all(
            team.members.map(async (member) => {
                const taskCount = await Task.countDocuments({
                    assignedTo: member._id,
                    userId: req.user._id,
                    status: { $ne: 'Done' }
                });

                return {
                    id: member._id,
                    name: member.name,
                    capacity: member.capacity,
                    currentTasks: taskCount,
                    hasCapacity: taskCount < member.capacity
                };
            })
        );

        // Sort by current load (ascending)
        memberLoads.sort((a, b) => a.currentTasks - b.currentTasks);

        // Prefer members with available capacity, otherwise pick least loaded
        const recommendedMember = memberLoads.find(m => m.hasCapacity) || memberLoads[0];

        res.json({
            recommended: recommendedMember,
            allMembers: memberLoads
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});