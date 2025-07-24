const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const matchController = require('../controllers/matchController');

// Routes
router.post('/', protect, matchController.createMatch);
router.get('/', protect, matchController.getMatches);
router.get('/:matchId', protect, matchController.getMatch);
router.put('/:matchId/status', protect, matchController.updateMatchStatus);
router.delete('/:matchId', protect, matchController.deleteMatch);

module.exports = router; 