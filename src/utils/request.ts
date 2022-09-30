/*
 * @Author: zzh
 * @Date: 2022-02-26 15:34:55
 * @LastEditors: zzh
<<<<<<< HEAD
 * @LastEditTime: 2022-02-26 16:16:53
=======
 * @LastEditTime: 2022-04-10 17:15:47
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
 * @Description: 请求方法
 * @FilePath: \zh-admin\src\utils\request.ts
 */
import request from './axios';
<<<<<<< HEAD

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
=======
import { RequestParamsModel } from '../model/requestModel';
import { popSuccessMessage, popErrorMessage } from '@/components/hs-message';
import storage from './storage';

export const post = async (params: RequestParamsModel) => {
    let result: any = {};
    const commonParams = storage.getCommonParams();
    params.conditions = {...params.conditions, ...commonParams };
    try {      
        result = await request({ url: params.url, method: 'post', data: params.conditions, timeout: params.timeout });
        if (result.success) {
            params.successMessage && popSuccessMessage(params.successMessage);
        } else {
            params.errorMessage && popErrorMessage(params.errorMessage + (params.notNeedBackEndErrorMessage ? '' : `: ${result.errorMsg}`));
        }
    } catch (error) {
        params.errorMessage && popErrorMessage(params.errorMessage + (params.notNeedBackEndErrorMessage ? '' : `: ${error}`));
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
        result = { success: false };
    }
    return result;
};

<<<<<<< HEAD
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
=======
export const get = async (params: RequestParamsModel) => {
    let result: any = {};
    try {
        result = await request({ url: params.url, method: 'get', params:params.conditions, timeout: params.timeout });
        if (result.success) {
            params.successMessage && popSuccessMessage(params.successMessage);
        } else {
            params.errorMessage && popErrorMessage(params.errorMessage + params.notNeedBackEndErrorMessage ? '' : `: ${result.errMsg || result.errorMsg}`);
        }
    } catch (error) {
        params.errorMessage && popErrorMessage(params.errorMessage + params.notNeedBackEndErrorMessage ? '' : `: ${result.errMsg}`);
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
        result = { success: false };
    }
    return result;
};