/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : vuerole

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 27/12/2020 01:25:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` int(11) NULL DEFAULT NULL COMMENT '类型 1:目录 2:菜单 3 按钮',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '图标',
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '标题',
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '路由地址',
  `component` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '组件路径',
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题',
  `permissions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '组件参数',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `pid` int(11) NULL DEFAULT NULL COMMENT '上级类目-对应menus.id',
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '重定向地址，在面包屑中点击会重定向去的地址',
  `hidden` tinyint(1) NULL DEFAULT 0 COMMENT '当设置 true 的时候该路由不会在侧边栏出现(默认 false)',
  `alwaysShow` tinyint(1) NULL DEFAULT 1 COMMENT '路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式',
  `breadcrumb` tinyint(1) NULL DEFAULT 1 COMMENT ' 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)',
  `noCache` tinyint(1) NULL DEFAULT 0 COMMENT '如果设置为true，则不会被 <keep-alive> 缓存(默认 false)',
  `affix` tinyint(1) NULL DEFAULT 0 COMMENT '如果设置为true，它则会固定在tags-view中(默认 false)',
  `activeMenu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '高亮相对应的侧边栏',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 1, 'el-icon-s-home', '首页', '/', 'Layout', 'home', NULL, 1, 0, '/home', 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 13:24:41');
INSERT INTO `menus` VALUES (2, 2, NULL, '首页', 'home', 'home/index', NULL, NULL, 1, 1, NULL, 0, 0, 0, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:52:21');
INSERT INTO `menus` VALUES (3, 1, 'el-icon-setting', '系统管理', '/system', 'Layout', NULL, NULL, 3, 0, '/system/menu', 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 15:19:26');
INSERT INTO `menus` VALUES (4, 2, 'el-icon-s-order', '菜单管理', '/system/menu', 'system/menu/index', NULL, NULL, 1, 3, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:52:32');
INSERT INTO `menus` VALUES (5, 3, NULL, '新增菜单', NULL, NULL, NULL, 'add', 1, 4, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:52:51');
INSERT INTO `menus` VALUES (6, 3, NULL, '删除菜单', NULL, NULL, NULL, 'delete', 2, 4, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:52:56');
INSERT INTO `menus` VALUES (7, 3, NULL, '编辑菜单', NULL, NULL, NULL, 'edit', 3, 4, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:53:00');
INSERT INTO `menus` VALUES (8, 2, 'el-icon-s-custom', '用户管理', '/system/users', 'system/users/index', 'user', NULL, 2, 3, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:52:37');
INSERT INTO `menus` VALUES (9, 3, NULL, '新增用户', NULL, NULL, NULL, 'add', 1, 8, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:53:06');
INSERT INTO `menus` VALUES (10, 3, NULL, '删除用户', NULL, NULL, NULL, 'delete', 2, 8, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:53:13');
INSERT INTO `menus` VALUES (11, 3, NULL, '编辑用户', NULL, NULL, NULL, 'edit', 3, 8, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:53:18');
INSERT INTO `menus` VALUES (12, 2, 'el-icon-s-flag', '权限管理', '/system/roles', 'system/roles/index', 'roles', NULL, 3, 3, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:52:45');
INSERT INTO `menus` VALUES (13, 3, NULL, '新增权限', NULL, NULL, NULL, 'add', 4, 12, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-24 19:51:44');
INSERT INTO `menus` VALUES (14, 3, NULL, '删除权限', NULL, NULL, NULL, 'delete', 2, 12, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 15:22:43');
INSERT INTO `menus` VALUES (15, 3, NULL, '编辑权限', NULL, NULL, NULL, 'edit', 3, 12, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 15:22:50');
INSERT INTO `menus` VALUES (16, 3, NULL, '用户授权', NULL, NULL, NULL, 'authorize', 1, 12, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 15:22:50');
INSERT INTO `menus` VALUES (17, 2, 'fa fa-windows', 'IP白名单', '/system/whitelist', 'system/whitelist/index', NULL, NULL, 4, 3, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-26 23:43:07', '2020-12-26 23:43:27');
INSERT INTO `menus` VALUES (18, 3, NULL, '新增IP', NULL, NULL, NULL, 'add', 1, 17, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-26 23:45:49', '2020-12-26 23:45:49');
INSERT INTO `menus` VALUES (19, 3, NULL, '删除IP', NULL, NULL, NULL, 'delete', 2, 17, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-26 23:46:32', '2020-12-26 23:46:32');
INSERT INTO `menus` VALUES (20, 3, NULL, '编辑IP', NULL, NULL, NULL, 'edit', 3, 17, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-26 23:46:57', '2020-12-26 23:47:12');
INSERT INTO `menus` VALUES (21, 1, 'fa fa-github-square', '测试', '/test', 'Layout', 'test', NULL, 3, 0, '/test', 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 15:20:21');
INSERT INTO `menus` VALUES (22, 2, 'fa fa-plane', '测试', 'index', 'test/index', NULL, NULL, 1, 21, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-26 23:58:53');
INSERT INTO `menus` VALUES (23, 1, 'fa fa-cloud', '争逐', 'https://zzjtnb.com', 'Layout', NULL, NULL, 4, 0, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-21 15:20:29');
INSERT INTO `menus` VALUES (24, 1, 'fa fa-chrome', '内嵌网页', '/embed/:id?', 'Layout', 'embed', NULL, 5, 0, NULL, 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-26 16:44:33');
INSERT INTO `menus` VALUES (25, 2, 'fa fa-video-camera', '争逐', '/embed/1', 'embed/index', NULL, NULL, 1, 24, 'https://zzjtnb.com/', 0, 0, 1, 0, 0, NULL, '2020-12-31 00:00:00', '2020-12-26 23:57:23');
INSERT INTO `menus` VALUES (26, 2, 'fa fa-video-camera', '饿了么', '/embed/2', 'embed/index', NULL, NULL, 1, 24, 'https://element.eleme.io/#/zh-CN/component/menu', 0, 0, 1, 0, 0, NULL, '2020-12-23 12:24:44', '2020-12-26 23:57:44');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '规则名称',
  `roleType` int(255) NULL DEFAULT 1 COMMENT '角色类型 1 超级管理员 2 普通会员',
  `rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '权限 ，对应menus.id 逗号隔开的字符串',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', 1, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26', '2020-12-31 00:00:00', '2020-12-27 01:24:41');
