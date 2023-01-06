<!-- 用户管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request">
        <template v-slot:zh-table-form-test>
            <el-input placeholder="请输入自定义搜索" v-model="formSettings.customModel!.test"></el-input>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { TZHFromField } from '@/components/zh-form/type';
import Table from '@/components/zh-table/index.vue';
import { TObject, TZHTableRequest, TZHTableFormSettings, TZHTableSetting, TZHTableColumn } from '@/components/zh-table/type';
import { onMounted, reactive, ref } from 'vue';
import api from '@/api/authorityManagement';
import { popErrorMessage } from '@/components/zh-message';

const refZHTable = ref();

const getSearchFormModel = () => {
    const model = refZHTable.value.getSearchFormModel();
    console.log(model);
};

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: true,
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
    formLabelWidth: '70px',
    fields: [
        { label: '手机号', type: 'input', prop: 'name', width: '200px', },
        { label: '姓名', type: 'input', prop: 'name111', width: '200px', },
        { label: '登录账号', type: 'input', prop: 'name111', width: '200px', },
        { label: '员工编号', type: 'input', prop: 'name111', width: '200px', }
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
                span: 8,
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
                span: 8,
                required: true,
            }
        },
        {
            label: '性别', prop: 'sex', convert: (row: any) => row.sex === 0 ? '男' : '女', allowCellEdit: true,
            addEditInfo: {
                type: 'select', defaultValue: 0, addSort: 3, placeholder: '请选择', span: 8, options: [{ label: '男', value: 0 }, { label: '女', value: 1 }], required: true,
            }
        },
        {
            label: '部门名称', prop: 'test', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 4,
                defaultValue: '',
                placeholder: '请输入',
                span: 8,
                required: true,
            }
        },
        {
            label: '生日', prop: 'test', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 5,
                defaultValue: '',
                placeholder: '请输入',
                span: 8,
                required: true,
            }
        },
        {
            label: '手机号', prop: 'phone', addEditInfo: {
                addSort: 6,
                type: 'input', defaultValue: null, placeholder: '请输入', span: 8, required: true,
            }
        },
        {
            label: '工号', prop: 'employeeNum', addEditInfo: {
                addSort: 5,
                type: 'input', defaultValue: null, placeholder: '请输入', span: 8, required: true,
            }
        },
        {
            label: '角色', prop: 'role', addEditInfo: {
                type: 'input', defaultValue: null, addSort: 7,  placeholder: '请输入', span: 8,
            }
        },
    ],
    actionColumn: {
        label: '操作',
        width: '215px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        buttons: [
            { label: '重置密码', type: 'primary', icon: 'Refresh', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } }
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

</script>

<style lang="scss" scoped>

</style>