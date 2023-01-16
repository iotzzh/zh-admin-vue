<!-- 客户管理管理 -->
<template>
    <div class="box">
        <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
            :usePage="true" :request="request" @opened="opened">
        </Table>
    </div>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { reactive, ref, onMounted, Ref } from 'vue';
import api from '@/api/clientManagement';
import dataListHelper from '@/utils/dataListHelper';
import arrayToTree from 'array-to-tree';
import { TZHModal } from '@/components/zh-modal/type';
import { TZHFormSettings } from '@/components/zh-form/type';

const refZHTable = ref();

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasExportButton: true,
    hasResetButton: true,
    formLabelWidth: '100px',
    fields: [
        { label: '客户编码', type: 'input', prop: 'calCode', width: '200px', },
        { label: '客户名称', type: 'input', prop: 'calName', width: '200px', },
        { label: '客户类别', type: 'input', prop: 'calClassification', width: '200px', },
        { label: '客户连锁名称', type: 'input', prop: 'chainName', width: '200px', },
        {
            label: '创建时间', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTemp', options: [], width: '200px',
            convertDateTime: [{ field: 'startTime', format: 'YYYY-MM-DD 00:00:00' }, { field: 'endTime', format: 'YYYY-MM-DD 23:59:59' }],
        },
        {
            label: '合同到期时间', type: 'date-picker', timeType: 'daterange', prop: 'contractTimeTemp', options: [], width: '200px',
            convertDateTime: [{ field: 'startCreationtime', format: 'YYYY-MM-DD 00:00:00' }, { field: 'endCreationtime', format: 'YYYY-MM-DD 23:59:59' }],
        },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    hasIndex: true,
    hasSelection: true,
    modal: {
        title: '新增客户',
        width: '70%',
        footer: {},
        formSettings: {
            formLabelWidth: '120px',
        },
    },
    columns: [
        { label: '客户编码', prop: 'calCode' },
        {
            label: '客户名称', prop: 'calName',
            addEditInfo: {
                type: 'input',
                addSort: 1,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '联系人', prop: 'calContacts',
            addEditInfo: {
                addSort: 2,
                type: 'input',
                placeholder: '请输入',
                width: '',
                span: 12,
                xs: 24,
                sm: 24,
                md: 12,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '客户地址', prop: 'calZoningCode', notDisplay: true,
            addEditInfo: {
                type: 'cascader',
                addSort: 3,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
                refName: 'refCascaderClientAddress',
                convertCascader: (fieldValue: any, modelValue: any, field: any) => {
                    if (!fieldValue || !field.checkedNodes || !field.checkedNodes[0]) return;
                    return [
                        { property: 'calProvince', value: field.checkedNodes[0].pathLabels[0] },
                        { property: 'calCity', value: field.checkedNodes[0].pathLabels[1] },
                        { property: 'calDistrictAndCounty', value: field.checkedNodes[0].pathLabels[2] },
                        { property: 'calZoningCode', value: field.checkedNodes[0].data.rdCode },
                    ];
                },
                props: {
                    label: 'rdName',
                    value: 'rdCode',
                },
            }
        },
        {
            label: '', prop: 'calOfficeAddress', notDisplay: true,
            addEditInfo: {
                type: 'input',
                placeholder: '请输入详细地址',
                labelWidth: '0px',
                addSort: 4,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '联系电话', prop: 'calTelephone', width: '150px',
            addEditInfo: {
                type: 'input',
                addSort: 6,
                placeholder: '请输入',
                width: '',
                span: 12,
                xs: 24,
                sm: 24,
                md: 12,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '客户类别', prop: 'calClassificationCode', notDisplay: true,
            addEditInfo: {
                type: 'cascader',
                addSort: 7,
                xs: 24,
                sm: 24,
                md: 12,
                lg: 6,
                xl: 6,
                required: true,
                refName: 'refCascaderClientClass',
                convertCascader: (fieldValue: any, modelValue: any, field: any) => {
                    if (!fieldValue || !field || !field.checkedNodes || !field.checkedNodes[0]) return;
                    return [
                        { property: 'calClassification', value: field.checkedNodes[0].pathNodes[field.checkedNodes[0].pathNodes.length - 1].label },
                        { property: 'calClassificationCode', value: field.checkedNodes[0].pathNodes[field.checkedNodes[0].pathNodes.length - 1].value },
                    ];
                },
                props: {
                    label: 'calcName',
                    value: 'calcCode',
                },
            }
        },
        {
            label: '关联连锁名称', prop: 'test', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 8,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: false,
                disabled: true,
            }
        },
        {
            label: '', prop: 'test', notDisplay: true,
            addEditInfo: {
                type: 'input',
                placeholder: '连锁代码',
                labelWidth: '0px',
                addSort: 9,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                disabled: true,
                required: false,
            }
        },
        {
            label: '结算类型', prop: 'calSettlementType', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 11,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
                options: [
                    { label: '次结', value: '次结' },
                    { label: '月结', value: '月结' },
                ],
            }
        },
        {
            label: '合同折扣', prop: 'calContractDiscount', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 12,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '关联主合作商', prop: 'palName', notDisplay: true,
            addEditInfo: {
                prop: 'pal',
                type: 'select',
                addSort: 12.5,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
                valueKey: 'palCode',
                extendedFieldMethod: (model: any, convertModel: any, fields: any) => {
                    return [
                        { property: 'palCode', value: model && model.palCode },
                        { property: 'palName', value: model && model.palName },
                    ];
                },
                required: true,
            }
        },
        {
            label: '合同签订日期', prop: 'calSigningDate', notDisplay: true,
            addEditInfo: {
                type: 'date-picker',
                addSort: 13,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '合同开始日期', prop: 'palContractStartDate', notDisplay: true,
            addEditInfo: {
                type: 'date-picker',
                addSort: 14,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '合同结束日期', prop: 'calContractEndDate', notDisplay: true,
            addEditInfo: {
                type: 'date-picker',
                addSort: 15,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
            }
        },

        {
            label: '合同重点条款', prop: 'contracClause', notDisplay: true,
            addEditInfo: {
                type: 'input',
                inputType: 'textarea',
                addSort: 16,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '收款主体名称', prop: 'coslName', notDisplay: true,
            addEditInfo: {
                prop: 'cosl',
                type: 'select',
                addSort: 17,
                valueKey: 'coslCode',
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
                extendedFieldMethod: (model: any, convertModel: any, fields: any) => {
                    console.log('model', model);
                    if (!model) return;
                    return [
                        { property: 'coslName', value: model.coslName },
                        { property: 'coslCode', value: model.coslCode },
                    ];
                },
            }
        },
        {
            label: '销售员', prop: 'calNameOfSalesManager', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 18,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
            }
        },

        {
            label: '开票抬头', prop: 'invoiceTitle', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 19,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '税号', prop: 'taxNumber', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 20,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '发票银行账号', prop: 'calInvoiceBankAccountNumber', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 21,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },

        {
            label: '发票银行名称', prop: 'calNameOfInvoiceBank', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 22,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '开票地址', prop: 'calInvoiceCompanyAddress', notDisplay: true,
            addEditInfo: {
                type: 'input',
                valueKey: 'id',
                addSort: 23,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '开票电话', prop: 'invoceNumber', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 24,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '合同开始时间', prop: 'palContractStartDate', width: '120px'
        },
        {
            label: '合结束始时间', prop: 'palContractStartDate', width: '120px'
        },
        {
            label: '创建人', prop: 'createName',
        },
        {
            label: '创建时间', prop: 'createTime',
        },
    ],
    actionColumn: {
        label: '操作',
        width: '280px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        fixed: 'right',
        // buttons: [
        //     { label: '启用', displayMethod: (row: any) => row.sex, type: 'primary', icon: 'Unlock', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
        //     { label: '禁用', type: 'primary', icon: 'Lock', style: 'color: #E42222;', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
        //     { label: '重置密码', hide: false, type: 'success', icon: 'RefreshLeft', onClick: (row: any, index: any) => { clickResetPwd(row); } },
        // ],
    },
} as TZHTableSetting);

const request = ref({
    list: { url: api.getClientList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addClient, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateClient, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteClient, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteClient, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

const opened = (params: any) => {
    if (params.modal.type === 'edit') {
        const itemPartner = tableSettings.columns?.find((x: any) => x.label === '关联主合作商');
        const palValue = itemPartner?.addEditInfo?.options?.find((x: any) => x.palCode === params.openEditModalData.palCode);

        const item = tableSettings.columns?.find((x: any) => x.label === '收款主体名称');
        const coslValue = item?.addEditInfo?.options?.find((x: any) => x.coslCode === params.openEditModalData.coslCode);

        refZHTable.value.setModalFormModel({ pal: palValue, cosl: coslValue });
    }
};

onMounted(async () => {
    // 获取收款主体列表
    const item = tableSettings.columns?.find((x: any) => x.label === '收款主体名称');
    const result: any = await dataListHelper.getCollectionSubjectLibraryList();
    item!.addEditInfo!.options = result;

    // 获取省市区列表
    const itemRegion = tableSettings.columns?.find((x: any) => x.label === '客户地址');
    const resultRegion = await dataListHelper.getAllRegionList();
    itemRegion!.addEditInfo!.options = arrayToTree(resultRegion, { parentProperty: 'rdSuperior', customID: 'rdCode' });

    // 获取客户类别
    const itemClientClass = tableSettings.columns?.find((x: any) => x.label === '客户类别');
    const resultClientClass = await dataListHelper.getClientClassList();
    // itemClientClass!.addEditInfo!.options = arrayToTree(resultClientClass, { parentProperty: 'calcSuperior', customID: 'calcCode' });
    itemClientClass!.addEditInfo!.options = resultClientClass;

    // 获取合作商列表
    const itemPartner = tableSettings.columns?.find((x: any) => x.label === '关联主合作商');
    const resultPartner = await dataListHelper.getPartnerList();
    itemPartner!.addEditInfo!.options = resultPartner;
});
</script>

<script lang="ts">
export default { name: 'clientManagement' };
</script>

<style lang="scss" scoped>
.box {
    height: 100%;
    width: 100%;
}
</style>