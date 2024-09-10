/**
 * 将字符串中的最长重复字母标记数量
 * aaaa 输出4a; abcaab 输出abc2ab
 * @param {string} str - 输入的字符串
 * @returns {string} - 处理后的字符串
 */
function compressString(str) {
  let result = ''; // 结果字符串
  let count = 1; // 当前字符出现次数
  let maxCount = 1;

  // 遍历字符串中的每个字符
  for (let i = 0; i < str.length; i++) {
    // 如果当前字符与下一个字符相同，则增加计数
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      maxCount = Math.max(maxCount, count);
      // 否则，将当前字符及其计数添加到结果字符串中
      result += count >= maxCount && count != 1 ? `${count}${str[i]}` : str[i];
      count = 1; // 重置计数
    }
  }

  return result;
}

// 测试示例
console.log(compressString('aaaa')); // 输出 "4a"
console.log(compressString('abcaab')); // 输出 "abc2ab"
console.log(compressString('abbbcaab')); // 输出 "a3bcab"
