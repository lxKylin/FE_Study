// let arr = ['a', 'b', 'c']
// arr["3"] = 'd'
// arr["key"] = 'e'
// arr[5] = 'f'

// for (let key in arr) {
//     console.log(key);
// }
// //0 1 2 3 5 key
// console.log("======");

// for (let value of arr) {
//     console.log(value)
// }
// //a b c d underfined f
// console.log("======");

// let keys = Object.keys(arr);

// console.log(keys);
// //[ '0', '1', '2', '3', '5', 'key' ]
// let obj = {
//   2: 2,
//   b: 6,
//   7: 7,
//   a: 5,
//   56: 56,
//   10: 10,
// }
// for (let i in obj) {
//   console.log(i)
// }
// let k = Object.keys(obj)
// console.log(k)
// [ '2', '7', '10', '56', 'b', 'a' ]

let obj = {
  5: 3,
  bb: 3,
  3: 4,
  ba:4,
  ab: 5,
  length: 2,
  push: Array.prototype.push
}
obj.push(1)
obj.push(2)
// obj.push(3)
console.log(obj);