import { TFormSettings } from '../zh-form/type';

export interface TTableFormSettings extends TFormSettings {
  hasSearchButton?: boolean
  hasDeleteButton?: boolean
  hasExportButton?: boolean
  hasAddButton?: boolean
}

export interface TPageSetting {
  sizes?: Array<number>
  current?: number
  size?: number
  pagerCount?: number
  total?: number
  layout?: string
}

export interface TTableSetting {
  height?: string | number
  highlightCurrentRow?: boolean
  rowKey?: string
  hasSelection?: boolean
  hasIndex?: boolean
  columns?: Array<TTableColumn>
  actionColumn?: TActionColumn

  rowClick: Function
}

export interface TTableColumn {
  editable?: boolean
  width?: number | string
  minWidth?: number | string
  align?: string
  label?: string
  prop?: string
  fixed?: boolean | string
  sortable?: boolean
  className?: string
  convert?: Function
  format?: string
  useSlot?: boolean
  nullValue?: any
}

export interface TActionColumn {
  hasRowEditAction?: boolean
  hasRowDeleteAction?: boolean
  fixed?: string
  width?: string | number
  minWidth?: string
  label?: string
  align?: string
  buttons?: Array<TActionColumnButton>
}

export interface TActionColumnButton {
  displayMethod?: Function
  hide?: boolean
  type?: string
  size?: string
  icon?: string
  style?: any
  method?: Function
  label?: string
}

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

export interface TRequestResult {
  success: boolean
  resCode: string
  data: any
}

export interface TPage {
  total: number
  size: number
  current: number
}