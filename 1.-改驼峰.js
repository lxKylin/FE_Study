function stringToUp(str) {
  // 用split方法将字符串拆分成数组
  let arr = str.split("-");
  // console.log(temp); //["border", "bottom", "color"]
  // 获取数组中的每一个元素（从第二个元素开始）的首字母，并转换为大写。每一个元素再拼接上剩余的字母
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
  }
  // console.log(temp);  ["border" "Bottom" "Color"]
  // 用join方法，将数组中的元素放入一个字符串
  return arr.join("");
}
console.log(stringToUp('better-kylin'))
