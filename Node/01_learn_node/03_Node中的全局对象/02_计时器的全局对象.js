setTimeout(() => {
  console.log('setTimeout')
}, 1000)

setInterval(() => {
  console.log('setInterval')
}, 1000)

// 立即执行 第二个执行
setImmediate(() => {
  console.log('setImmediate')
})

// 下一帧 第一个执行
process.nextTick(() => {
  console.log('process.nextTick')
})
