/**
 * 快速排序：
 * 平均时间复杂度是O(nlogn)，最差时间复杂度是O(n^2)。
 * 他的核心思想是选定一个基准值x，将比x小的值放到左边，比x大的值放到右边。
 */

const quickSort = (arr) => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) { //如果左边的索引大于等于右边的索引说明整理完毕
      return
    }
    let i = left
    let j = right
    const baseVal = arr[j] // 取无序数组最后一个数为基准值
    while (i < j) { //把所有比基准值小的数放在左边大的数放在右边
      while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
        i++
      }
      arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）

      while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
        j--
      }
      arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    sort(arr, left, j - 1) // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right) // 将右边的无序数组重复上面的操作
  }
  
  const newArr = arr.concat() // 创建一个新数组，为了保证这个函数是纯函数拷贝一次数组
  sort(newArr)
  return newArr
}

const arr = [2, 1, 3, 6, 4, 5, 9, 8, 7];

// 测试下
let result = quickSort(arr);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]