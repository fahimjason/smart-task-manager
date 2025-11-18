const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Team = require('../models/Team');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Activity = require('../models/Activity');

// @desc      Get dashboard statistics
// @route     GET /api/v1/dashboard/stats
// @access    Private
exports.stats = asyncHandler(async (req, res, next) => {
    try {
        // Get counts
        const totalProjects = await Project.countDocuments({ userId: req.user._id });
        const totalTasks = await Task.countDocuments({ userId: req.user._id });
        const completedTasks = await Task.countDocuments({
            userId: req.user._id,
            status: 'Done'
        });
        const pendingTasks = await Task.countDocuments({
            userId: req.user._id,
            status: 'Pending'
        });
        const inProgressTasks = await Task.countDocuments({
            userId: req.user._id,
            status: 'In Progress'
        });
        const totalTeams = await Team.countDocuments({ userId: req.user._id });

        // Get team workload data
        const teams = await Team.find({ userId: req.user._id });
        const teamWorkload = [];

        for (const team of teams) {
            const memberWorkloads = await Promise.all(
                team.members.map(async (member) => {
                    const currentTasks = await Task.countDocuments({
                        assignedTo: member._id,
                        userId: req.user._id,
                        status: { $ne: 'Done' }
                    });

                    return {
                        id: member._id,
                        name: member.name,
                        role: member.role,
                        capacity: member.capacity,
                        currentTasks,
                        isOverloaded: currentTasks > member.capacity
                    };
                })
            );

            teamWorkload.push({
                teamId: team._id,
                teamName: team.name,
                members: memberWorkloads
            });
        }

        // Get recent activity
        const recentActivity = await Activity.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(5);

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

// @desc      Get member workload details
// @route     GET /api/v1/dashboard/member-workload/:memberId
// @access    Private
exports.memberWorkload = asyncHandler(async (req, res, next) => {
    try {
        const tasks = await Task.find({
            assignedTo: req.params.memberId,
            userId: req.user._id,
            status: { $ne: 'Done' }
        }).populate('projectId');

        res.json({
            tasks,
            count: tasks.length
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});