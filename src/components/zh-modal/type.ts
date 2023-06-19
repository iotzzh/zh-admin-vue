export interface TZHModal {
  show?: boolean // 是否展示
  width?: string // 弹窗宽度
  loadingSubmit?: boolean // 提交按钮是否处于loading状态
  loadingPage?: boolean // 弹窗是否处于loading状态
  bodyHeight?: string | number // 
  title?: string // 标题
  data?: any // 暂存数据
  type?: any
  top?: string
  fullscreen?: boolean
  customClass?: string

  footer?: TZHModalFooter

  onBeforeSubmit?: Function
  onAfterSubmit?: Function
}

export interface TZHModalFooter {
  hasCancelButton?: boolean
  hasSubmitButton?: boolean
}