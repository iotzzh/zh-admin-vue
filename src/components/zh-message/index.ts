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

const popWarningMessage = (message: string, duration = 5000) => {
  ElMessage({
    message,
    grouping: true,
    type: 'warning',
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
    const result = await ElMessageBox.confirm(message, title, { closeOnClickModal: false, });
    return result === 'confirm';
  } catch (error) {
    return false;
  }
};

export {
  popSuccessMessage,
  popErrorMessage,
  popInfoMessage,
  isMessageConfirm,
  popWarningMessage
};
