/*
 * @Author: zzh
 * @Date: 2022-02-26 15:23:20
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:18:57
 * @Description: axios请求文件
 * @FilePath: \zh-admin\src\utils\axios.ts
 */
import axios from 'axios';
import router from '../router';
import { popErrorMessage } from '@/components/hs-message';
import storage from './storage';

const service = axios.create({
    timeout: 15000 // 后端请求超时时间时9s, 所以前端默认10s，避免后端还没有断开，前端提前断开
});

service.interceptors.request.use(
    config => {
        const timestamp = new Date().getTime(); //时间戳           
        if (config.headers) {
            // config.headers['token'] = token;
            config.headers['Cache-Control'] = 'no-cache';
        }

        if (config.method === 'post') {
            config.params = {
                ts: timestamp,
            };
        } else if (config.method === 'get') {
            config.params = {
                ts: timestamp,
                ...config.params
            };
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.errorCode === 'C10') {
                sessionStorage.clear();
                localStorage.clear();
                router.push('/'); //跳转到登录
                popErrorMessage('Token已过期，请重新登录');
              } else {
                return response.data;
              }
        } else {
            Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
export default service;