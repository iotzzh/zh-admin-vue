import { TZHFormSettings, TZHFromField } from '../zh-form/type';
import { TZHModal } from '../zh-modal/type';

export interface TZHModalForm extends TZHModal {
  // show: boolean
  width?: string
  title?: string
  type?: any // add/edit/other
  // 暂存数据
  data?: any 
  top?: string
  fullscreen?: boolean
  customClass?: string
  formSettings?: TZHFormSettings
}

export interface TZHModalFromField extends TZHFromField {
  // 表格使用表单时，默认值变化时就搜索数据，个别字段变化不需要搜索，使用该值：notChangeTriggerSearch = 'true'
  notChangeTriggerSearch?: boolean
}