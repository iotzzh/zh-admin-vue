

export interface TFormSettings {
  rules?: Array<any>
  formLabelWidth?: string | number
  fields?: Array<TField>
}

export interface TField {
  span?: number // 表格的span非必填
  type: string
  label?: string
  prop: string
  defaultValue?: any
  labelWidth?: string | number
  hide?: boolean
  width?: string | number
  placeholder?: string
  disabled?: boolean
  clearable?: boolean

  // 表格使用表单时，默认值变化时就搜索数据，个别字段变化不需要搜索，使用该值：notSearchTable = 'true'
  notSearchTable?: boolean

  // 下拉选择/级联选择
  options?: Array<TSelectOption> | Array<TCascaderOption>

  // 级联选择器的参数
  props?: TCascaderProps
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

  // 多选框
  checkboxText?: string
  checkboxSize?: Number

  // 转换方法
  convert?: Function

  // 时间转换
  convertDateTime?: Array<TConvertDateTime>

  // 针对需要额外扩展的参数，例如 { a: 'a' } => { b: 'a1', c: 'a2' }
  extendedFieldMethod?: Function
  notDeleteOriginProperty?: boolean
}

export interface TConvertDateTime {
  field: string
  format: string
}

export interface TSelectOption {
  label: string
  value: any
  text?: string
}

// TODO
export interface TCascaderOption {
  test: string

}

export interface TCascaderProps {
  expandTrigger?: string
}