

export interface TZHFormSettings {
  rules?: Array<any>
  formLabelWidth?: string | number
  fields?: Array<TZHFromField>
  hideUnimportantFields?: boolean
}

export interface TZHFromField {
  // <!--xl:1920, lg:1200, md:992,sm:768, xs:<768  -->
  span?: number // 表格的span非必填
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
  type: string
  unimportant?: boolean
  label?: string
  prop: string
  refName?: string
  defaultValue?: any
  labelWidth?: string | number
  hide?: boolean
  width?: string | number
  placeholder?: string
  disabled?: boolean
  clearable?: boolean

  // 下拉选择/级联选择
  options?: Array<TZHFromFieldSelectOption> | Array<TZHFromFieldCascaderOption> | Array<{ [x: string]: any }>

  // 级联选择器的参数
  props?: TZHFromFieldCascaderProps
  // 输入框 input
  inputType?: string

  // 开关Switch
  activeText?: string
  inactiveText?: string
  activeValue?: any
  inactiveValue?: any
  // 下拉
  valueKey?: string
  multiple?: boolean
  remote?: boolean
  remoteMethod?: Function
  // 时间选择器
  timeType?: string
  timeShowFormat?: string
  timeValueFormat?: string
  // 级联选择器
  checkedNodes?: Array<any>

  // 多选框
  checkboxText?: string
  checkboxSize?: Number
}

export interface TZHFromFieldSelectOption {
  label: string
  value: any
  text?: string
}

// TODO
export interface TZHFromFieldCascaderOption {
  test: string

}

export interface TZHFromFieldCascaderProps {
  expandTrigger?: string
}

export interface TObject {
  [x: string]: any
}