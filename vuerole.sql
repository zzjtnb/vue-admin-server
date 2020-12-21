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

 Date: 21/12/2020 13:30:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NULL DEFAULT NULL COMMENT '类型 1:目录 2:菜单 3 按钮',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '图标',
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '标题',
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '路由地址',
  `component` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '组件路径',
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '组件名称',
  `permissions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '组件参数',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `pid` int(11) NULL DEFAULT NULL COMMENT '上级类目-对应menus.id',
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '重定向地址，在面包屑中点击会重定向去的地址',
  `hidden` int(1) NULL DEFAULT 0 COMMENT '侧边栏显示',
  `alwaysShow` int(1) NULL DEFAULT 0 COMMENT '路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式',
  `breadcrumb` int(1) NULL DEFAULT 1 COMMENT ' 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 1, 'el-icon-s-home', '首页', '/', 'Layout', 'home', NULL, 1, 0, '/home', 0, 0, 1, NULL, '2020-12-21 13:24:41');
INSERT INTO `menus` VALUES (2, 2, NULL, '首页', 'home', 'home/index', NULL, NULL, 2, 1, NULL, 0, 0, 0, NULL, '2020-12-21 13:24:46');
INSERT INTO `menus` VALUES (3, 1, 'el-icon-setting', '系统管理', '/system', 'Layout', NULL, NULL, 3, 0, '/system/menu', 0, 0, 1, NULL, '2020-12-21 13:00:40');
INSERT INTO `menus` VALUES (4, 2, 'el-icon-s-order', '菜单管理', '/system/menu', 'system/menu/index', NULL, NULL, 4, 3, NULL, 0, 0, 1, NULL, '2020-12-21 13:24:59');
INSERT INTO `menus` VALUES (5, 3, NULL, '新增菜单', NULL, NULL, NULL, 'add', 5, 4, NULL, 0, 0, 1, NULL, '2020-12-21 13:25:09');
INSERT INTO `menus` VALUES (6, 3, NULL, '删除菜单', NULL, NULL, NULL, 'delete', 6, 4, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (7, 3, NULL, '编辑菜单', NULL, NULL, NULL, 'edit', 7, 4, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (8, 2, 'el-icon-s-custom', '用户管理', '/system/users', 'system/users/index', 'user', NULL, 8, 3, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (9, 3, NULL, '新增用户', NULL, NULL, NULL, 'add', 9, 8, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (10, 3, NULL, '删除用户', NULL, NULL, NULL, 'delete', 10, 8, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (11, 3, NULL, '编辑用户', NULL, NULL, NULL, 'edit', 11, 8, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (12, 2, 'el-icon-s-flag', '权限管理', '/system/roles', 'system/roles/index', 'roles', NULL, 12, 3, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (13, 3, NULL, '新增权限', NULL, NULL, '', 'add', 13, 12, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (14, 3, NULL, '删除权限', NULL, NULL, '', 'delete', 14, 12, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (15, 3, NULL, '编辑权限', NULL, NULL, '', 'edit', 15, 12, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (16, 3, NULL, '用户授权', NULL, NULL, NULL, 'authorize', 1, 12, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (17, 1, 'fa fa-github-square', '测试', '/test', 'Layout', 'test', NULL, 0, 0, '/test', 0, 0, 1, NULL, '2020-12-21 13:00:42');
INSERT INTO `menus` VALUES (18, 2, 'fa fa-plane', '测试', 'index', 'test/index', NULL, NULL, 0, 17, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (19, 1, 'fa fa-cloud', '争逐', 'https://zzjtnb.com', 'Layout', NULL, NULL, 1, 0, NULL, 0, 0, 1, NULL, NULL);
INSERT INTO `menus` VALUES (20, 1, 'fa fa-chrome', '内嵌网页', '/embed', 'Layout', 'embed', NULL, 1, 0, '/embed/index', 0, 1, 1, NULL, NULL);
INSERT INTO `menus` VALUES (21, 2, NULL, '争逐', 'https://zzjtnb.com', NULL, NULL, NULL, 1, 20, NULL, 0, 0, 1, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', 1, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21', NULL, '2020-12-21 13:16:07');
INSERT INTO `roles` VALUES (2, '管理员', 2, '1,2,5,9,13,17,18,19,3,4,8,12', NULL, '2020-12-21 13:00:03');
INSERT INTO `roles` VALUES (3, '默认', 3, '1,2,17,18,19', NULL, '2020-12-21 12:46:21');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'SuperAdmin', '670b14728ad9902aecba32e22fa4f6bd', '超级管理员', 1, 99, '71fa2cc72c591c0b3981c0f8a5affc42', NULL, '2020-12-21 13:29:54');
INSERT INTO `users` VALUES (2, 'admin', '670b14728ad9902aecba32e22fa4f6bd', NULL, 2, 0, '5dbce2848dc9f753698a14eb4a011c23', NULL, '2020-12-21 12:59:17');
INSERT INTO `users` VALUES (3, 'test', '670b14728ad9902aecba32e22fa4f6bd', NULL, 3, 0, NULL, NULL, '2020-12-21 12:54:29');

SET FOREIGN_KEY_CHECKS = 1;
