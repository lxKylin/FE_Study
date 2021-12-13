const {
  Service
} = require('egg');
class BaseService extends Service {
  // 查询用户列表
  async list(pageNum, pageSize, where) {
    // 查询user数据库中当页的所有数据
    const data = await this.app.mysql.select(this.entity, {
      where,
      // 按id,username 升序排列
      order: [[ 'id', 'asc' ], [ 'username', 'asc' ]],
      // 偏移量
      offset: (pageNum - 1) * pageSize,
      // 返回条数
      limit: pageSize,
    })
    // 总数
    const total = await this.app.mysql.count(this.entity, where)
    return { data, total }
  }
  // 新建用户 表名 参数
  async create(entity) {
    const result = await this.app.mysql.insert(this.entity, entity)
    // 判断是否成功
    return result.affectedRows > 0
  }
  // 更新user数据
  async update(entity) {
    const result = await this.app.mysql.update(this.entity, entity)
    return result.affectedRows > 0
  }
  // 删除
  async destroy(id) {
    const result = await this.app.mysql.delete(this.entity, { id })
    return result.affectedRows > 0
  }
}
module.exports = BaseService
