### 为什么要封装axios

- 降低耦合度，方便后期维护
  - 如果不进行封装，就会造成耦合度太高，一旦`axios`库不再维护，需要换库就很麻烦，需要一个页面一个页面的去找到并更改，这就会造成不必要的麻烦
  - 而封装之后，只需要修改一个地方即可

### 实现功能

- 实现三类拦截器：不同实例的所有请求、同一个实例的所有请求、同一个实例的部分请求
- 根据需求可创建多个实例对象
- 拦截`token`
- 可选是否有`loading`动画
  - `loading`动画使用了`element-plus`组件库

### 具体代码如下

- `service/request/index.ts`

```typescript
// 使用类封装，封装性比单纯封装成函数更强
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LXRequestInterceptors, LXRequestConfig } from './type'

import { ElLoading, ILoadingInstance } from 'element-plus'

// 默认有loading
const DEFAULT_LOADING = true

// 这个类允许创建多个实例(多个baseURL)，根据自己需求决定是否创建
class LXRequest {
  // 属性
  instance: AxiosInstance //定义变量 - 保存实例
  interceptors?: LXRequestInterceptors // 拦截器
  showLoading: boolean
  loading?: ILoadingInstance
  // 构造器
  constructor(config: LXRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 报存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 保留interceptors
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的拦截器

    // 让每个请求单独传入拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例(请求)都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例拦截器：请求拦截成功')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            // 遮罩
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例拦截器：请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例拦截器：响应拦截成功')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          // 真实开发是在界面显示
          // console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有的实例拦截器：响应拦截失败')

        // 将loading移除
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息，实际开发中使用switch
        if (err.response.status === 404) {
          console.log('404错误~')
        }
        return err
      }
    )
  }

  // 封装request函数
  request<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      //相当于 axios.request
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)

          // 2.将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // 修改
  patch<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LXRequest
```

- `service/request/type.ts`

```typescript
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 定义一个接口，有四个属性(函数)  拦截器传入 可选 拦截器本质是函数
export interface LXRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  // 正确拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 错误拦截
  requestInterceptorCatch?: (error: any) => any

  // 响应拦截
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // responseInterceptor?: (res: any) => any // 不是最优解
  // 正确拦截
  responseInterceptor?: (res: T) => T // 最优解
  // 错误拦截
  responseInterceptorCatch?: (error: any) => any
}

// 继承
// 将AxiosRequestConfig类型进行扩展，还可以扩展其他的，不止下面两种
export interface LXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 扩展了拦截 可选
  interceptors?: LXRequestInterceptors<T>
  // 扩展loading 可选
  showLoading?: boolean
}
```

- `service/request/config.ts`
  - 区分环境

```typescript
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://lx.org/development'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://lx.org/production'
} else {
  BASE_URL = 'http://lx.org/test'
}

export { BASE_URL, TIME_OUT }
```

- `service/index.ts`

```typescript
import LXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

// new LXRequest -> 一个实例对象
/**
 * 如果有多个base_URL，那么可以导出多个，例：
 * axios实例2
 * export const lxRequest2 = new LXRequest({
 *    baseURL: '地址2',
 * })
 */

// axios实例1
// 通过类的constructor构造器，构造出不同的实例，这些实例之间没有任何的干扰
const lxRequest = new LXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 可以给每个实例请求单独传入自己的拦截器 可选 只属于lxRequest
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      // 从缓存中取到token
      const token = localCache.getCache('token')
      if (token) {
        // headers请求头 Authorization授权 Bearer表示信使
        config.headers.Authorization = `Bearer ${token}`
      }

      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default lxRequest
```

- `utils/cache.ts`
  - 设置本地缓存

```typescript
// 本地缓存
class LocalCache {
  // 设置缓存
  setCache(key: string, value: any) {
    // setItem设置键值对，value一定是string，使用JSON.stringify转化
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存数据
  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    // 判断是否有值
    if (value) {
      // JSON.parse将string转化为原来的类型
      return JSON.parse(value)
    }
  }

  // 删除某个缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
```

