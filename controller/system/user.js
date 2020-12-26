const md5 = require('blueimp-md5')
const vertoken = require('../../utils/token')
const { usersModel, rolesModel, Op } = require('../../models');
usersModel.belongsTo(rolesModel, { targetKey: 'id', foreignKey: 'roleId' });

/** 登录注册相关 */
class usersController {
  /**注册用户 */
  async register(req, res, next) {
    const loginname = req.body.loginname
    const password = req.body.password
    if (loginname == '' || loginname == undefined) return res.json({ code: -1, message: "用户名不能为空" });
    if (password == '' || password == undefined) return res.json({ code: -1, message: "密码不能为空！" });
    req.body.password = md5(password)
    const [user, created] = await usersModel.findOrCreate({ where: { loginname: req.body.loginname }, defaults: req.body })
    if (!created) return res.json({ code: 404, message: '该用户已存在' })
    res.json({ code: 200, data: user.loginname + 'success' });
  }
  /** 执行登录 */
  async login(req, res, next) {
    if (!req.body.loginname || !req.body.password) return res.json({ code: -1, message: "参数不正确" })
    const model = await usersModel.findOne({
      where: { loginname: req.body.loginname },
      // attributes: ['id', 'loginname', , 'identity']
      attributes: { exclude: ['token'] }
    })
    if (!model) return res.json({ code: 404, message: '该用户不存在' })
    if (model.dataValues.password !== md5(req.body.password)) return res.json({ code: 404, message: '密码错误' })
    delete model.dataValues.password
    const token = vertoken.setToken(model.dataValues)
    usersModel.update({ token: md5(token) }, { where: { loginname: req.body.loginname } })
    res.json({ code: 200, token: token, message: 'success' })
  }
  /**
   * 获取用户详情
   */
  async detail(req, res, next) {
    const { loginname } = vertoken.getToken(req.headers.authorization.split(" ").pop())
    const model = await usersModel.findOne({
      where: { loginname: loginname },
      attributes: { exclude: ['password', 'token'] }
    })
    if (!model) return res.json({ code: 404, message: '该用户不存在' })
    res.json({ code: 200, data: model.dataValues, message: 'success' })
  }

  /** 退出登录 */
  async logout(req, res, next) {
    res.json({ code: 200, message: 'success' })
  }

  async list(req, res, next) {
    const { identity } = vertoken.getToken(req.headers.authorization.split(" ").pop())
    let userList = null
    if (identity != 99) {
      userList = await usersModel.findAll({ raw: true, include: [rolesModel], attributes: { exclude: ['password', 'token'] }, where: { identity: { [Op.ne]: 99 } } })
    } else {
      userList = await usersModel.findAll({ raw: true, include: [rolesModel], attributes: { exclude: ['password', 'token'] } })
    }
    userList.map((item, index) => Object.keys(item).forEach(() => userList[index].role_name = item['rolesModel.title']))
    // await Promise.all(userList.map(async (item, index) => {
    //   const result = await rolesModel.findOne({ where: { id: item.roleId }, attributes: ['title'] })
    //   if (result) userList[index].role_name = result.title
    // }))
    res.json({ code: 200, data: userList, message: 'success' })
  }
  async add(req, res, next) {
    const loginname = req.body.loginname
    const password = req.body.password
    const roleId = req.body.roleId
    if (loginname == '' || loginname == undefined) return res.json({ code: -1, message: "用户名不能为空" });
    if (password == '' || password == undefined) return res.json({ code: -1, message: "密码不能为空！" });
    if (roleId == '' || roleId == undefined) req.body.roleId = 3;
    req.body.password = md5(password);
    const [user, created] = await usersModel.findOrCreate({ where: { loginname: req.body.loginname }, defaults: req.body })
    if (!created) return res.json({ code: 404, message: '存在同名账户' })
    res.json({ code: 200, data: user.loginname + 'success' });
    // res.json({ code: 200, message: 'success' })
  }
  async update(req, res, next) {
    const user = await usersModel.findOne({ raw: true, mwhere: { loginname: req.body.loginname } });
    if (!user) return res.json({ code: 404, message: '存在同名账户' })
    const model = await usersModel.update(req.body, { where: { id: req.body.id } })
    if (!model) return res.json({ code: 404, message: '修改失败' })
    res.json({ code: 200, data: 'success' });


  }
  async delete(req, res, next) {
    if (req.params.id == 1) return res.json({ code: -1, message: '超级管理员禁止删除！' })
    const result = await usersModel.destroy({ 'where': { 'id': req.params.id } })
    if (!result) return res.json({ code: 404, message: '删除失败' })
    res.json({ code: 200, data: 'success' });
  }
}

module.exports = new usersController();