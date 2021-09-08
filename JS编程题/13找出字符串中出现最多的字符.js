function findMaxDuplicateChar(str) {
  str = str.split('');
  let newStr = {};
  // 数组去重 和计算出现的次数
  // 循环遍历数组每一项 以数组每一项为键
  str.forEach(item => {
    if (newStr[item]) {
      newStr[item]++;
    } else {
      newStr[item] = 1;
    }
  })
  let myChar = ''; //存储字符  键
  let count = 0; //存储次数    值
  for (let key in newStr) {
    if (newStr[key] > count) {
      count = newStr[key]
      myChar = key
    }
  }
  console.log('出现最多的字符是' + myChar, '出现的次数是' + count + '次');
}
findMaxDuplicateChar('afjghdfraaaaasdenas')