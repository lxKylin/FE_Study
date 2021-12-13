const { verify } = require('jsonwebtoken')
// 验证token token 秘钥
function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    verify(token, secret, (error, payload) => {
      if (error) {
        reject(error)
      } else {
        resolve(payload)
      }
    })
  })
}
module.exports = (options, app) => {
  // 上下文 下一个
  return async function(ctx, next) {
    // 进行权限判断
    const authUrls = options.authUrls
    if (authUrls.includes(ctx.url)) {
      // 拿token
      const authorization = ctx.get('authorization')
      if (authorization) {
        try {
          const user = await verifyToken(authorization, app.config.jwtSecret)
          ctx.session.user = user
          await next()
        } catch (error) {
          ctx.status = 401
          ctx.body = 'token验证失败'
        }
      } else {
        ctx.status = 401
        ctx.body = '没有权限'
      }
    } else {
      await next()
    }
  }
}
