/**
 * Created by bootdo.
 */
import axios from 'axios';
import Vue from 'vue';
// import Env from './env';
const NO_LOGIN_ERROR_CODE: number = 401;
const baseURL: string = 'http://192.168.1.10:8002';
import { IApiData } from '../services/apiDataType';

axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

// 添加一个请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    if (window.localStorage.getItem('access-token')) {
      config.headers.Authorization = window.localStorage.getItem('access-token');
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
// 添加一个响应拦截器
axios.interceptors.response.use(
    (response: any) => {
        if (!response.data) {
            return;
        }
        if (response.data.code === NO_LOGIN_ERROR_CODE) {
            // bus.$emit('goto', '/login')
            return Promise.reject('未登录');
        }
        return response;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    },
);

interface IApiRes {
    code: number;
    currentTime: string;
    data: any;
    msg: string;
}

class Http {
    resolveResponse(requestPromise: Promise<any>): Promise<IApiData> {
        return requestPromise
        .then((res) => res.data)
        .then((res: IApiRes) => {
            if (!res || res.code !== 0) {
                return {
                    isSuccess: false,
                    errMsg: res.msg,
                    data: null,
                };
            }
            return {
                isSuccess: true,
                data: res.data,
            };
        })
        .catch((err: Error) => {
            console.log(err);
            return {
                isSuccess: false,
                errMsg: '服务器请求异常',
                data: null,
            };
        })
        .then((res: IApiData) => {
            if (!res.isSuccess) {
                Vue.prototype.$message.error({
                    showClose: false,
                    message: res.errMsg,
                    duration: 2000,
                });
            }
            return res;
        });
    }
    public post(url: string, params?: any): Promise<IApiData> {
        return this.resolveResponse(axios.post(`${baseURL}${url}`, params));
    }
    public get(url: string, params?: any): Promise<IApiData> {
        return this.resolveResponse(axios.get(`${baseURL}${url}`, params));
    }
    public put(url: string, params?: any): Promise<IApiData> {
        return this.resolveResponse(axios.put(`${baseURL}${url}`, params));
    }
    public delete(url: string, params?: any): Promise<IApiData> {
        return this.resolveResponse(axios.delete(`${baseURL}${url}`, params));
    }
    public patch(url: string, params?: any): Promise<IApiData> {
        return this.resolveResponse(axios.patch(`${baseURL}${url}`, params));
    }
}

export default new Http();
