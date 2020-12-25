const vertoken = require('../utils/token')
const { rolesModel, menusModel, Op } = require('../models');
class rolesController {
  async add(req, res, next) {
    if (!req.body.title || !req.body.roleType) return res.json({ code: -1, message: "参数不正确" });
    const [role, created] = await rolesModel.findOrCreate({ where: { title: req.body.title }, defaults: req.body })
    if (!created) return res.json({ code: 404, message: '存在同名权限' })
    res.json({ code: 200, data: 'success' });
  }
  async delete(req, res, next) {
    if (req.params.id >= 1 && req.params.id <= 3) return res.json({ code: -1, message: '预留角色禁止删除' })
    if (req.params.id == 'undefined' || req.params.id == '') return res.json({ code: -1, message: "请传入要删除的角色ID" })
    const result = await rolesModel.destroy({ 'where': { 'id': req.params.id } })
    if (!result) return res.json({ code: 404, message: '删除角色失败' })
    res.json({ code: 200, data: 'success' });
  }
  /** 编辑角色信息 */
  async edit(req, res, next) {
    if (req.params.id == 'undefined' || req.params.id == '') return res.json({ code: -1, message: "请传入要编辑的角色ID" })
    const model = await rolesModel.update(req.body, { where: { id: req.params.id } })
    if (!model) return res.json({ code: 404, message: '编辑角色失败' })
    res.json({ code: 200, data: 'success' });
  }
  /**分配权限 */
  async authorize(req, res, next) {
    if (!req.params.id) return res.json({ code: -1, message: "请传入roleType参数！" })
    const model = await rolesModel.update({ rules: req.body.rules }, { where: { roleType: req.params.id } })
    if (!model) return res.json({ code: 404, message: 'failure' })
    res.json({ code: 200, data: 'success' });
  }
  async roleList(req, res, next) {
    const { identity } = vertoken.getToken(req.headers.authorization.split(" ").pop())
    let roleList = null
    if (identity != 99) {
      roleList = await rolesModel.findAll({ attributes: { exclude: ['roleType'] }, where: { id: { [Op.ne]: 1 } } })
    } else {
      roleList = await rolesModel.findAll()
    }
    res.json({ code: 200, data: roleList, message: 'success' });
  }
  async getAllRouter(req, res, next) {
    const { identity, roleId } = vertoken.getToken(req.headers.authorization.split(" ").pop())
    const { rules } = await rolesModel.findOne({ where: { roleType: roleId }, attributes: ['rules'] })
    if (!rules) return res.json({ code: 404, message: '该用户没有权限' })
    let menu = null
    if (identity != 99) {
      menu = await menusModel.findAll({ raw: true, where: { id: { [Op.in]: rules.split(',') } } })
      res.json({ code: 200, data: allToTree(menu), message: 'success' });
    } else {
      menu = await menusModel.findAll({ raw: true })
      res.json({ code: 200, data: allToTree(menu), message: "success" })
    }
  }
  /**获取动态路由 */
  async getMoveRouter(req, res, next) {
    const { roleId } = vertoken.getToken(req.headers.authorization.split(" ").pop())
    const model = await rolesModel.findOne({ raw: true, where: { roleType: roleId }, attributes: ['rules'] })
    if (!model) return res.json({ code: 404, message: '该用户没有权限' })
    // const menu = await Promise.all(rules.split(',').map(async (item) => {
    //   const { dataValues } = await menusModel.findOne({ where: { id: item } })
    //   return dataValues
    // }))
    // res.json({ code: 200, message: '获取路由成功' });
    const menu = await menusModel.findAll({
      raw: true, where: {
        id: model.rules.split(','),
      },
      // order: [['sort', 'DESC']]//排序之后权限出错
    })
    res.json({ code: 200, data: toTree(menu), message: 'success' });
  }
}

function allToTree(data) {
  // 删除所以子级，防止多次调用
  data.forEach(item => {
    delete item.children;
  })
  //将数据存储为以id为key的map索引数据列
  var map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  var val = []
  data.forEach(item => {
    // 以当前遍历项的pid 去map对象中找到索引的id
    var parent = map[item.pid]
    // 如果找到索引，那么说明此项不再顶级当中，那么需要把此项添加到他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果没有找到，那么直接把当前的item添加到val结果集合中，做为顶级
      val.push(item)
    }
  })
  return val
}
function toTree(data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {};
  data.forEach(function (item) {
    map[item.id] = item;
  });
  const val = [];
  data.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    item.meta = {
      title: item.title,
      icon: item.icon,//图标
      noCache: item.noCache, // 不会被 <keep-alive> 缓存,
      breadcrumb: Boolean(item.breadcrumb),//breadcrumb面包屑中显示隐藏
      affix: item.affix, //它则会固定在tags-view
      activeMenu: item.activeMenu, //侧边栏高亮列表的路由
    }
    const parent = map[item.pid];
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      if (item.type == 2) {
        (parent.children || (parent.children = [])).push(item);
        parent.hasChildren = 1
      } else if (item.permissions !== '' && item.type == 3) {
        const parent = map[item.pid]; //找上级
        if (parent) {
          if (parent.meta != undefined) {
            (parent.meta.roles || (parent.meta.roles = [])).push(item.permissions);
            parent.hasChildren = 0
          }
        }
      }
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
}
module.exports = new rolesController();