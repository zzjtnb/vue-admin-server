const { menusModel, rolesModel } = require('../models');

class rolesController {
  async add(req, res, next) {
    // const [menu, created] = await menusModel.findOrCreate({ where: { title: req.body.title }, defaults: req.body })
    // if (!created) return res.json({ code: 404, message: '菜单已存在' })
    const created = await menusModel.create(req.body)
    if (!created) return res.json({ code: 404, message: '添加失败' })
    res.json({ code: 200, data: 'success' });
    const { rules } = await rolesModel.findOne({ where: { id: 1 }, attributes: ['rules'] })
    rolesModel.update({ rules: rules + ',' + created.id }, { where: { id: 1 } })
  }
  async delete(req, res, next) {
    if (req.params.id >= 1 && req.params.id <= 19) return res.json({ code: -1, message: '预留菜单禁止删除' })
    const result = await menusModel.destroy({ 'where': { 'id': req.params.id } })
    if (!result) return res.json({ code: 404, message: '删除失败' })
    res.json({ code: 200, data: 'success' });
    const { rules } = await rolesModel.findOne({ where: { id: 1 }, attributes: ['rules'] })
    const newArr = rules.split(',').filter(item => item != req.params.id)
    rolesModel.update({ rules: newArr.join(',') }, { where: { id: 1 } })
    // console.log(typeof (+'1'));//number
    // console.log(typeof (1 + ''));//string
  }
  async edit(req, res) {
    req.body.hidden = Number(req.body.hidden)
    const model = await menusModel.update(req.body, { where: { id: req.body.id } })
    if (!model) return res.json({ code: 404, message: '修改失败' })
    res.json({ code: 200, data: 'success' });
  }

  /**获取动态路由 */
  async getMenuList(req, res, next) {
    let pid = req.query.pid
    const menu = await menusModel.findAll({
      raw: true,
    })
    let arr = GetParentArry(pid, menu)
    arr.forEach(item => {
      if (GetParentArry(item.id, menu).length > 0) {
        item.hasChildren = 1
      } else {
        item.hasChildren = 0
      }
    })
    res.json({ code: 200, message: "success", data: arr })
    // res.json({ code: 200, message: '获取路由成功' });
  }
}
// 查询是否有下级
function GetParentArry(id, arry) {
  var newArry = new Array();
  for (var i in arry) {
    if (arry[i].pid == id) {
      newArry.push(arry[i]);
    }
  }
  return newArry;
}

module.exports = new rolesController();