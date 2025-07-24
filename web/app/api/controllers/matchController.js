const Match = require('../models/Match');
const Message = require('../models/Message');
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Eşleşme oluştur
exports.createMatch = asyncHandler(async (req, res) => {
  const { targetUserId } = req.body;

  // Mevcut eşleşme kontrolü
  const existingMatch = await Match.findExisting(req.user.id, targetUserId);
  if (existingMatch) {
    return res.status(400).json({
      success: false,
      error: 'Bu kullanıcı ile zaten bir eşleşmeniz var'
    });
  }

  const match = await Match.create(req.user.id, targetUserId);

  res.status(201).json({
    success: true,
    data: { match }
  });
});

// Eşleşme durumunu güncelle
exports.updateMatchStatus = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz eşleşme durumu'
    });
  }

  const match = await Match.updateStatus(matchId, status);
  if (!match) {
    return res.status(404).json({
      success: false,
      error: 'Eşleşme bulunamadı'
    });
  }

  res.status(200).json({
    success: true,
    data: { match }
  });
});

// Eşleşme detaylarını getir
exports.getMatch = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  
  const match = await Match.findById(matchId, req.user.id);
  if (!match) {
    return res.status(404).json({
      success: false,
      error: 'Eşleşme bulunamadı'
    });
  }

  res.status(200).json({
    success: true,
    data: { match }
  });
});

// Tüm eşleşmeleri getir
exports.getMatches = asyncHandler(async (req, res) => {
  const { status = 'accepted' } = req.query;
  const matches = await Match.findAllByUser(req.user.id, status);

  res.status(200).json({
    success: true,
    data: { matches }
  });
});

// Eşleşmeyi sil
exports.deleteMatch = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  
  const deleted = await Match.delete(matchId, req.user.id);
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Eşleşme bulunamadı'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Eşleşme başarıyla silindi'
  });
}); 