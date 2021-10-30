// 时间复杂度：O(n^2)
// 找到数组中的最小（大）值，并将其放到第一位，然后找到第二小的值放到第二位……以此类推
function selectionSort(arr) {
  // 获取数组长度，确保每一项都被排序。
  let len = arr.length;
  // 遍历数组的每一项。
  for (let i = 0; i < len; i++) {
    // 从数组的当前项开始，因为左边部分的数组项已经被排序。
    let min = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
  return arr;
}