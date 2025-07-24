const db = require('../config/database');

class Match {
  static async create(userId, targetUserId, status = 'pending') {
    const [result] = await db.query(
      `INSERT INTO matches (user1_id, user2_id, status, created_at, updated_at)
       VALUES (?, ?, ?, NOW(), NOW())`,
      [userId, targetUserId, status]
    );
    return this.findById(result.insertId, userId);
  }

  static async findExisting(userId, targetUserId) {
    const [rows] = await db.query(
      `SELECT * FROM matches 
       WHERE (user1_id = ? AND user2_id = ?)
       OR (user1_id = ? AND user2_id = ?)`,
      [userId, targetUserId, targetUserId, userId]
    );
    return rows[0];
  }

  static async updateStatus(matchId, status) {
    await db.query(
      'UPDATE matches SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, matchId]
    );
    return this.findById(matchId);
  }

  static async findById(matchId, userId) {
    const [rows] = await db.query(
      `SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.profile_photo_url,
        u.bio,
        u.location_lat,
        u.location_lng
       FROM matches m
       JOIN users u ON (
         CASE 
           WHEN m.user1_id = ? THEN m.user2_id
           ELSE m.user1_id
         END = u.id
       )
       WHERE m.id = ? AND (m.user1_id = ? OR m.user2_id = ?)`,
      [userId, matchId, userId, userId]
    );
    return rows[0];
  }

  static async findAllByUser(userId, status = 'accepted') {
    const [rows] = await db.query(
      `SELECT 
        m.id as match_id,
        m.status,
        m.created_at,
        u.id,
        u.first_name,
        u.last_name,
        u.profile_photo_url,
        CASE 
          WHEN m.user1_id = ? THEN m.user2_id
          ELSE m.user1_id
        END as matched_user_id
       FROM matches m
       JOIN users u ON (
         CASE 
           WHEN m.user1_id = ? THEN m.user2_id
           ELSE m.user1_id
         END = u.id
       )
       WHERE (m.user1_id = ? OR m.user2_id = ?)
         AND m.status = ?
       ORDER BY m.created_at DESC`,
      [userId, userId, userId, userId, status]
    );
    return rows;
  }

  static async delete(matchId, userId) {
    const [result] = await db.query(
      `DELETE FROM matches 
       WHERE id = ? AND (user1_id = ? OR user2_id = ?)`,
      [matchId, userId, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Match; 