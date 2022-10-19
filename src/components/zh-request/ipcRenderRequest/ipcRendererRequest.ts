import { ipcRenderer } from 'electron';
import { TParams } from '../type';

export default class {
  get = async (params: TParams) => {
      let result: any = {};
      try {
        result = ipcRenderer.sendSync(
          params.url,
          JSON.parse(JSON.stringify(params.conditions))
        );
        if (result.resCode === '00') result.success = true;
      } catch (error) {
        result = { success: false };
      }
      return result;
  };
}