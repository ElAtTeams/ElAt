import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function createConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Guluban.234',
    database: process.env.DB_NAME || 'elat_app',
  });
} 