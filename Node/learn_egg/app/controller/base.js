const {
  Controller
} = require('egg')
// const uuid = require('uuid')
class BaseController extends Controller {

  // 查询
  async index() {
    const {
      ctx,
      service
    } = this
    // 分页 从查询字符串获取参数
    const {
      pageNum,
      pageSize,
      ...where
    } = ctx.query
    // 调用Service进行业务处理
    // let list = await service.user.list()
    // 进行判断 如果是非数字则为1，不是非数字则转为数字
    let list = await service[this.entity].list(isNaN(pageNum) ? 1 : parseInt(pageNum),
      isNaN(pageSize) ? 3 : parseInt(pageSize), where)
    // 设置响应内容
    // ctx.body = users
    this.success(list)
    // this.error('error')
  }
  // 新建
  async create() {
    const {
      ctx,
      service
    } = this
    // 拿到当前对象请求体
    let entity = ctx.request.body
    // 使用uuid
    // user.uuid = uuid.v4()
    // 创建对象
    const result = await service[this.entity].create(entity)
    // 设置响应内容
    // ctx.body = {
    //   code: 0,
    //   data: 'success'
    // }
    result ? this.success('success') : this.error('创建失败')
  }
  // 更新
  // /api/user/1 请求体是更新后的数据
  async update() {
    const {
      ctx,
      service
    } = this
    // 拿到id
    let id = ctx.params.id
    let entity = ctx.request.body
    entity.id = id
    const result = await service[this.entity].update(entity)
    // ctx.body = {
    //   code: 0,
    //   data: 'success'
    // }
    result ? this.success('success') : this.error('更新失败')
  }
  // 删除
  async destroy() {
    const {
      ctx,
      service
    } = this
    // 拿到id
    let id = ctx.params.id
    const result = await service[this.entity].destroy(id)
    // ctx.body = {
    //   code: 0,
    //   data: 'success'
    // }
    result ? this.success('success') : this.error('删除失败')
  }

  success(data) {
    this.ctx.body = {
      code: 0,
      data
    }
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error
    }
  }
}
module.exports = BaseController
