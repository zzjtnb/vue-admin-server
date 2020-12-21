'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes, UNIQUE) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: null,
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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt",
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt",
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
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