const path = require('path');

// `path.join()`方法，从左往右 用来将多个路径片段拼接成一个完整的路径字符串， 不使用 + 号来处理拼接

const pathStr = path.join('/a', '/b/c', '../', './d', 'e');

// ../会抵消一层路径
console.log(pathStr); // /a/b/d/e

const pathStr2 = path.join(__dirname, '../../a', '/b/c', '../', './d', 'e');
console.log(pathStr2, 'pathStr2'); // /Users/liuxin/Project/study/a/b/d/e

// resolve对于给定的路径片段，是从右向左拼接处理，直至构造出绝对路径;

const pathStr3 = path.resolve(__dirname, 'a', 'b/c', 'd'); // /Users/liuxin/Project/study/a/b/c/d
// const pathStr3 = path.resolve('/a', 'b/c', 'd') // /a/b/c/d
// const pathStr3 = path.resolve('/a', '/b/c', 'd') // /b/c/d
// const pathStr3 = path.resolve('/a', '/b/c', '/d'); // /d
console.log(pathStr3);
