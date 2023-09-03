// 1.方式一：手动的切换不同环境，不推荐
// const BASE_URL = 'http://lx.org/dev'

// const BASE_URL = 'http://lx.org/prod'

// const BASE_URL = 'http://lx.org/test'

// 方式二：根据process.env.NODE_ENV区分
// 开发环境：development
// 生产环境：production
// 测试环境：test
// http://152.136.185.210:5000
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://lx.org/test'
}
console.log(BASE_URL, '11111')
export { BASE_URL, TIME_OUT }

// 方式三 编写不同的环境变量配置文件
// VUE_APP_xxx 可以注入，使用process.env.调用

// .env.development
// .env.production
// .env.test
