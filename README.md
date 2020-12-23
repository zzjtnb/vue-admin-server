# vue-admin-server
vue admin server mysql + express

//替换导出方式
const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
---------------------------------------------------
'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
---------------------------------------------------
//替换null
      allowNull: false,
      defaultValue: null,
---------------------------------------------------
      allowNull: false,
      defaultValue: DataTypes.UNIQUE,
---------------------------------------------------
//替换时间
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt"
    }


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