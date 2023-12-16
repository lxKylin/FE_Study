// proxy.js
const fs = require('fs');
const path = require('path');

const encoding = 'utf-8';
/**
 * 获取配置文件内容 getContent('proxy-config.json')
 * @param filename env.json
 * @returns {string}
 */
const getContent = (filename) => {
  const dir = path.resolve(process.cwd(), 'env');
  console.log(dir, 'dir');
  return fs.readFileSync(path.resolve(dir, filename), { encoding });
};

const jsonParse = (obj) => {
  return Function('"use strict";return (' + obj + ')')();
};

/**
 * 获取配置选项 getConfig()
 * @returns {{}|*}
 */
const getConfig = () => {
  try {
    return jsonParse(getContent('proxy-config.json'));
  } catch (e) {
    return {};
  }
};

console.log(getConfig());

module.exports = {
  proxy: {
    // 接口匹配规则自行修改
    ['/my-api']: {
      target: 'that must have a empty placeholder', // 这里必须要有字符串来进行占位
      changeOrigin: true,
      router: () => (getConfig() || {}).target || ''
    }
  }
};
