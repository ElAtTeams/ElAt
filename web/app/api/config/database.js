const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Creating MySQL connection pool with config:', {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'elat_dating'
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'elat_dating',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00'
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('MySQL bağlantısı başarılı');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL bağlantı hatası:', err);
    process.exit(1);
  });

// Query wrapper for error logging
const executeQuery = async (query, params) => {
  try {
    console.log('Executing query:', query);
    console.log('Query params:', params);
    const result = await pool.query(query, params);
    console.log('Query result:', result);
    return result;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

module.exports = {
  query: executeQuery,
  pool
}; 