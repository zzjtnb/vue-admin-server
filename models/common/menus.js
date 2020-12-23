'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: DataTypes.UNIQUE,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "类型 1:目录 2:菜单 3 按钮",
      field: "type"
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "图标",
      field: "icon"
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "标题",
      field: "title"
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "路由地址",
      field: "path"
    },
    component: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "组件路径",
      field: "component"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题",
      field: "name"
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "组件参数",
      field: "permissions"
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "排序",
      field: "sort"
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "上级类目-对应menus.id",
      field: "pid"
    },
    redirect: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "重定向地址，在面包屑中点击会重定向去的地址",
      field: "redirect"
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      primaryKey: false,
      autoIncrement: false,
      comment: "当设置 true 的时候该路由不会在侧边栏出现(默认 false)",
      field: "hidden"
    },
    alwaysShow: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      primaryKey: false,
      autoIncrement: false,
      comment: "路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式",
      field: "alwaysShow"
    },
    breadcrumb: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      primaryKey: false,
      autoIncrement: false,
      comment: " 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)",
      field: "breadcrumb"
    },
    noCache: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      primaryKey: false,
      autoIncrement: false,
      comment: "如果设置为true，则不会被 <keep-alive> 缓存(默认 false)",
      field: "noCache"
    },
    affix: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      primaryKey: false,
      autoIncrement: false,
      comment: "如果设置为true，它则会固定在tags-view中(默认 false)",
      field: "affix"
    },
    activeMenu: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "高亮相对应的侧边栏",
      field: "activeMenu"
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
    tableName: "menus",
    comment: "",
    indexes: []
  };
  const MenusModel = sequelize.define("menusModel", attributes, options);
  return MenusModel;
};