const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { summary, stats, overloadMembers, memberWorkload } = require('../controllers/dashboard');

router
    .route('/summary')
    .get(protect, summary);

router
    .route('/stats')
    .get(protect, stats);

router
    .route('/overloaded-members')
    .get(protect, overloadMembers);

router
    .route('/member-workload/:memberId')
    .get(protect, memberWorkload);

module.exports = router;