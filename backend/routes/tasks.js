const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');
const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    reassignTask,
    checkCapacity,
    autoAssign
} = require('../controllers/tasks');

router
    .route('/')
    .get(protect, advancedResults(Task, 'projectId'), getTasks);

router
    .route('/')
    .post(protect, addTask);

router
    .route('/:id')
    .put(protect, updateTask);

router
    .route('/:id')
    .delete(protect, deleteTask);

router
    .route('/reassign')
    .get(protect, reassignTask);

router
    .route('/check-capacity')
    .post(protect, checkCapacity);

router
    .route('/auto-assign')
    .post(protect, autoAssign);

module.exports = router;
