export interface TRequest {
  urlList?: string
  conditionsList?: Object
  urlDelete?: string // 单个删除
  conditionsDelete?: Object
  urlBatchDelete?: string // 批量删除
  urlAdd?: string
  conditionsAdd?: Object
  urlEdit?: string
  conditionsEdit?: Object
  initialData?: boolean
  successMessage?: string
  errorMessage?: string
}