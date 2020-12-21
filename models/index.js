'use strict';
const { sequelize, Sequelize, Op } = require('../config/sequelize')

/**
 * 引入模型
 */
const UsersModel = require('./common/users');
const RolesModel = require('./common/roles');
const MenusModel = require('./common/menus');
/**
 * 实例化模型
 */
const usersModel = UsersModel(sequelize);
const rolesModel = RolesModel(sequelize);
const menusModel = MenusModel(sequelize);

/**
 * 建立模型之间的关系
 */
// rolesModel.hasMany(usersModel, { foreignKey: 'role_id', targetKey: 'id' });
// rolesModel.belongsTo(menusModel, { targetKey: 'id', foreignKey: 'roleId' });
// userModule.hasOne(rolesModel, { foreignKey: 'id', sourceKey: 'role_id' })
usersModel.belongsTo(rolesModel, { targetKey: 'id', foreignKey: 'roleId' });

/**
 * 测试连接,同步数据
 */
// sequelize.authenticate()
//   .then(() => {
//     // console.log('MySql Connection has been established successfully.');
//     // sequelize.sync({ force: true });
//     sequelize.sync();
//     // console.log("所有模型均已成功同步.");
//   })
//   .catch(err => {
//     console.log('Unable to connect to the database:', err);
//   });

module.exports = {
  usersModel, menusModel, rolesModel, Sequelize, sequelize, Op
};

// mysql默认0为fasle,1为true