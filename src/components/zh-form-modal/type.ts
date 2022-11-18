import { TZHFormSettings } from '../zh-form/type';
import { TZHModal } from '../zh-modal/type';

export interface TZHFormModal extends TZHModal {
  show: boolean
  width?: string
  title: string
  type?: any // add/edit/other
  // 暂存数据
  data?: any 
  top?: string
  fullscreen?: boolean
  customClass?: string
}

export interface TZHModalFormSettings extends  TZHFormSettings{
  customValidate?: (modelValue: {[x:string]:any}) => boolean // 自定义额外的校验
}