const { whitelistModel } = require('../../models');
const vertoken = require('../../utils/token')
class whitelistController {
  async add(req, res, next) {
    req.body.creator = vertoken.getToken(req.headers.authorization.split(" ").pop()).loginname
    const [whitelist, created] = await whitelistModel.findOrCreate({ where: { ipaddr: req.body.ipaddr }, defaults: req.body })
    if (!created) return res.json({ code: 404, message: '该IP已存在' })
    res.json({ code: 200, data: '添加成功' });

  }
  async delete(req, res, next) {
    if (!req.body.id) return res.json({ code: -1, message: "请传入要删除的IP的ID" })
    const result = await whitelistModel.destroy({ 'where': { 'id': req.body.id } })
    if (!result) return res.json({ code: 404, message: '删除失败' })
    res.json({ code: 200, data: 'success' });
  }
  async edit(req, res, next) {
    req.body.creator = vertoken.getToken(req.headers.authorization.split(" ").pop()).loginname
    const model = await whitelistModel.update(req.body, { where: { id: req.body.id } })
    if (!model) return res.json({ code: 404, message: '修改失败' })
    res.json({ code: 200, data: 'IP修改成功' });
  }
  async list(req, res, next) {
    const whitelist = await whitelistModel.findAndCountAll({ raw: true })
    if (!whitelist) return res.json({ code: 404, message: '获取IP列表出错' })
    res.json({ code: 200, data: whitelist });
  }
}

module.exports = new whitelistController();
