const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    // Veritabanını oluştur
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'elat_dating'}`);
    await connection.query(`USE ${process.env.DB_NAME || 'elat_dating'}`);

    // Schema dosyasını oku
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );

    // SQL komutlarını çalıştır
    await connection.query(schema);

    console.log('Veritabanı ve tablolar başarıyla oluşturuldu!');
    process.exit(0);
  } catch (error) {
    console.error('Migration hatası:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

migrate(); 