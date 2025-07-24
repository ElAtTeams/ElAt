const Message = require('../models/Message');
const Match = require('../models/Match');
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Mesaj gönder
exports.sendMessage = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const { content } = req.body;

  // Eşleşme kontrolü
  const match = await Match.findById(matchId, req.user.id);
  if (!match) {
    return res.status(404).json({
      success: false,
      error: 'Eşleşme bulunamadı'
    });
  }

  if (match.status !== 'accepted') {
    return res.status(400).json({
      success: false,
      error: 'Bu eşleşmeye mesaj gönderilemez'
    });
  }

  // Alıcıyı belirle
  const receiverId = match.user1_id === req.user.id ? match.user2_id : match.user1_id;

  const message = await Message.create(matchId, req.user.id, receiverId, content);

  res.status(201).json({
    success: true,
    data: { message }
  });
});

// Mesajları getir
exports.getMessages = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  // Eşleşme kontrolü
  const match = await Match.findById(matchId, req.user.id);
  if (!match) {
    return res.status(404).json({
      success: false,
      error: 'Eşleşme bulunamadı'
    });
  }

  const messages = await Message.findByMatchId(matchId, page, limit);

  // Mesajları okundu olarak işaretle
  await Message.markAsRead(matchId, req.user.id);

  res.status(200).json({
    success: true,
    data: { messages }
  });
});

// Okunmamış mesaj sayısını getir
exports.getUnreadCount = asyncHandler(async (req, res) => {
  const unreadCount = await Message.getUnreadCount(req.user.id);

  res.status(200).json({
    success: true,
    data: { unreadCount }
  });
});

// Mesaj sil
exports.deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const deleted = await Message.delete(messageId, req.user.id);
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Mesaj bulunamadı'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Mesaj başarıyla silindi'
  });
}); 