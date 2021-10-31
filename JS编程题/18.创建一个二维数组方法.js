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
const m = 4;
const n = 5;
let arr = Array(m).fill(0).map(() => Array(n));
console.log(arr);
//  Output: [ [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ], , [ <5 empty items> ] ]

// 方式三
const a = 4;
const b = 5;
let arr2 = Array.from(Array(a), () => new Array(b));
console.log(arr2); //  Output: [ [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ], [ <5 empty items> ] ]