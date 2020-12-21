/**
 * 连接到数据库
 */
const { Sequelize, DataTypes, Op } = require('sequelize');
const dbConfig = require('./db')
const sequelize = new Sequelize(dbConfig.dev);
module.exports = { Sequelize, DataTypes, sequelize, Op }