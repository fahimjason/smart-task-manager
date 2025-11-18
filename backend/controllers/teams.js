const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Team = require('../models/Team');

// @desc      Get teams
// @route     GET /api/v1/teams
// @access    Private
exports.getTeams = asyncHandler(async (req, res, next) => {
    try {
        const teams = await Team.find({ userId: req.user._id });
        
        res.json(teams);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Add team
// @route     POST /api/v1/teams
// @access    Private
exports.addTeam = asyncHandler(async (req, res, next) => {
    try {
        const { name, members } = req.body;

        const team = new Team({
            name,
            members,
            userId: req.user._id
        });

        await team.save();

        res.status(201).json(team);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Update team
// @route     PUT /api/v1/teams/:id
// @access    Private
exports.updateTeam = asyncHandler(async (req, res, next) => {
    try {
        const { name, members } = req.body;

        const team = await Team.findOne({ _id: req.params.id, userId: req.user._id });

        if (!team) {
            return next(new ErrorResponse('Team not found', 404));
        }

        team.name = name || team.name;
        team.members = members || team.members;

        await team.save();

        res.json(team);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Delete team
// @route     DELETE /api/v1/teams/:id
// @access    Private
exports.deleteTeam = asyncHandler(async (req, res, next) => {
    try {
        const team = await Team.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!team) {
            return next(new ErrorResponse('Team not found', 404));
        }

        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});