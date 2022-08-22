const fs = require('fs');
// 使用promise 避免回调地狱
const { promisify } = require('util');
// 将fs.readFile进行promise化
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getDb = async () => {
  const data = await readFile('./db.json', 'utf8');
  return JSON.parse(data);
};

exports.saveDb = async (data) => {
  const stringData = JSon.stringify(data);
  return await writeFile('./db.json', stringData);
};
