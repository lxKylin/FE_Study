const BaseService = require('./base');
class Service extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = 'user'
  }
  async list(pageNum, pageSize, where) {
    // 查询user数据库中当页的所有数据
    const data = await this.app.mysql.select(this.entity, {
      where,
      // 按id,username 升序排列
      order: [
        ['id', 'asc'],
        ['username', 'asc']
      ],
      // 偏移量
      offset: (pageNum - 1) * pageSize,
      // 返回条数
      limit: pageSize,
    })
    for (let i = 0; i < data.length; i++) {
      const user = data[i]
      const resources = await this.app.mysql.query(`select resource.* from resource
      inner join role_resource on resource.id = role_resource.resource_id
      inner join role_user on role_resource.role_id = role_user.role_id
      where role_user.user_id = ?`, [ user.id ])
      const rootMenus = []
      // map的key不能重复
      const map = {}
      resources.forEach(resource => {
        resource.children = []
        // 把资源的id和资源对象的关系存放到map中
        map[resource.id] = resource
        if (resource.parent_id === 0) {
          rootMenus.push(resource)
        } else {
          map[resource.parent_id].children.push(resource)
        }
      })
      user.resources = rootMenus
    }
    // 总数
    const total = await this.app.mysql.count(this.entity, where)
    return {
      data,
      total
    }
  }
}
module.exports = Service