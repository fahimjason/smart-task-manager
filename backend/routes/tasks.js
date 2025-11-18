const express = require('express');
const router = express.Router();
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
    .get(protect, getTasks);

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
