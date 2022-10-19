import { sendSync } from './ipcRenderRequest/ipcRendererRequest';
import AxiosRequest from './axios/axiosRequest';
import Config from './config';
import { TParams } from './type';

export default class {
  useAxios: boolean;
  instance?: AxiosRequest;
  constructor() {
    this.useAxios = Config.useAxios;

    if(this.useAxios) {
      this.instance = new AxiosRequest();
    }
  }

  static get(params: TParams){
    const useAxios = Config.useAxios;
    if (useAxios) {
      const request = new AxiosRequest();
      request.get(params);
    }
  }

  static post(params: TParams) {
    const useAxios = Config.useAxios;
    if (useAxios) {
      const request = new AxiosRequest();
      request.get(params);
    }
  }

  static put() {
    console.log();
  }

  static delete () {
    console.log();
  }

  get = () => {  console.log(); };
  post = () => {  console.log(); };
  put = () => {  console.log(); };
  delete = () => {  console.log(); };
  cancel = () => {  console.log(); };
}