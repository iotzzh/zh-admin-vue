<!-- 客户管理管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request">
    </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { reactive, ref } from 'vue';
import api from '@/api/clientManagement';

const refZHTable = ref();

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasExportButton: true,
    hasResetButton: true,
    formLabelWidth: '100px',
    fields: [
        { label: '客户编码', type: 'input', prop: 'name', width: '200px', },
        { label: '客户名称', type: 'input', prop: 'name', width: '200px', },
        { label: '客户类别', type: 'input', prop: 'name', width: '200px', },
        { label: '客户连锁名称', type: 'input', prop: 'name', width: '200px', },
        {
            label: '创建时间', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTest', options: [], width: '200px',
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD' }],
        },
        {
            label: '合同到期时间', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTest111', options: [], width: '200px',
            convertDateTime: [{ field: 'startCreateTime11', format: 'YYYY-MM-DD' }, { field: 'endCreateTime11', format: 'YYYY-MM-DD' }],
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
        { label: '客户编码', prop: 'test1' },
        {
            label: '客户名称', prop: 'name0',
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
            label: '客户连锁名称', prop: 'sex', width: '120px',
            addEditInfo: {
                type: 'input',
                addSort: 2,
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
            label: '客户地址', prop: 'name1', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 3,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '', prop: 'name2', notDisplay: true,
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
            label: '联系人', prop: 'role',
            addEditInfo: {
                addSort: 5,
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
            label: '联系电话', prop: 'phone', width: '150px',
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
            label: '关联连锁名称', prop: 'name1001', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 7,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '', prop: 'name2001', notDisplay: true,
            addEditInfo: {
                type: 'input',
                placeholder: '连锁代码',
                labelWidth: '0px',
                addSort: 8,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                disabled: true,
                required: true,
            }
        },
        {
            label: '客户类别', prop: 'name0001', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 9,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '关联主合作商', prop: 'name0002', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 10,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '结算类型', prop: 'name0003', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 11,
                xs: 24,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                required: true,
            }
        },
        {
            label: '合同折扣', prop: 'name0004', notDisplay: true,
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
            label: '合同签订日期', prop: 'name0006', notDisplay: true,
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
            label: '合同开始日期', prop: 'name0007', notDisplay: true,
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
            label: '合同结束日期', prop: 'name0008', notDisplay: true,
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
            label: '合同重点条款', prop: 'name0009', notDisplay: true,
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
            label: '收款主体名称', prop: 'name00010', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 17,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '销售员', prop: 'name00011', notDisplay: true,
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
            label: '开票抬头', prop: 'name00012', notDisplay: true,
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
            label: '税号', prop: 'name00013', notDisplay: true,
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
            label: '发票银行账号', prop: 'name00014', notDisplay: true,
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
            label: '发票银行名称', prop: 'name00015', notDisplay: true,
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
            label: '开票地址', prop: 'name00016', notDisplay: true,
            addEditInfo: {
                type: 'select',
                addSort: 23,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
            }
        },
        {
            label: '开票电话', prop: 'name00017', notDisplay: true,
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
            label: '合同开始时间', prop: 'status', width: '120px'
        },
        {
            label: '合结束始时间', prop: 'status1', width: '120px'
        },
        {
            label: '创建人', prop: 'status',
        },
        {
            label: '创建时间', prop: 'status',
        },
    ],
    actionColumn: {
        label: '操作',
        width: '280px',
        hasRowDeleteAction: false,
        hasRowEditAction: true,
        fixed: 'right',
        buttons: [
            { label: '启用', displayMethod: (row: any) => row.sex, type: 'primary', icon: 'Unlock', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            { label: '禁用', displayMethod: (row: any) => !row.sex, type: 'primary', icon: 'Lock', style: 'color: #E42222;', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            { label: '重置密码', hide: false, type: 'success', icon: 'RefreshLeft', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
        ],
    },
} as TZHTableSetting);

const request = ref({
    list: { url: api.getClientList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addClient, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateClient, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteClient, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteClient, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);


</script>

<script lang="ts">
export default { name: 'clientManagement' };
</script>

<style lang="scss" scoped>

</style>