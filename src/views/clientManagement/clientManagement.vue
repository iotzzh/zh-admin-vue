<!-- 用户管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request" @changeModel="changeModel">
        <template v-slot:zh-table-status="scope">
            <div v-if="scope.row.status">在职</div>
            <div v-else>不在职</div>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, ref } from 'vue';
import api from '@/api/authorityManagement';

const refZHTable = ref();

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: false,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: false,
    hideUnimportantFields: false,
    customModel: {},
    convertParams: (params: { [x: string]: any }) => {
        return {
            ...params,
            convertParams: true,
        };
    },
    buttons: [
        // { label: '自定义按钮1', icon: 'Filter', method: () => { console.log('hello world'); }, style: 'color: pink; background-color: blue;' }
    ],
    formLabelWidth: '100px',
    fields: [
        { label: '客户编码', type: 'input', prop: 'name', width: '200px', },
        { label: '客户名称', type: 'input', prop: 'name', width: '200px', },
        { label: '客户类别', type: 'input', prop: 'name', width: '200px', },
        { label: '客户连锁名称', type: 'input', prop: 'name', width: '200px', },
        {
            label: '创建时间', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTest', options: [],
            width: '200px',
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD' }],
        },
        {
            label: '合同到期时间', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTest111', options: [],
            width: '200px',
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD' }],
        },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    hasIndex: true,
    hasSelection: true,
    rowKey: 'id',
    modal: {
        title: '',
        footer: {},
        formSettings: {
            formLabelWidth: '90px',
        },
    },
    columns: [
        {
            label: '默认不显示列',
            prop: 'id0',
            notDisplay: true,
        },
        {
            label: '登录账号', prop: 'test', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 1,
                defaultValue: '',
                placeholder: '请输入',
                span: 12,
                required: true,
            }
        },
        { label: 'ID', prop: 'id', },
        {
            label: '姓名',
            prop: 'name',
            allowCellEdit: false,
            addEditInfo: {
                type: 'input',
                addSort: 2,
                defaultValue: '',
                placeholder: '请输入',
                span: 12,
                required: true,
            }
        },
        {
            label: '性别', prop: 'sex', convert: (row: any) => row.sex === 0 ? '男' : '女', allowCellEdit: true,
            addEditInfo: {
                type: 'select', defaultValue: 0, addSort: 3, placeholder: '请选择', span: 12, 
                options: [{ label: '男', value: 0 }, { label: '女', value: 1 }], required: true,
            }
        },
        {
            label: '部门名称', prop: 'test', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 4,
                defaultValue: '',
                placeholder: '请输入',
                span: 12,
                required: true,
            }
        },
        // {
        //     label: '生日', prop: 'test', notDisplay: true,
        //     addEditInfo: {
        //         type: 'input',
        //         addSort: 5,
        //         defaultValue: '',
        //         placeholder: '请输入',
        //         span: 8,
        //         required: true,
        //     }
        // },
        {
            label: '手机号', prop: 'phone', addEditInfo: {
                addSort: 6,
                type: 'input', defaultValue: null, placeholder: '请输入', span: 12, required: true,
            }
        },
        // {
        //     label: '工号', prop: 'employeeNum', addEditInfo: {
        //         addSort: 5,
        //         type: 'input', defaultValue: null, placeholder: '请输入', span: 8, required: true,
        //     }
        // },
        {
            label: '角色', prop: 'role', addEditInfo: {
                type: 'input', defaultValue: null, addSort: 7, placeholder: '请输入', span: 12,
            }
        },

        {
            label: '状态', prop: 'status', useSlot: true,
        },
    ],
    actionColumn: {
        label: '操作',
        width: '215px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        buttons: [
            { label: '重置密码', hide: false, type: 'primary', icon: 'Refresh', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            { label: '激活', hide: true, type: 'primary', icon: 'Refresh', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
        ],
    },
} as TZHTableSetting);

onMounted(() => {
    // 控制列是否显示
    const idColumn: any = tableSettings.columns?.find((x: any) => x.prop === 'id');
    idColumn.notDisplay = true;
    // idColumn.notDisplay = false;
});

const request = ref({
    list: { url: api.getUserList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addUser, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateUser, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteUser, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteUser, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);


const changeModel = (model: any) => {
    const actionColumn = tableSettings?.actionColumn;
    const button0 = tableSettings?.actionColumn?.buttons && tableSettings?.actionColumn?.buttons[0];
    const button1 = tableSettings?.actionColumn?.buttons && tableSettings?.actionColumn?.buttons[1];
    if (model.name11111) {
        button0!.hide = true;
        button1!.hide = false;
        actionColumn!.hasRowDeleteAction = false;
        actionColumn!.hasRowEditAction = false;
        formSettings.value.hasAddButton = false;
        formSettings.value.hasDeleteButton = false;
    } else {
        button0!.hide = false;
        button1!.hide = true;
        actionColumn!.hasRowDeleteAction = true;
        actionColumn!.hasRowEditAction = true;

        formSettings.value.hasAddButton = true;
        formSettings.value.hasDeleteButton = true;
    }
};

</script>

<script lang="ts">
export default { name: 'userManagement' };
</script>

<style lang="scss" scoped>

</style>