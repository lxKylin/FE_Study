'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.post('/signup', controller.user.signup);
  // 名字 路径 控制器实例
  router.resources('user', '/api/user', controller.user);
  // 验证码
  router.get('/api/captcha', controller.user.captcha);
  router.post('/api/checkCaptcha', controller.user.checkCaptcha);
  router.resources('role', '/api/role', controller.role);
  router.resources('roleUser', '/api/roleUser', controller.roleUser);
  router.resources('roleResource', '/api/roleResource', controller.roleResource);
  router.resources('resource', '/api/resource', controller.resource);

  // 获取所有的资源
  router.get('/api/role/getResource', controller.role.getResource);
  // 设置角色和资源的关系
  router.post('/api/role/setResource', controller.role.setResource);

  // 这两个接口需要登录后才能访问
  // 获取所有的用户
  router.get('/api/role/getUser', controller.role.getUser);
  // 设置角色和用户的关系
  router.post('/api/role/setUser', controller.role.setUser);
};
/**
 * 1.设置黑白名单，写中间件
 */
