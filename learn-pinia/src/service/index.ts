import LXRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';

// import localCache from '@/utils/cache'
import localCache from '../utils/cache';

// new LXRequest -> 一个实例对象
const lxRequest = new LXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 可以让每个请求单独传入自己的拦截器 可选 只属于lxRequest
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      // 从缓存中取到token
      const token = localCache.getCache('token');
      if (token) {
        // headers请求头 Authorization授权
        config.headers!.Authorization = `Bearer ${token}`;
      }

      // console.log('请求成功的拦截')
      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err;
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res;
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err;
    }
  }
});

export default lxRequest;
