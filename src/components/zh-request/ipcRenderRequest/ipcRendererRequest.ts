import { ipcRenderer } from 'electron';

export const sendSync = async (params: any) => {
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
