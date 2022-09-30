/*
 * @Author: zzh
 * @Date: 2022-03-07 15:10:24
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:10:14
 * @Description: hs-table model
 * @FilePath: \zh-admin\src\model\hsTableModel.ts
 */

import { RequestParamsModel } from './requestModel';

// 表单设置
 interface FormSettingsModel {
    useSearchForm: boolean
    labelWidth: string
    formModel: object | any
    fields: Array<FormItem>
    actionsNeedNewRow: boolean
    hasSearchButton: boolean
    hasResetButton: boolean
    hasImportButton: boolean
    hasExportButton: boolean
    hasSaveButton: boolean
    hasCancelButton: boolean
    actions: Array<any>
    headActions: Array<any>
    request: RequestParamsModel
    updateRequest: RequestParamsModel
    upload: any
    export: any
 }

 interface FormItem {
    label: string
    labelWidth: string
    prop: string
    type: string
    inputType: any
    width: string 
    labelTxt: string
    placeholder: string
    disabled: boolean
    remote: boolean
    remoteMethod: Function | undefined
    changeMethod:Function | undefined | any
    options: Array<any>
    multiple: boolean | undefined
    valueKey: string | undefined
    timeType: any
    timeShowFormat: string
    timeValueFormat: string
    clearable: boolean
    convertValue: Function
    extendMethod: Function
    deleteOriginProperty: boolean
    defaultValue: any
    props: any
 }

// table设置
interface TableSettingsModel {
   columns: Array<any>
   needInitialData: boolean
   data: Array<any>
   defaultExpandAll: boolean | any
   height: string | number | undefined
   highlightCurrentRow: boolean | undefined
   rowKey: string | undefined
   select: Function | undefined
   hasSelection: boolean | undefined
   hasIndex: boolean | undefined
   needOperations: boolean | undefined
   operationSettings: operationSettingsModel | undefined
   operations: Array<any> | undefined
   rowClick: Function | undefined | null
}

interface operationSettingsModel {
   label: string
   fixed: string
   width: string
   minWidth: string
   align: string
}

// table设置行
interface TableSettingPanelModel {
   showTableSettingPanel: boolean
   tableTitle: string
   secondaryTitle: string | undefined
}

interface pageSettingsModel {
   hasPage: boolean
   current: number
   size: number
   total: number
   pagerCount: number
}


 export 
 {
    FormSettingsModel,
    TableSettingsModel,
    TableSettingPanelModel,
    pageSettingsModel
 };