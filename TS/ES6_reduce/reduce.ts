type arrType = number[];
type sumType = number

// arr.reduce(callback,[initialValue])
let arr: arrType = [1, 2, 3, 4];
// 这里没有设置initialValue，所以prev的初始值为数组第一个值，如果设置了，那么prev的值就是initialValue
let sum:sumType = arr.reduce(function (prev, cur, index, arr) {
  console.log(prev, cur, index);
  return prev + cur;
});
console.log('arr和为' + sum);

export {}
