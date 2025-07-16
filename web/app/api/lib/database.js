const mysql = require('mysql2/promise');
require('dotenv').config();

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Guluban.234",
      database: "community_app",
    });
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

module.exports = { createConnection }; 