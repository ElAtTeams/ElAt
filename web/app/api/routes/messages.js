const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const messageController = require('../controllers/messageController');

// Routes
router.post('/matches/:matchId/messages', protect, messageController.sendMessage);
router.get('/matches/:matchId/messages', protect, messageController.getMessages);
router.get('/unread-count', protect, messageController.getUnreadCount);
router.delete('/messages/:messageId', protect, messageController.deleteMessage);

module.exports = router; 