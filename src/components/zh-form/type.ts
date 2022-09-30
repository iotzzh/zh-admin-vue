

export interface TFormSettings {
  rules?: Array<any>,
  formLabelWidth?: string | number,
  fields?: Array<TField>, 
}

export interface TField {
  span: number,
  type: string,
  label: string,
  prop: string,
  labelWidth?: string | number,
  hide?: boolean,
  width?: string,
  placeholder?: string,
  disabled?: boolean,
  options?: Array<TSelectOption> | Array<TCascaderOption>,
  clearable?: boolean,
  props: TCascaderProps,
  // 输入框 input
  inputType?: string,

  // 开关Switch
  activeText?: string,
  inactiveText?: string,
  activeValue?: any,
  inactiveValue?: any,
  // 下拉
  valueKey?: string,
  multiple?: boolean,
  remote?: boolean,
  remoteMethod?: Function,
  // 时间选择器
  timeType?: string,
  timeShowFormat?: string,
  timeValueFormat?: string,
  // 级联选择器

  // 多选框
  checkboxText?: string,
  checkboxSize?: Number,
}

export interface TSelectOption {
  label: string,
  value: any,
  text?: string,
}

// TODO
export interface TCascaderOption {
  test: string,

}

export interface TCascaderProps {
  expandTrigger?: string,
}