import { TZHRequestParams } from '../type';
import request from './axios';

export default class {
    controller: AbortController;
    constructor() {
        this.controller = new AbortController();
    }

    get = async (params: TZHRequestParams) => {
        let result: any = {};
        try {
            result = await request({ url: params.url, method: 'get', params: params.conditions, timeout: params.timeout, signal: this.controller.signal });
        } catch (error) {
            result = { success: false };
        }
        return result;
    };

    post = async (params: TZHRequestParams) => {
        let result: any = {};
        try {
            result = await request({ url: params.url, method: 'post', data: params.conditions, timeout: params.timeout, signal: this.controller.signal });
        } catch (error) {
            result = { success: false };
        }
        return result;
    };

    cancel = async () => {
        this.controller.abort();
    };
}