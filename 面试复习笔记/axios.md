### 1.axios是什么

Axios 是一个基于 Promise 的网络请求库，可以用在浏览器和 node.js 中，是前端最流行的 ajax 请求库

### 2.axios为什么既能在浏览器环境运行又能在服务器(node)环境运行？

- 在浏览器中发送XMLHttpRequests请求
- 在node.js中发送http请求

### 3.axios功能特点

- 在浏览器中发送XMLHttpRequests请求
- 在node.js中发送http请求
- 支持Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 自动转换json数据

### 4.相关配置属性

`url`是用于请求的服务器URL

`method`是创建请求时使用的方法,默认是get

`baseURL`将自动加在`url`前面，除非`url`是一个绝对URL。它可以通过设置一个`baseURL`便于为axios实例的方法传递相对URL

`params`，` data`是即将与请求一起发送的URL参数

### 5.get和post区别

- get用来获取数据，post用来提交数据

- get参数有长度限制（受限于url长度，具体的数值取决于浏览器和服务器的限制，最长2048字节），而post无限制。

- get请求的数据会附加在url之 后，以 " ？ "分割url和传输数据，多个参数用 "&"连接，而post请求会把请求的数据放在http请求体中。

- get是明文传输，post是放在请求体中，但是开发者可以通过抓包工具看到，也相当于是明文的。

- get请求会保存在浏览器历史记录中，还可能保存在web服务器的日志中

### 6.常用语法

- axios(config): 通用/最本质的发任意类型请求的方式
- axios.get(url[,config]): 发 get 请求

```js
axios.get('demo/url', {
    params: {
        id: 123,
        name: 'Henry',
    },
   timeout: 1000,
  ...//其他相关配置
})
```

- axios.post(url[, data, config]): 发 post 请求

```js
axios.post('demo/url', {
    id: 123,
    name: 'Henry',
},{
   timeout: 1000,
    ...//其他相关配置
})
```

- axios.all(promises): 用于批量执行多个异步请求

### 7.axios基本使用

#### 7.1axios(config)

```js
// 1.axios的基本使用
axios({ //默认 get 请求
  //能用
  url: 'http://152.136.185.210:7878/api/m5/home/multidata',
  method: 'get'
}).then(res => {
   console.log(res);
})
```

#### 7.2发送并发请求axios.all([])

- 参数拼接
  - params:{}专门针对get请求的参数拼接
  - data:{}：专门针对post请求的参数拼接

```js
// 2.axios发送并发请求
axios.all([axios({
  baseURL:'http://152.136.185.210:7878/api/m5',
  url: '/home/multidata'
}), axios({
  baseURL:'http://152.136.185.210:7878/api/m5',
  url: '/home/data',
  params: {
    type: 'sell',
    page: 5
  },
})])
  .then(result => {
    console.log(result);//也是个数组
})
```

#### 7.3全局配置

- 参数拼接
  - params:{}专门针对get请求的参数拼接,
  - data:{}：门针对post请求的参数拼接

```js
// 2.使用全局的配置在进行网络请求
//全局配置
axios.defaults.baseURL = 'http://152.136.185.210:7878/api/m5'
axios.defaults.timeout = 5000 //5s

axios({ //默认 get 请求
  url: '/home/data',
  // params专门针对get请求的参数拼接,post的是data:{}
  params: {
    type: 'pop',
    page: 1
  },
  method: 'get'
}).then(res => {
  console.log(res);
})
```

#### 7.4创建对应的axios的实例(开发时常用)

- 针对多个服务器，接口地址不同
  - 可以使用` axios.create`创建多个实例

```js
// 3.创建对应的axios实例
// const instance1 = axios.create({
//   baseURL: 'http://152.136.185.210:7878/api/m5',
//   timeout: 5000,
// })

// instance1({
//   url: '/home/multidata',
// }).then(res => {
//   console.log(res);
// })

// instance1({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   },
// }).then(res => {
//   console.log(res);
// })

// const instance2 = axios.create({
//   baseURL: 'http://158.126.185.240:8080/api',
//   timeout: 9000,
// })
```

### 8.封装axios

```js
import axios from 'axios'
```

#### 8.1Promise封装(推荐)

```js
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000,
    })

    // 发送真正的网络请求
    return instance(config) //本身返回一个Promise
}

// 封装request模块
import { request } from './network/request'
request({
  url: '/home/multidata',
}, res => {
  console.log(res); //success
}, err => {
  console.log(err); //failure
})

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     // 1.创建axios的实例
//     const instance = axios.create({
//       baseURL: 'http://152.136.185.210:7878/api/m5',
//       timeout: 5000,
//     })

//     // 发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })})
// }

request({
  url: '/home/multidata',
}, res => {
  console.log(res); //success
}, err => {
  console.log(err); //failure
})
```

#### 8.2方式二

```js
export function request(config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000,
  })

  // 发送真正的网络请求
  instance(config)
    .then(res => {
      // 回调出去
      success(res);
    })
    .catch(err => {
      failure(err);
    })
}

// 4.封装request模块
import { request } from './network/request'
request({
  url: '/home/multidata'  //config,
}).then(res => {          //success,
  console.log(res);
}).catch(err => {         //failure
  console.log(err);
})
```

#### 8.3方式三

```js
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000,
  })

  // 发送真正的网络请求
  instance(config.baseConfig)
    .then(res => {
      // console.log(res);
      // 回调出去
      config.success(res);
    })
    .catch(err => {
      // console.log(err);
      config.failure(err);
    })
}

// 4.封装request模块
import { request } from './network/request'
request({
  baseConfig: {

  },
  success: function(res) {

  },
  failure: function(err) {

  }
})
```

### 9.axios拦截器，拦截后，一定要把它返回

- 全局拦截器：` axios.interceptor`
- 局部拦截器
  - 请求拦截：` 实例.interceptors.request.use()`
    - 作用是在请求发送前进行一些操作
    - 比如每次发送网络请求，希望在界面中显示一个加载图标(在响应拦截中取消)
  - 响应拦截：` 实例.interceptors.response.use()`
    - 作用是在接收到响应后进行一些操作

```js
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000,
    })

    //请求拦截 ，传入两个参数，参数可自定义
    instance.interceptors.request.use(config => {
      // console.log(config);
      //1.比如config中的一些信息不符合服务器的要求
      //2.比如每次发送网络请求，希望在界面中显示一个加载图标(在响应拦截中取消)
      return config; //拦截后，一定要把它返回
    }, err => {
      // console.log(err);
    });
  
    //响应拦截 ，传入两个参数，参数可自定义
    instance.interceptors.response.use(res => {
      console.log(res);
      return res.data //有用的是data，只返回这个
    }, err => {
      console.log(err);
    })

    // 发送真正的网络请求
    return instance(config)
}
```

