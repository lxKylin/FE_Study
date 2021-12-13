const BaseService = require('./base');
class Service extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = 'role'
  }
  async getResource() {
    const { app } = this
    const resources = await app.mysql.select('resource')
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
    return rootMenus
  }
  // 传入的body -> 解构 roleId, resourceIds
  async setResource({ roleId, resourceIds }) {
    const { app } = this
    await app.mysql.query('DELETE FROM role_resource WHERE role_id=?', [ roleId ])
    for (let i = 0; i < resourceIds.length; i++) {
      const resourceId = resourceIds[i]
      await app.mysql.insert('role_resource', {
        role_id: roleId,
        resource_id: resourceId
      })
    }
  }
  async getUser() {
    const { app } = this
    const users = await app.mysql.select('user')
    return users
  }
  // 传入的body -> 解构 roleId, userIds
  async setUser({ roleId, userIds }) {
    const { app } = this
    // 开启事务拿到一个连接
    const conn = await app.mysql.beginTransaction()
    try {
      await conn.query('DELETE FROM role_user WHERE role_id=?', [ roleId ])
      for (let i = 0; i < userIds.length; i++) {
        const userId = userIds[i]
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: userId
        })
      }
      // 都成功就提交
      await conn.commit()
    } catch (error) {
      // 失败进行回滚
      await conn.rollback()
      throw error
    }
    
  }
}
module.exports = Service
