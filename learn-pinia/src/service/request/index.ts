// 使用类封装，封装性比单纯封装成函数更强
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { LXRequestInterceptors, LXRequestConfig } from './type';

import { ElLoading, ElMessage } from 'element-plus';
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

// 默认有loading
const DEFAULT_LOADING = true;

// 这个类允许创建多个实例(多个baseURL)，根据自己需求决定是否创建
class LXRequest {
  // 属性
  instance: AxiosInstance;
  interceptors?: LXRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;
  // 构造器
  constructor(config: LXRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 报存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 保留interceptors
    this.interceptors = config.interceptors;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的拦截器
    // 让每个请求单独传入拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

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
          });
        }
        return config;
      },
      (err) => {
        // console.log('所有的实例拦截器：请求拦截失败')
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例拦截器：响应拦截成功')

        // 将loading移除
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === '-1001') {
          // 真实开发是在界面显示
          // console.log('请求失败，错误信息')
        } else {
          return data;
        }
      },
      (err) => {
        // console.log('所有的实例拦截器：响应拦截失败')

        // 将loading移除
        this.loading?.close();

        // 例子：判断不同的HttpErrorCode显示不同的错误信息，实际开发中使用switch
        // if (err.response.status === 404) {
        //   console.log('404错误~');
        // }
        switch (err.response.status) {
          case 403:
            ElMessage.error(
              '登录过期,用户得到授权，但是访问是被禁止的==>' + '403'
            );
            // store.commit('token', null);
            // setTimeout(() => {
            //   router.replace({
            //     path: '/Login',
            //   });
            // }, 1000);
            break;
          case 404:
            ElMessage.error('404错误');
            break;
        }
        return err;
      }
    );
  }

  request<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      //相当于 axios.request
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // console.log(res)

          // 2.将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  // 修改
  patch<T = any>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default LXRequest;
