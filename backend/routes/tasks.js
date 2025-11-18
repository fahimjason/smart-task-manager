const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/tasks');

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

module.exports = router;
