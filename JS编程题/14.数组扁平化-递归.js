const arr = [1, [2, [3, [4, 5]]], 6];
const newArr = [];
const toArray = arr => {
  for (let i = 0; i < arr.length; i++) {
    // 判断是否为数组
    if (Array.isArray(arr[i])) {
      toArray(arr[i]);
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr
}
console.log(toArray(arr))