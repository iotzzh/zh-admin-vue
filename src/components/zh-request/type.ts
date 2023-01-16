export interface TZHRequestParams {
  url: string
  conditions?: Object
  timeout?: number
  notNeedBackEndErrorMessage?: boolean
  errorMessage?: string
  successMessage?: string
}

export interface TZHRequestResult {
  success: boolean
  errorCode: string
  errorMessage: string
  exceptionMessage: string
  data: any
}