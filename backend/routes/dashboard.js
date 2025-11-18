const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { stats, memberWorkload } = require('../controllers/dashboard');

router
    .route('/stats')
    .get(protect, stats);

router
    .route('/member-workload/:memberId').get(protect, memberWorkload);

module.exports = router;