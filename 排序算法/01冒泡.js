// 时间复杂度：O(n^2)
// 遍历整个数组，将数组的每一项与其后一项进行对比，如果不符合要求就交换位置
function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较+交换到底有多少轮
  for (let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较+交换
    for (let j = i + 1; j < len; j++) {
      // 左往右升序
      if (arr[j] < arr[i]) {
        // 交换两者
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  // 返回数组
  return arr;
}
console.log(bubbleSort([3, 6, 2, 4, 1])); //[1,2,3,4,6]
