// // 使用watchEffect实现防抖
// let timer: any = null

// const getData = (word: string) => {
//   return setTimeout(() => {
//     console.log(valueHtml.value, '00')
//     emit('articleData', valueHtml.value)
//   }, 3000)
// }

// watchEffect((onInvalidate) => {
//   timer = getData(valueHtml.value)
//   onInvalidate(() => {
//     if (timer) {
//       clearTimeout(timer)
//     }
//   })
// })
