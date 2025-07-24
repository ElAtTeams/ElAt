const fs = require('fs');
const path = require('path');
const db = require('../config/database');

async function migrate() {
  try {
    // schema.sql dosyasını oku
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );

    // Her bir SQL komutunu ayrı ayrı çalıştır
    const queries = schema
      .split(';')
      .filter(query => query.trim().length > 0);

    for (const query of queries) {
      await db.query(query);
      console.log('Query başarıyla çalıştırıldı:', query.slice(0, 50) + '...');
    }

    console.log('Veritabanı başarıyla oluşturuldu!');
    process.exit(0);
  } catch (error) {
    console.error('Migration hatası:', error);
    process.exit(1);
  }
}

migrate(); 