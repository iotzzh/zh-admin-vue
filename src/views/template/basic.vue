<template>
    <Suspense>
        <BasicTemplate v-if="pageSetting" :setting="pageSetting"></BasicTemplate>
        <div v-else>loading...</div>
    </Suspense>
</template>

<script lang="ts" setup>
import BasicTemplate from '@/templates/Basic.vue';
import { ref } from 'vue';
import isHelper from '@/utils/isHelper';
import api from '@/api/index';

const isMobile = isHelper.isMobile();
const pageSetting: any = ref({});
new Promise((resolve, reject) => {
    const setting = {
        usePage: true,
        formSettings: {
            hasAddButton: true,
            hasSearchButton: true,
            hasDeleteButton: true,
            hasUploadButton: false,
            hasExportButton: false,
            hasResetButton: true,
            hideUnimportantFields: isMobile,
            customModel: {},
            formLabelWidth: '70px',
            fields: [
                {
                    label: '手机号', type: 'input', prop: 'phone',
                    xs: 24,
                    sm: 12,
                    md: 8,
                    lg: 8,
                    xl: 6,
                },
                {
                    label: '姓名', type: 'input', prop: 'name', xs: 24,
                    sm: 12,
                    md: 8,
                    lg: 8,
                    xl: 6,
                },
                {
                    label: '员工编号', type: 'input', prop: 'employeeNum', xs: 24,
                    sm: 12,
                    md: 8,
                    lg: 8,
                    xl: 6, unimportant: isMobile,
                },
                {
                    label: '状态', type: 'select', prop: 'status', xs: 24,
                    sm: 12,
                    md: 8,
                    lg: 8,
                    xl: 6, defaultValue: 1, unimportant: isMobile,
                    options: [{ label: '在职', value: 1 }, { label: '离职', value: 0 },],
                },
            ],

        },
        tableSettings: {
            hasIndex: true,
            hasSelection: true,
            rowKey: 'id',
            modal: {
                title: '',
                footer: {},
                formSettings: {
                    formLabelWidth: '90px',
                    // customValidate: (modelValue: any) => {
                    //     const isPhoneNum = isHelper.isPhoneNum(modelValue.phone);
                    //     if (!isPhoneNum) {
                    //         popErrorMessage('请输入正确的手机号');
                    //         return false;
                    //     }
                    //     return true;
                    // },
                },
                // onBeforeSubmit: async (params: any) => {
                //     console.log('onBeforeSubmit');
                // },
                // onAfterSubmit: async (params: any) => {
                //     console.log('onAfterSubmit');
                // },
            },
            columns: [
                {
                    label: '姓名',
                    prop: 'name',
                    allowCellEdit: false,
                    minWidth: '100px',
                    addEditInfo: {
                        type: 'input',
                        addSort: 1,
                        defaultValue: '',
                        placeholder: '请输入',
                        xs: 24,
                        sm: 12,
                        md: 8,
                        lg: 8,
                        xl: 8,
                        required: true,
                    }
                },
                {
                    // label: '性别', prop: 'sex', convert: (row: any) => row.sex === 0 ? '女' : row.sex === 1 ? '男' : '未知',
                    label: '性别', prop: 'sex', convert: 'return row?.sex === 0 ? \'男\' : \'女\'',
                    minWidth: '80px',
                    addEditInfo: {
                        type: 'select', defaultValue: null, addSort: 2, placeholder: '请选择',
                        span: 12,
                        xs: 24,
                        sm: 12,
                        md: 8,
                        lg: 8,
                        xl: 8,
                        options: [{ label: '男', value: 1 }, { label: '女', value: 2 }], required: false,
                    }
                },
                {
                    label: '账号', prop: 'phone', minWidth: '150px', addEditInfo: {
                        addSort: 2.5,
                        label: '手机号', prop: 'phone',
                        type: 'input', defaultValue: null, placeholder: '请输入', span: 8, xs: 24,
                        sm: 12,
                        md: 8,
                        lg: 8,
                        xl: 8, required: true,
                    }
                },
                {
                    label: '角色', prop: 'role', notDisplay: true, addEditInfo: {
                        addSort: 3,
                        type: 'select2',
                        api: api.getRoleList,
                        valueKey: 'id',
                        labelField: 'roleName',
                        valueField: 'id',
                        span: 12,
                        xs: 24,
                        sm: 12,
                        md: 8,
                        lg: 8,
                        xl: 8,
                        required: true,
                        convert: 'return fieldValue && fieldValue.id',
                        // convert: (model: any, convertModel: any, fields: any) => {
                        //     return model && model.map((x: any) => x.id);
                        // },
                    }
                },
            ],
            actionColumn: {
                label: '操作',
                width: '215px',
                hasRowDeleteAction: true,
                hasRowEditAction: true,
                buttons: [
                    // { label: '激活', hide: true, type: 'primary', icon: 'Refresh', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
                    { label: '激活', hide: false, type: 'primary', icon: 'Refresh', onClick: 'console.log(\'row.phone: \' + row.phone, \'/n index: \' + index)' },
                ],
            },
        },
        request: {
            list: { url: api.getUserList, successMessage: '查询成功', errorMessage: '查询失败' },
            add: { url: api.addUser, successMessage: '新增成功', errorMessage: '新增失败' },
            update: { url: api.updateUser, successMessage: '更新成功', errorMessage: '更新失败' },
            delete: { url: api.deleteUser, successMessage: '删除成功', errorMessage: '删除失败' },
            batchDelete: { url: api.batchDeleteUser, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
        },
    };
    pageSetting.value = setting;
});
</script>

