/**
 * 连接到数据库
 */
const { Sequelize, DataTypes, Op } = require('sequelize');
const dbConfig = require('./dbConfig')
const sequelize = new Sequelize(dbConfig.test);
module.exports = { Sequelize, DataTypes, sequelize, Op }