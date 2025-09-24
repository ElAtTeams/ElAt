const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://elatuser:elatpass@localhost:5432/elatdb', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;