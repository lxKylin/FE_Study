/**
 * fileDisplay(url, callback)
 * @param url: 你即将读取的文件夹路径
 * @param callback: 回调函数
 */

const fs = require('fs');
const path = require('path');
const config = require('../app/config');

class FindPath {
  // 收集所有的文件路径
  fileDisplay = (url, callback) => {
    const fileArr = [];
    let timer = null;

    const filePath = path.resolve(url);
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, (err, files) => {
      if (err) return console.error('Error:(spec)', err);
      files.forEach((filename) => {
        //获取当前文件的绝对路径
        const fileDir = path.join(filePath, filename);
        const fileDirLen = fileDir.split('/').length;
        // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
        fs.stat(fileDir, (error, stats) => {
          if (error) return console.error('Error:(spec)', error);
          // 是否是文件
          const isFile = stats.isFile();
          // 是否是文件夹
          const isDir = stats.isDirectory();

          const replaceStr = fileDir
            .split('/')
            .slice(0, fileDirLen - 3)
            .join('/');

          if (isFile) {
            // 第一个 replace 是替换掉那个路径，第二个是所有满足\\的直接替换掉
            fileArr.push(
              fileDir
                .replace(replaceStr, `${config.HOST}:${APP_PORT}/api`)
                .replace(/\\/gim, '/')
            );
            // arr.push(fileDir.replace(__dirname, '').replace(/\\/gim, '/'));
            // 最后打印的就是完整的文件路径了
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => callback && callback(fileArr), 200);
          }
          // 如果是文件夹
          if (isDir) fileDisplay(fileDir, callback);
        });
      });
    });
  };
}

module.exports = new FindPath();
