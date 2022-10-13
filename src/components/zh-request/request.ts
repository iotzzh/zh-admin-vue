import request from './axios';

export const post = async (params: any) => {
    let result: any = {};
    try {      
        result = await request({ url: params.url, method: 'post', data: params.conditions, timeout: params.timeout });
    } catch (error) {
        result = { success: false };
    }
    return result;
};

export const get = async (params: any) => {
    let result: any = {};
    try {
        result = await request({ url: params.url, method: 'get', params:params.conditions, timeout: params.timeout });
    } catch (error) {
        result = { success: false };
    }
    return result;
};