console.log('Hello Node')
// 进程
// console.log(process)
console.log(process.argv[2])
console.log(process.argv[3])

// 清空以上打印的
console.clear()

process.argv.forEach(item => console.log(item))

// 传入参数 名字 环境为开发 存在argv属性中
// node index.js kylin env=dev

// 打印函数的调用栈
console.trace()
