type arrType = number[]
type retType = number
// 简单用法
let arr:arrType = [1, 2, 3, 4];
// 1.求和，求积
let sum:retType = arr.reduce((x, y) => x + y);
let mul:retType = arr.reduce((x, y) => x * y);
console.log(sum); //求和，10
console.log(mul); //求乘积，24

// 2.求数组中的最大值
let max:retType = arr.reduce(function (prev, cur) {
  return Math.max(prev,cur);
});
console.log(max) // 4

// 3.数组去重
let arr2: arrType = [1,2,3,3,4,2,4,5,5]
let newArr: arrType = arr2.reduce(function (prev: number[], cur: number) {
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
},[]);
console.log(newArr) // [1, 2, 3, 4, 5]


export {};
