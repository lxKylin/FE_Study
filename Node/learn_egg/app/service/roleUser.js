const BaseService = require('./base');
class Service extends BaseService {
  constructor(...args) {
    super(...args)
    // 表名
    this.entity = 'role_user'
  }
}
module.exports = Service
