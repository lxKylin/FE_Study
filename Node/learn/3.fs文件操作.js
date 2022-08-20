const fs = require('fs');
const path = require('path');

/**
 * 读取文件
 * 三个参数
 * path 路径
 * options 格式
 * callback 回调函数，第一个参数是错误信息，第二个是成功返回的数据
 * 注意：要使用绝对路径
 */
fs.readFile(path.resolve(__dirname, './text/test.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

/**
 * 写入文件（会将原文件中的内容全部替换）
 * 三个参数
 * path
 * data
 * callback
 */
const text = '这是用于写入的字符串';
fs.writeFile(path.resolve(__dirname, './text/test.txt'), text, (err) => {
  if (err) throw err;
});

/**
 * 进行追加文字
 * 先读再写
 */
fs.readFile(path.resolve(__dirname, './text/test.txt'), 'utf8', (err, data) => {
  if (!err) {
    let newText = `${data}，这是用于追加的字符串`;
    fs.writeFile(path.resolve(__dirname, './text/test.txt'), newText, (err) => {
      if (err) throw err;
    });
  }
});
