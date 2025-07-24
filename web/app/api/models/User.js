const { query } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  static async create({ firstName, lastName, email, password, gender, birthDate }) {
    try {
      console.log('Creating user with data:', {
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        passwordLength: password?.length
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('Password hashed successfully');

      const [result] = await query(
        `INSERT INTO users 
        (first_name, last_name, email, password, gender, birth_date, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [firstName, lastName, email, hashedPassword, gender, birthDate]
      );
      console.log('Insert query result:', result);

      if (!result.insertId) {
        throw new Error('Kullanıcı oluşturulamadı: Insert ID alınamadı');
      }

      const user = await this.findById(result.insertId);
      console.log('Created user:', user);

      return user;
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await query(
      `SELECT id, first_name, last_name, email, gender, 
      birth_date, profile_photo_url, bio, location_lat, 
      location_lng, is_verified, created_at, updated_at 
      FROM users WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async updatePassword(userId, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await query(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
      [hashedPassword, userId]
    );
  }

  static async saveResetToken(userId, resetToken, resetTokenExpiry) {
    await query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ?, updated_at = NOW() WHERE id = ?',
      [resetToken, resetTokenExpiry, userId]
    );
  }

  static async findByResetToken(resetToken) {
    const [rows] = await query(
      'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
      [resetToken]
    );
    return rows[0];
  }

  static async verifyEmail(userId) {
    await query(
      'UPDATE users SET is_verified = 1, verification_token = NULL, updated_at = NOW() WHERE id = ?',
      [userId]
    );
  }

  static async saveVerificationToken(userId, verificationToken) {
    await query(
      'UPDATE users SET verification_token = ?, updated_at = NOW() WHERE id = ?',
      [verificationToken, userId]
    );
  }

  static async findByVerificationToken(token) {
    const [rows] = await query(
      'SELECT * FROM users WHERE verification_token = ?',
      [token]
    );
    return rows[0];
  }

  static async updateProfile(userId, data) {
    const { firstName, lastName, bio, locationLat, locationLng } = data;

    await query(
      `UPDATE users SET 
      first_name = ?, 
      last_name = ?, 
      bio = ?, 
      location_lat = ?, 
      location_lng = ?,
      updated_at = NOW() 
      WHERE id = ?`,
      [firstName, lastName, bio, locationLat, locationLng, userId]
    );

    return this.findById(userId);
  }

  static async updateProfilePhoto(userId, photoUrl) {
    await query(
      'UPDATE users SET profile_photo_url = ?, updated_at = NOW() WHERE id = ?',
      [photoUrl, userId]
    );

    return this.findById(userId);
  }

  static generateAuthToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '1d' }
    );
  }
}

module.exports = User;