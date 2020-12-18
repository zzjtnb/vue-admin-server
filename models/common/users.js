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
    loginname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: UNIQUE,
      primaryKey: true,
      autoIncrement: false,
      comment: "登录名称",
      field: "loginname"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: UNIQUE,
      primaryKey: false,
      autoIncrement: false,
      comment: "密码",
      field: "password"
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "昵称",
      field: "nickname"
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: "权限ID-对应roles.id",
      field: "roleId"
    },
    identity: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "角色类型 99 超级管理员  0普通用户",
      field: "identity"
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "登录token",
      field: "token"
    }
  };
  const options = {
    tableName: "users",
    comment: "",
    indexes: []
  };
  const UsersModel = sequelize.define("usersModel", attributes, options);
  return UsersModel;
};