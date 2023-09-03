import type { AxiosRequestConfig, AxiosResponse } from 'axios';
// 定义一个接口，有四个属性(函数)  拦截器传入 可选 拦截器本质是函数
export interface LXRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;

  // 响应拦截
  responseInterceptor?: (res: T) => T; // 最优解
  responseInterceptorCatch?: (error: any) => any;
}

// 继承
export interface LXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 扩展了拦截 可选
  interceptors?: LXRequestInterceptors<T>;
  // 扩展loading 可选
  showLoading?: boolean;
}
