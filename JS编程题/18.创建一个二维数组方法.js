// 方式一
var res = new Array(4);
for (var i = 0; i < res.length; i++) {
  res[i] = new Array(5);
}
console.log(res)
// [
//   [ <5 empty items> ],
//   [ <5 empty items> ],
//   [ <5 empty items> ],
//   [ <5 empty items> ]
// ]

// empty表示空语句

// 方式二
const m = 2;
const n = 2;
let as = [1, 2, 3, 4]
// fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
// let arr = Array(m).fill().map(() => Array(n).fill());
let arr = Array(m).fill().map(() => Array(n));
for (let i = 0; i < as.length; i++) {
  // ~~表示转数字，相当于Number()
  arr[~~(i / n)][i % n] = as[i]
}
console.log(arr);
// [ [ 1, 2 ], [ 3, 4 ] ]

// 方式三
const a = 4;
const b = 5;
let arr2 = Array.from(Array(a), () => new Array(b));
console.log(arr2); //  Output: [ [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ] ]