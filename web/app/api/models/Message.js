const db = require('../config/database');

class Message {
  static async create(matchId, senderId, receiverId, content) {
    const [result] = await db.query(
      `INSERT INTO messages (match_id, sender_id, receiver_id, content, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [matchId, senderId, receiverId, content]
    );
    return this.findById(result.insertId);
  }

  static async findById(messageId) {
    const [rows] = await db.query(
      `SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.profile_photo_url
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.id = ?`,
      [messageId]
    );
    return rows[0];
  }

  static async findByMatchId(matchId, page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    const [rows] = await db.query(
      `SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.profile_photo_url
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.match_id = ?
       ORDER BY m.created_at DESC
       LIMIT ? OFFSET ?`,
      [matchId, limit, offset]
    );
    return rows;
  }

  static async markAsRead(matchId, userId) {
    const [result] = await db.query(
      `UPDATE messages 
       SET is_read = 1 
       WHERE match_id = ? 
       AND receiver_id = ? 
       AND is_read = 0`,
      [matchId, userId]
    );
    return result.affectedRows;
  }

  static async getUnreadCount(userId) {
    const [rows] = await db.query(
      `SELECT COUNT(*) as unread_count
       FROM messages
       WHERE receiver_id = ? AND is_read = 0`,
      [userId]
    );
    return rows[0].unread_count;
  }

  static async delete(messageId, userId) {
    const [result] = await db.query(
      `DELETE FROM messages 
       WHERE id = ? AND sender_id = ?`,
      [messageId, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Message; 