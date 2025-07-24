const User = require('../models/User');
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Profil bilgilerini getir
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        gender: user.gender,
        birthDate: user.birth_date,
        profilePhoto: user.profile_photo_url,
        bio: user.bio,
        location: {
          lat: user.location_lat,
          lng: user.location_lng
        },
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    }
  });
});

// Profil güncelle
exports.updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, bio, locationLat, locationLng } = req.body;

  const user = await User.updateProfile(req.user.id, {
    firstName,
    lastName,
    bio,
    locationLat,
    locationLng
  });

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        bio: user.bio,
        location: {
          lat: user.location_lat,
          lng: user.location_lng
        }
      }
    }
  });
});

// Profil fotoğrafı güncelle
exports.updateProfilePhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'Lütfen bir fotoğraf yükleyin'
    });
  }

  const photoUrl = `/uploads/${req.file.filename}`;
  const user = await User.updateProfilePhoto(req.user.id, photoUrl);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        profilePhoto: user.profile_photo_url
      }
    }
  });
});

// Kullanıcı ara
exports.searchUsers = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  const [rows] = await db.query(
    `SELECT id, first_name, last_name, profile_photo_url, bio
     FROM users 
     WHERE (first_name LIKE ? OR last_name LIKE ?)
       AND id != ?
       AND is_verified = 1
     LIMIT ? OFFSET ?`,
    [`%${query}%`, `%${query}%`, req.user.id, limit, offset]
  );

  res.status(200).json({
    success: true,
    data: {
      users: rows.map(user => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePhoto: user.profile_photo_url,
        bio: user.bio
      }))
    }
  });
}); 