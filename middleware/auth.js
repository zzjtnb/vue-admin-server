const md5 = require('blueimp-md5')
const vertoken = require('../utils/token')
const { getClientIp } = require('../utils/ipaddr')
const { usersModel, whitelistModel } = require('../models');
class authMiddleware {
  /**
   * 需要用户登录
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async loginRequired(req, res, next) {
    const whitelist = await whitelistModel.findAll({ raw: true })
    if (!whitelist) return res.status(200).json({ code: 404, message: '获取IP白名单失败' })
    const found = whitelist.find(element => element.ipaddr === getClientIp(req));
    if (!found) return res.status(200).json({ code: 404, message: '您的IP受限,请联系管理员' })
    if (req.path !== '/user/login') {
      if (!req.headers.authorization) return res.json({ code: -1, message: "token不存在" });
      const token = req.headers.authorization.split(" ").pop()
      if (!await vertoken.verify(token)) return res.status(401).json({ code: 401, message: "token已过期" });
      const { loginname } = vertoken.getToken(token)
      const model = await usersModel.findOne({ where: { loginname: loginname }, attributes: ['token'] })
      if (!model) return res.json({ code: 404, message: '该用户不存在' })
      if (md5(token) !== model.dataValues.token) return res.status(401).json({ code: 401, message: 'token与当前用户不符,请重新登陆' })
    }
    next()
  }
  /** 用户鉴权*/
  async authUserPermission(req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.id) {
      return res.redirect('/login');
    }
    if (!req.session || !req.session.menu || req.session.menu.length == 0) {
      return res.send('抱歉，您无此权限！请联系管理员');
    }
    let targetUrl = req.route.path;
    let hasPower = false;
    req.session.menu.forEach(el => {
      if (el.page_url == targetUrl || el.control_url == targetUrl) {
        hasPower = true;
      }
    });
    if (!hasPower) {
      if (req.xhr) {
        return res.json({
          state: false,
          msg: "抱歉，您无此权限！请联系管理员"
        });
      }

      return res.send('抱歉，您无此权限！请联系管理员');
    }
    next();
  }
  /**
 * 需要IP白名单
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
  async ipaddrRequired(req, res, next) {
    const whitelist = await whitelistModel.findAll({ raw: true })
    if (!whitelist) return res.status(200).json({ code: 404, message: '获取IP白名单失败' })
    const found = whitelist.find(element => element.ipaddr === getClientIp(req));
    if (!found) return res.status(200).json({ code: 404, message: '您的IP受限,请联系管理员' })
    next();
  }

}

module.exports = new authMiddleware();