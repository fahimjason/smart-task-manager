const express = require('express');
const { protect } = require('../middleware/auth');
const { getActivities, addActivity } = require('../controllers/activity');


const router = express.Router();

router
  .route('/')
  .get(protect, getActivities);

router
  .route('/')
  .post(protect, addActivity);

module.exports = router;
