const BaseController = require('./base');
const { sign } = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha');
class Controller extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
  // svg图片验证码  npm install --save svg-captcha
  async captcha() {
    const { ctx } = this;
    const captchaObj = svgCaptcha.create(); // captcha = { text, data }
    ctx.session.captcha = captchaObj.text; // 把文本信息存放在会话中的captcha属性中
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captchaObj.data;
  }
  async checkCaptcha() {
    const { ctx } = this;
    const captcha = ctx.request.body.captcha
    if (captcha === ctx.session.captcha) {
      ctx.body = 'captcha验证成功'
    } else {
      ctx.body = 'captcha验证失败'
    }
  }
  // 注册
  async signup() {
    const { ctx, app } = this
    const user = ctx.request.body
    const result = await app.mysql.insert('user', user)
    if (result.affectedRows > 0) {
      this.success({
        id: result.insertId
      })
    } else {
      this.error('注册失败')
    }
  }
  // 登录
  async login() {
    const { ctx, app } = this
    const { username, password } = ctx.request.body
    // select * from user where username=? and password=?
    const result = await app.mysql.select('user', {
      where: { username, password },
      limit: 1
    })
    if (result && result.length > 0) {
      // 转为纯对象
      let u = JSON.parse(JSON.stringify(result[0])) 
      // 删除密码
      delete u.password
      // 成功返回token
      this.success(sign(u, this.config.jwtSecret, {
        // 设置过期时间
        expiredAt: new Date(Date.now() + 60 * 1000)
      }))
    } else {
      this.error('登录失败')
    }
  }
}
module.exports = Controller;
