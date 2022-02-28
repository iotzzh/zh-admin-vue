/*
 * @Author: zzh
 * @Date: 2022-02-26 15:34:55
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-26 16:16:53
 * @Description: 请求方法
 * @FilePath: \zh-admin\src\utils\request.ts
 */
import request from './axios';

export const post = async(url:string, query: object, successMessage: string, errorMessage: string, timeout: number | undefined) => {
    let result:any = {};
    try {
        result =  await request({ url, method: 'post', data: query, timeout });
        if (result.success) {
            // successMessage && popSuccessMessage(that, successMessage);
        } else {
            // errorMessage && popErrorMessage(that, errorMessage);
        }
    } catch(error) {
        // errorMessage && popErrorMessage(that, errorMessage);
        result = { success: false };
    }
    return result;
};

export const get = async(url:string, params: object, successMessage: string, errorMessage: string, timeout: number | undefined) => {
    let result:any = {};
    try {
        result =  await request({ url, method: 'get', params: params, timeout });
        if (result.success) {
            // successMessage && popSuccessMessage(that, successMessage);
        } else {
            // errorMessage && popErrorMessage(that, errorMessage);
        }
    } catch(error) {
        // errorMessage && popErrorMessage(that, errorMessage);
        result = { success: false };
    }
    return result;
};