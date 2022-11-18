export interface TZHRequestParams {
  url: string
  conditions?: Object
  timeout?: number
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