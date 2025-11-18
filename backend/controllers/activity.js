const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Activity = require('../models/Activity');

// @desc      Get activities
// @route     GET /api/v1/activities
// @access    Private
exports.getActivities = asyncHandler(async (req, res, next) => {
    try {
        const activities = await Activity.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(10);
            
        res.json(activities);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Add activities
// @route     POST /api/v1/activities
// @access    Private
exports.addActivity = asyncHandler(async (req, res, next) => {
    try {
        const { message } = req.body;

        const activity = new Activity({
            message,
            userId: req.user._id
        });

        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});