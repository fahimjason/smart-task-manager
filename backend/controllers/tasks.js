const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Task = require('../models/Task');

// @desc      Get tasks
// @route     GET /api/v1/tasks
// @access    Private
exports.getTasks = asyncHandler(async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).populate('projectId');
        res.json(tasks);
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
