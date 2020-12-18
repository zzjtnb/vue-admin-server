const {
  DataTypes, UNIQUE
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: UNIQUE,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "规则名称",
      field: "title"
    },
    roleType: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: "角色类型 1 超级管理员 2 普通会员",
      field: "roleType"
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "权限 ，对应menus.id 逗号隔开的字符串",
      field: "rules"
    }
  };
  const options = {
    tableName: "roles",
    comment: "",
    indexes: []
  };
  const RolesModel = sequelize.define("rolesModel", attributes, options);
  return RolesModel;
};