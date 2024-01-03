// 归并排序 时间复杂度O（nlogn）
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;
  let mid = Math.max(len / 2);
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let res = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  while (left.length) {
    res.push(left.shift())
  }
  while (right.length) {
    res.push(right.shift())
  }
  return res
}

let arr = [1, 4, 2, 3, 5, 6, 7, 44, 6, 7]
let res = mergeSort(arr)
console.log(res)