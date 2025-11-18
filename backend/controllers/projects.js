const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');

// @desc      Get projects
// @route     GET /api/v1/projects
// @access    Private
exports.getProjects = asyncHandler(async (req, res, next) => {
    try {
        const projects = await Project.find({ userId: req.user._id }).populate('teamId');

        res.json(projects);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Add project
// @route     POST /api/v1/projects
// @access    Private
exports.addProject = asyncHandler(async (req, res, next) => {
    try {
        const { name, teamId } = req.body;

        const project = new Project({
            name,
            teamId,
            userId: req.user._id
        });

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Update project
// @route     PUT /api/v1/projects/:id
// @access    Private
exports.updateProject = asyncHandler(async (req, res, next) => {
    try {
        const { name, teamId } = req.body;

        const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.name = name || project.name;
        project.teamId = teamId || project.teamId;

        await project.save();
        res.json(project);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// @desc      Delete project
// @route     DELETE /api/v1/projects/:id
// @access    Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});