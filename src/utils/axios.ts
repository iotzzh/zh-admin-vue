/*
 * @Author: zzh
 * @Date: 2022-02-26 15:23:20
 * @LastEditors: zzh
<<<<<<< HEAD
 * @LastEditTime: 2022-02-26 15:32:56
=======
 * @LastEditTime: 2022-04-10 17:18:57
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
 * @Description: axios请求文件
 * @FilePath: \zh-admin\src\utils\axios.ts
 */
import axios from 'axios';
<<<<<<< HEAD
// import router from '../router';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 10000 // 后端请求超时时间时9s
=======
import router from '../router';
import { popErrorMessage } from '@/components/hs-message';
import storage from './storage';

const service = axios.create({
    timeout: 15000 // 后端请求超时时间时9s, 所以前端默认10s，避免后端还没有断开，前端提前断开
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
});

service.interceptors.request.use(
    config => {
<<<<<<< HEAD
        // const token = sessionStorage.getItem('Token'); //token
        const timestamp = new Date().getTime(); //时间戳           
        // if (token) {
        //     config.headers['token'] = token;
        //     config.headers['Cache-Control'] = 'no-cache';
        // }
=======
        const timestamp = new Date().getTime(); //时间戳           
        if (config.headers) {
            // config.headers['token'] = token;
            config.headers['Cache-Control'] = 'no-cache';
        }
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1

        if (config.method === 'post') {
            config.params = {
                ts: timestamp,
            };
        } else if (config.method === 'get') {
            config.params = {
                ts: timestamp,
                ...config.params
            };
<<<<<<< HEAD
        }        
=======
        }
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
        return config;
    },
    error => {
        console.log(error);
<<<<<<< HEAD
        return Promise.reject();
=======
        return Promise.reject(error);
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
<<<<<<< HEAD
            if (response.data.errCode === 'E996') {
                return null;
            } else {
                return response.data;
            }

        } else {
            Promise.reject();
=======
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
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
        }
    },
    error => {
        console.log(error);
<<<<<<< HEAD
        return Promise.reject();
    }
);

=======
        return Promise.reject(error);
    }
);
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
export default service;