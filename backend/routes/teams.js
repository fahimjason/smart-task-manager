const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getTeams, addTeam, updateTeam, deleteTeam } = require('../controllers/teams');

router
  .route('/')
  .get(protect, getTeams);

router
  .route('/')
  .post(protect, addTeam);


router
  .route('/:id')
  .put(protect, updateTeam);

// Delete team
router
  .route('/:id')
  .delete(protect, deleteTeam);

module.exports = router;
