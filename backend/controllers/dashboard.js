const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Team = require('../models/Team');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Activity = require('../models/Activity');

// @desc      Get summary statistics
// @route     GET /api/v1/dashboard/summary
// @access    Private
exports.summary = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Parallel execution of minimal queries
        const [projectCount, taskCounts, teamCount] = await Promise.all([
            Project.countDocuments({ userId }),
            Task.aggregate([
                { $match: { userId } },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]),
            Team.countDocuments({ userId })
        ]);

        // Transform aggregated task counts
        const taskStats = {
            total: 0,
            completed: 0,
            pending: 0,
            inProgress: 0
        };

        taskCounts.forEach(item => {
            taskStats.total += item.count;
            if (item._id === 'Done') taskStats.completed = item.count;
            if (item._id === 'Pending') taskStats.pending = item.count;
            if (item._id === 'In Progress') taskStats.inProgress = item.count;
        });

        res.json({
            projects: projectCount,
            tasks: taskStats,
            teams: teamCount
        });
    } catch (error) {
        console.error('Dashboard summary error:', error);
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Get dashboard statistics
// @route     GET /api/v1/dashboard/stats
// @access    Private
exports.stats = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Execute all counts in parallel using Promise.all for better performance
        const [
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks,
            totalTeams,
            teams,
            recentActivity
        ] = await Promise.all([
            Project.countDocuments({ userId }),
            Task.countDocuments({ userId }),
            Task.countDocuments({ userId, status: 'Done' }),
            Task.countDocuments({ userId, status: 'Pending' }),
            Task.countDocuments({ userId, status: 'In Progress' }),
            Team.countDocuments({ userId }),
            Team.find({ userId }).lean(),
            Activity.find({ userId })
                .sort({ createdAt: -1 })
                .limit(5)
                .lean()
                .select('message createdAt')
        ]);

        // Get all active tasks for workload calculation in one query
        const activeTasks = await Task.find({
            userId,
            status: { $ne: 'Done' }
        })
            .lean()
            .select('assignedTo');

        // Build member task count map for O(1) lookups
        const memberTaskCountMap = new Map();
        activeTasks.forEach(task => {
            if (task.assignedTo) {
                const memberId = task.assignedTo.toString();
                memberTaskCountMap.set(memberId, (memberTaskCountMap.get(memberId) || 0) + 1);
            }
        });

        // Build team workload efficiently
        const teamWorkload = teams.map(team => {
            const memberWorkloads = team.members.map(member => {
                const memberId = member._id.toString();
                const currentTasks = memberTaskCountMap.get(memberId) || 0;

                return {
                    id: member._id,
                    name: member.name,
                    role: member.role,
                    capacity: member.capacity,
                    currentTasks,
                    isOverloaded: currentTasks > member.capacity
                };
            });

            return {
                teamId: team._id,
                teamName: team.name,
                members: memberWorkloads
            };
        });

        res.json({
            stats: {
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                inProgressTasks,
                totalTeams
            },
            teamWorkload,
            recentActivity
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Get overloaded members only
// @route     GET /api/v1/dashboard/overloaded-members
// @access    Private
exports.overloadMembers = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id

        // Get teams and active tasks in parallel
        const [teams, activeTasks] = await Promise.all([
            Team.find({ userId }).lean(),
            Task.find({ userId, status: { $ne: 'Done' } })
                .lean()
                .select('assignedTo')
        ]);

        // Build task count map
        const memberTaskCountMap = new Map();
        activeTasks.forEach(task => {
            if (task.assignedTo) {
                const memberId = task.assignedTo.toString();
                memberTaskCountMap.set(memberId, (memberTaskCountMap.get(memberId) || 0) + 1);
            }
        });

        // Find only overloaded members
        const overloadedMembers = [];
        teams.forEach(team => {
            team.members.forEach(member => {
                const memberId = member._id.toString();
                const currentTasks = memberTaskCountMap.get(memberId) || 0;

                if (currentTasks > member.capacity) {
                    overloadedMembers.push({
                        id: member._id,
                        name: member.name,
                        role: member.role,
                        capacity: member.capacity,
                        currentTasks,
                        overloadBy: currentTasks - member.capacity,
                        teamName: team.name
                    });
                }
            });
        });

        res.json({
            count: overloadedMembers.length,
            members: overloadedMembers
        });
    } catch (error) {
        console.error('Overloaded members error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc      Get member workload details
// @route     GET /api/v1/dashboard/member-workload/:memberId
// @access    Private
exports.memberWorkload = asyncHandler(async (req, res, next) => {
    try {
        const { memberId } = req.params;

        // Single query with populated projectId and only needed fields
        const [tasks, count] = await Promise.all([
            Task.find({
                assignedTo: memberId,
                userId: req.user._id,
                status: { $ne: 'Done' }
            })
                .populate('projectId', 'name')
                .lean()
                .select('title description priority status projectId createdAt'),
            Task.countDocuments({
                assignedTo: memberId,
                userId: req.user._id,
                status: { $ne: 'Done' }
            })
        ]);

        res.json({
            tasks,
            count
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});