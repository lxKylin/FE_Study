/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1634634290543_1200';

  // add your middleware config here
  config.middleware = [
    // 启用中间件
    'auth'
  ];
  config.auth = {
    // 设置黑名单，白名单
    authUrls: [
      '/api/role/getUser',
      '/api/role/setUser'
    ]
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  userConfig.security = {
    csrf: false,
    // 域名白名单
    domainWhileList: [ 'http://localhost:8000' ],
  };
  // 加密秘钥
  userConfig.jwtSecret = 'Kylin'
  // 连接数据库
  userConfig.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '666666',
      database: 'cms'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
