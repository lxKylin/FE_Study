'use strict';

exports.mysql = {
  /**
   * 包名，是否要启动
   * 作用：在app上挂载mysql，app.mysql.
   */
  package: 'egg-mysql',
  enable: true,
};
// 实现跨域
exports.cors = {
  // npm install egg-cors -S
  package: 'egg-cors',
  enable: true,
}
