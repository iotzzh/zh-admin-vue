import { TZHFormSettings } from '../zh-form/type';

export interface TZHTreeSetting {
  hasAdd?: boolean
  hasEdit?: boolean
  hasDelete?: boolean

  formSettings?: TZHFormSettings
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