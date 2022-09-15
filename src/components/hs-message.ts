/*
 * @Author: zzh
 * @Date: 2022-03-07 13:39:30
 * @LastEditors: zzh
 * @LastEditTime: 2022-06-21 22:50:33
 * @Description: 基于Element UI Message的二次封装
 * @FilePath: \zh-admin\src\components\hs-message.ts
 */
import { ElMessage, ElMessageBox } from 'element-plus';

const popSuccessMessage = (message: string, duration = 5000) => {
    ElMessage({
        message,
        grouping: true,
        type: 'success',
        duration,
      });
};

const popErrorMessage = (message: string, duration = 5000) => {
    ElMessage({
        message,
        grouping: true,
        type: 'error',
        duration,
      });
};

const popInfoMessage = (message: string, duration = 5000) => {
    ElMessage({
        message,
        grouping: true,
        type: 'info',
        duration,
      });
};

const isMessageConfirm = async (message: string, title: string) => {
    try {
        const result = await ElMessageBox.confirm(message, title, { closeOnClickModal: false });
        return result === 'confirm';
    } catch(error) {
        console.info('cancel');
        return false;
    }

};

export 
{
    popSuccessMessage,
    popErrorMessage,
    popInfoMessage,
    isMessageConfirm,
};