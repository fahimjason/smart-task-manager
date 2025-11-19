const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const Activity = require('../models/Activity');
const { protect } = require('../middleware/auth');
const { getActivities, addActivity } = require('../controllers/activity');

const router = express.Router();

router
    .route('/')
    .get(protect, advancedResults(Activity), getActivities);

router
    .route('/')
    .post(protect, addActivity);

module.exports = router;
