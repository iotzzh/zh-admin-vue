/*
 * @Author: zzh
 * @Date: 2022-02-26 15:34:55
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:15:47
 * @Description: 请求方法
 * @FilePath: \zh-admin\src\utils\request.ts
 */
import request from './axios';
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
        result = { success: false };
    }
    return result;
};

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
        result = { success: false };
    }
    return result;
};