// 1.
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
setTimeout(() => {
  console.log('----------------------')
}, 1000)
// 2.setTimeout第三个参数(及以后的参数)作为传参作用：
// 就是setTimeout第一个函数的参数
for (var i = 0; i < 3; i++) {
  setTimeout((j) => {
    console.log(j)
  }, 1000, i)
}

function sum(a, b) {
  console.log(a + b)
}
setTimeout(sum, 1000, 1, 2) // 3
function sumT(a, b, c) {
  console.log(a + b + c)
}
setTimeout(sumT, 1000, 1, 2, 3) // 6

// 3.setTimeout第三个参数作为函数作用：
let item = 0;
setTimeout(() => {
  console.log('第一次' + item)
  item++
}, 2000, setTimeout(() => {
  // 如果第三个参数时函数的话，会最先执行
  console.log('第二次' + item)
  item++
}))
