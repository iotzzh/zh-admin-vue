import AxiosRequest from './axios/axiosRequest';
import { TZHRequestParams } from './type';

export default class ZHRequest {
  instance?: AxiosRequest;
  constructor() {
    this.instance = new AxiosRequest();
  }

  static async get(params: TZHRequestParams) {
    const request = new AxiosRequest();
    return await request.get(params);
  }

  static async post(params: TZHRequestParams) {
    const request = new AxiosRequest();
    return await request.post(params);
  }

  static put() {
    console.log();
  }

  static delete() {
    console.log();
  }

  get = () => { console.log(); };
  post = () => { console.log(); };
  put = () => { console.log(); };
  delete = () => { console.log(); };
  cancel = () => { console.log(); };
}