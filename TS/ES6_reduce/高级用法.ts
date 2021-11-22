// 1.计算数组每个元素出现的次数
type nameType = string[];
let names: nameType = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

let nameNum: any = names.reduce((pre: any, cur) => {
  if (cur in pre) {
    pre[cur]++;
  } else {
    pre[cur] = 1;
  }
  return pre;
}, {});
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}

// 2.将二维数组转一维
type arrType = number[][];
let arr: arrType = [
  [0, 1],
  [2, 3],
  [4, 5],
];
let newArr: number[] = arr.reduce((pre, cur) => {
  return pre.concat(cur);
}, []);
console.log(newArr); // [0, 1, 2, 3, 4, 5]

export {};
