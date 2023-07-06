import { TZHFormSettings } from '../zh-form/type';
import { TZHFormModal } from '../zh-form-modal/type';
import { TZHTableModal } from '../zh-table/type';

export interface TZHTreeSetting {
  hasAdd?: boolean
  hasEdit?: boolean
  hasDelete?: boolean
  hasEmptyAdd?: boolean
  hasRootAdd?: boolean
  labelDisplayMaxLength?: number
  initialData?: boolean
  checkStrictly?: boolean
  showCheckbox?: boolean

  nodeClick?: Function

  modal?: TZHTreeModal // 弹窗配置
}

export interface TZHTreeModal extends TZHFormModal {
  customModel?: {[x:string]: any}
}

export interface TZHTreeRequest {
  urlGet?: string
  conditionsGet?: TObject
  urlAdd?: string
  conditionsAdd?: TObject
  urlDelete?: string // 单个删除
  conditionsDelete?: TObject
  urlEdit?: string
  conditionsEdit?: TObject
  successMessage?: string
  errorMessage?: string
}


export interface TObject {
  [x:string]: any
}