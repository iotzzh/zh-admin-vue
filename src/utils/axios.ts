/*
 * @Author: zzh
 * @Date: 2022-02-26 15:23:20
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-26 15:32:56
 * @Description: axios请求文件
 * @FilePath: \zh-admin\src\utils\axios.ts
 */
import axios from 'axios';
// import router from '../router';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 10000 // 后端请求超时时间时9s
});

service.interceptors.request.use(
    config => {
        // const token = sessionStorage.getItem('Token'); //token
        const timestamp = new Date().getTime(); //时间戳           
        // if (token) {
        //     config.headers['token'] = token;
        //     config.headers['Cache-Control'] = 'no-cache';
        // }

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
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.errCode === 'E996') {
                return null;
            } else {
                return response.data;
            }

        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;