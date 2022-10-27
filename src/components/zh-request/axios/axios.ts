import axios from 'axios';

const request = axios.create({
    timeout: 10000 // 默认超时10s
});

request.interceptors.request.use(
    config => {
        const timestamp = new Date().getTime(); //时间戳           
        if (config.headers) {
            // config.headers['token'] = token;
            config.headers['Cache-Control'] = 'no-cache';
        }

        if (config.method === 'post') {
            config.params = {
                // ts: timestamp,
            };
        } else if (config.method === 'get') {
            config.params = {
                // ts: timestamp,
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

request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
export default request;