import { forward } from './router';
import env from '@/config/env';
import { hideLoading, showLoading } from '@/config/serviceLoading';

function rejectMessage(err: { errno: number; errmsg: string }) {
  const { errmsg = '抢购火爆，稍候片刻！', errno = -1 } = err;
  switch (errno) {
    case 10000:
      // 特殊异常处理
      forward('login');
      break;

    default:
      uni.showToast({
        title: errmsg,
        icon: 'error'
      });
      break;
  }
}

// h5环境开启代理
const apiBaseUrl = env.apiBaseUrl;

function baseRequest(
  method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    | undefined,
  url: string,
  data: { isLoading: any }
) {
  return new Promise((resolve, reject) => {
    showLoading(data.isLoading);
    delete data.isLoading;
    let responseDate: unknown;
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        'content-type': 'application/json;',
        token: uni.getStorageSync('token')
        // 'content-type':
        // method === 'GET'
        //   ? 'application/json; charset=utf-8'
        //   : 'application/x-www-form-urlencoded'
      },
      data,
      success: (res: any) => {
        console.log(`res`, res);
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.code !== 500) {
            responseDate = res.data;
            resolve(responseDate);
          } else {
            reject(res.data);
            rejectMessage({
              errno: res.data.code,
              errmsg: res.data.msg // Use the appropriate property for error message
            });
          }
        } else {
          reject(res.data);
          rejectMessage({
            errno: -1,
            errmsg: '抢购火爆，稍候片刻！'
          });
        }
      },
      fail: () => {
        rejectMessage({
          errno: -1,
          errmsg: '网络不给力，请检查你的网络设置~'
        });
      },
      complete: (data) => {
        // console.log(data, 'data');
        // resolve(responseDate);
        hideLoading();
      }
    });
  });
}

const http = {
  get: <T>(api: string, params: any) =>
    baseRequest('GET', api, {
      // ...getCommonParams(),
      ...params
    }) as Http.Response<T>,
  post: <T>(api: string, params: any) =>
    baseRequest('POST', api, {
      // ...getCommonParams(),
      ...params
    }) as Http.Response<T>
};

export default http;
