'use strict';
/**
 * router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系，
 * 框架约定 router.js 文件用于统一所有路由规则。
 * 通过统一的配置，我们可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起可以更方便的来查看全局的路由规则。
 */
const router = require('express').Router()
const auth = require('../middleware/auth')
const user = require('../controller/user')
const role = require('../controller/role');
const menu = require('../controller/menu');

//登录
router.post('/user/login', user.login);
router.post('/user/register', user.register);
router.post('/user/detail', auth.loginRequired, user.detail);
router.post('/user/logout', user.logout);
router.get('/user/list', auth.loginRequired, user.list);
router.post('/user/add', auth.loginRequired, user.add);
router.put('/user/update/:id', auth.loginRequired, user.update);
router.delete('/user/delete/:id', auth.loginRequired, user.delete);
//路由管理
router.post('/role/add', auth.loginRequired, role.add);
router.delete('/role/delete/:id', auth.loginRequired, role.delete);
router.put('/role/edit/:id', auth.loginRequired, role.edit);
router.post('/role/authorize/:id', auth.loginRequired, role.authorize);
router.get('/role/roleList', auth.loginRequired, role.roleList);
router.get('/role/getAllRouter', auth.loginRequired, role.getAllRouter);
router.get('/role/getMoveRouter', auth.loginRequired, role.getMoveRouter);
//菜单管理
router.post('/menu/add', auth.loginRequired, menu.add);
router.delete('/menu/delete/:id', auth.loginRequired, menu.delete);
router.put('/menu/update/:id', auth.loginRequired, menu.edit);
router.get('/menu/getMenuList', auth.loginRequired, menu.getMenuList);

module.exports = router; //导出