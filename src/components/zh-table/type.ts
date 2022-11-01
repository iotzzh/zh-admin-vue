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
  height?: string | number // 表格高度，示例：'100%', '100px', 100
  highlightCurrentRow?: boolean // 高亮选中行
  rowKey?: string // 行内唯一值，没有该值，无法使用checkbox
  hasSelection?: boolean // 是否存在checkbox列
  hasIndex?: boolean // 是否存在Index列
  columns?: Array<TTableColumn> // 列配置，内包含新增和编辑的列配置
  actionColumn?: TActionColumn // 操作列配置

  // 事件
  rowClick?: Function

  // 函数注入
  onBeforeInitData?: Function // 在初始化数据之前执行
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
  onClick?: Function
  label?: string
}

export interface TRequest {
  urlList?: string // 列表查询
  conditionsList?: Object
  urlDelete?: string // 单个删除
  conditionsDelete?: Object
  urlBatchDelete?: string // 批量删除
  urlAdd?: string // 新增
  conditionsAdd?: Object
  urlUpdate?: string // 编辑
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