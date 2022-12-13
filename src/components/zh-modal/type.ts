export interface TZHModal {
  show: boolean
  width?: string
  loadingSubmit?: boolean
  loadingPage?: boolean
  bodyHeight?: string | number
  title: string
  // 暂存数据
  data?: any
  type?: any
  top?: string
  fullscreen?: boolean
  customClass?: string

  footer?: TZHModalFooter
}

export interface TZHModalFooter {
  hasCancelButton?: boolean,
  hasSubmitButton?: boolean,
}