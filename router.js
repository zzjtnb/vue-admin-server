'use strict';
/**
 * router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系，
 * 框架约定 router.js 文件用于统一所有路由规则。
 * 通过统一的配置，我们可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起可以更方便的来查看全局的路由规则。
 */
const router = require('express').Router()
const auth = require('./middleware/auth')
const user = require('./controller/system/user')
const role = require('./controller/system/role');
const menu = require('./controller/system/menu');
const whitelist = require('./controller/system/whitelist');

const { str2null } = require('./utils/str2null')
// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  if (req.body) req.body = str2null(req.body)
  next();
})
//登录
router.post('/user/login', auth.loginRequired, user.login);
router.post('/user/register', user.register);
router.post('/user/detail', auth.loginRequired, user.detail);
router.post('/user/logout', user.logout);
router.get('/user/list', auth.loginRequired, user.list);
router.post('/user/add', auth.loginRequired, user.add);
router.put('/user/update/:id', auth.loginRequired, user.update);
router.delete('/user/delete/:id', auth.loginRequired, user.delete);
//权限管理
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
//白名单
router.get('/whitelist/list', auth.loginRequired, whitelist.list);
router.delete('/whitelist/delete', auth.loginRequired, whitelist.delete);
router.post('/whitelist/add', auth.loginRequired, whitelist.add);
router.put('/whitelist/update/:id', auth.loginRequired, whitelist.edit);

module.exports = router; //导出