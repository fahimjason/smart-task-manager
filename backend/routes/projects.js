const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProjects, addProject, updateProject, deleteProject } = require('../controllers/projects');

router
  .route('/')
  .get(protect, getProjects);

router
  .route('/')
  .post(protect, addProject);

router
  .route('/:id')
  .put(protect, updateProject);

router
  .route('/:id')
  .delete(protect, deleteProject);

module.exports = router;
