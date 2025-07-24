const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Bağlantı testi
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Veritabanına bağlanırken hata:', err.stack);
  }
  console.log('Veritabanına başarıyla bağlandı');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
}; 