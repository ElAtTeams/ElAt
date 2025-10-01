"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || 'postgres://elatuser:elatpass@localhost:5432/elatdb', {
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
