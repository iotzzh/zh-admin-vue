/*
 * @Author: zzh
 * @Date: 2022-03-10 14:30:54
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 22:09:50
 * @Description: 处理table相关的方法
 * @FilePath: \zh-admin\src\components\hs-table\table.ts
 */

import { ComputedRef, reactive, Ref, ref, nextTick  } from 'vue';
import { post } from '../../utils/request';
import { RequestParamsModel } from '../../model/requestModel';
import { TableSettingsModel, FormSettingsModel } from '../../model/hsTableModel';

const canEditCellList = reactive([] as any); // 可编辑单元格列表


const handleTableActionButton = async (method:Function, row:any, index:any) => {
    method({ row, index });
};

const displayActionButton = (method:Function, row:any, index:any) => {
   return method({ row, index });
};

const tableRowClick = async (tableSettings:any, row:any, column:any, event:any) =>  {
    tableSettings.rowClick && tableSettings.rowClick({row, column, event});
};

const tableCellDblClick = async (tableSettings:any, row:any, column:any, event:any) => {    
    if ((column.rawColumnKey && column.rawColumnKey.indexOf('editable') != -1) && 
        canEditCellList.findIndex((x: { key: any, label: any }) => x.key === row[tableSettings.rowKey] && x.label === column.label) === -1) {
        canEditCellList.push({ key: row[tableSettings.rowKey as string], label: column.label });
        console.log('canEditCellList: ' + JSON.stringify(canEditCellList));
    }

    tableSettings.tableCellDblClick && tableSettings.tableCellDblClick({row, column, event});
};

const tableRowDBClick = async (tableSettings:any, row:any, column:any, event:any) => {
    tableSettings.tableRowDBClick && tableSettings.tableRowDBClick({row, column, event});
};

const getData = async (data: Ref<any[]>, loading:  Ref<boolean>, formSttings: Ref<FormSettingsModel>,  conditions:ComputedRef<any>, page: any, tableSettings: any) =>  {
    loading.value = true;
    const params = JSON.parse(JSON.stringify(formSttings.value.request));
    params.conditions = conditions.value;
    const result = await post(params);
    if (result.success) {
        if (tableSettings.tableConvertData) {
            data.value = tableSettings.tableConvertData(result.data.records || result.data);
        } else {
            data.value = result.data.records || result.data;
        }

        page.total = Number(result.data.total);
    }
    loading.value = false;
};

const getTableData = async (data: Ref<any[]>, loading:  Ref<boolean>, formSttings: Ref<FormSettingsModel>,  conditions:ComputedRef<any>, page: any) =>  {
    const params = JSON.parse(JSON.stringify(formSttings.value.request));
    params.conditions = conditions.value;
    const result = await post(params);
    if (result.success) {
        return result.data.records;
    } else {
        return [];
    }
};

// const editRow = async () => {
    
// };

//#region 单元格内方法
// 单元格是否可以编辑, 单元格如果想添加可编辑功能，必须要有key
const canEdit = (key:string, row:any, column: any) => {
    return column.editable && canEditCellList.findIndex((x: { key: any, label: any }) => x.key === row[key] && x.label === column.label) !== -1;
};
//#endregion


export {
    handleTableActionButton,
    getData,
    getTableData,
    tableRowClick,
    tableRowDBClick,
    tableCellDblClick,
    canEditCellList,
    canEdit,
    displayActionButton,
};