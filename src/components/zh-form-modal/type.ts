export interface TModal {
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