INSERT INTO `roles` VALUES (2, '管理员', 2, '1,2,4,5,8,9,12,13,18,3,17', '2020-12-31 00:00:00', '2020-12-26 23:51:13');
INSERT INTO `roles` VALUES (3, '默认', 3, '1,2,19,3,17', '2020-12-31 00:00:00', '2020-12-26 23:50:50');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录名称',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `roleId` int(11) NULL DEFAULT 1 COMMENT '权限ID-对应roles.id',
  `identity` int(255) NULL DEFAULT 0 COMMENT '角色类型 99 超级管理员  0普通用户',
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '登录token',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `loginname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'SuperAdmin', '670b14728ad9902aecba32e22fa4f6bd', '超级管理员', 1, 99, 'd2ec6f6b233542b20a82349a5c09f606', '2020-12-31 00:00:00', '2020-12-27 01:24:21');
INSERT INTO `users` VALUES (2, 'admin', '670b14728ad9902aecba32e22fa4f6bd', NULL, 2, 0, '479a209089896bcbf19d6aaa2b289cae', '2020-12-31 00:00:00', '2020-12-26 23:51:24');
INSERT INTO `users` VALUES (3, 'test', '670b14728ad9902aecba32e22fa4f6bd', NULL, 3, 0, 'a9ede7f6722c7e2a53050c49467e0e96', '2020-12-31 00:00:00', '2020-12-26 23:51:48');

-- ----------------------------
-- Table structure for whitelist
-- ----------------------------
DROP TABLE IF EXISTS `whitelist`;
CREATE TABLE `whitelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ipaddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'IP地址',
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '添加者',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of whitelist
-- ----------------------------
INSERT INTO `whitelist` VALUES (1, '127.0.0.1', 'SuperAdmin', '本地测试', '2020-12-26 23:49:24', '2020-12-26 23:49:24');

SET FOREIGN_KEY_CHECKS = 1;
