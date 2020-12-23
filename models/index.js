const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const modelsPath = path.join(__dirname, 'common')
const db = {};
/**
 * 连接到数据库
 */
// mysql默认0为fasle,1为true
const { Sequelize, DataTypes, Op } = require('sequelize');
const dbConfig = require('../config/db')
const sequelize = new Sequelize(dbConfig.dev);

fs.readdirSync(modelsPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, DataTypes)
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op
module.exports = db;