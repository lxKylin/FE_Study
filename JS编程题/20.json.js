const obj = {
  name: "Kylin",
  age: 23
}
console.log(obj);

// 将对象转成JSON格式的字符串
const objString = JSON.stringify(obj)
console.log(objString, '1');

console.log(obj === objString, '1'); // false

// 将JSON格式的字符串转回对象
const info = JSON.parse(objString)
console.log(info, '2');

console.log(obj === info, '2'); // false

// 有问题的深拷贝
const test = JSON.parse(JSON.stringify(obj))
console.log(test, '3');
console.log(test === obj, '3'); // false 内存空间已不是同一个
