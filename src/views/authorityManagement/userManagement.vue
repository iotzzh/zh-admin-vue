<!-- 用户管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request" @opened="opened">
    </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, ref } from 'vue';
import api from '@/api/authorityManagement';
import dataListHelper from '@/utils/dataListHelper';
import storage from '@/utils/storage';
import ZHRequest from '@/components/zh-request';
import { TZHRequestParams } from '@/components/zh-request/type';

const refZHTable = ref();

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: true,
    hideUnimportantFields: false,
    customModel: {},
    formLabelWidth: '70px',
    fields: [
        { label: '手机号', type: 'input', prop: 'account', width: '200px', },
        { label: '姓名', type: 'input', prop: 'realName', width: '200px', },
        // { label: '登录账号', type: 'input', prop: 'name111', width: '200px', },
        { label: '员工编号', type: 'input', prop: 'employeeNumber', width: '200px', },
        {
            label: '状态', type: 'select', prop: 'isEbl', width: '200px', defaultValue: 1,
            options: [
                { label: '在职', value: 1 },
                { label: '离职', value: 0 },
            ],
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
        onBeforeSubmit: async (params: any) => {
            updateUserRole(params);
            updateUserCal(params);
        },
    },
    columns: [
        {
            label: '姓名',
            prop: 'realName',
            allowCellEdit: false,
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
            label: '性别', prop: 'sex', convert: (row: any) => row.sex === 0 ? '未知' : row.sex === 1 ? '男' : '女',
            addEditInfo: {
                type: 'select', defaultValue: null, addSort: 2, placeholder: '请选择', span: 12, xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                options: [{ label: '男', value: 1 }, { label: '女', value: 2 }], required: false,
            }
        },
        {
            label: '账号', prop: 'account', addEditInfo: {
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
            label: '角色', prop: 'roleIds', notDisplay: true, addEditInfo: {
                addSort: 3,
                type: 'select',
                valueKey: 'id',
                span: 12,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
                multiple: true,
                convert: (model: any, convertModel: any, fields: any) => {
                    return model && model.map((x: any) => x.id);
                },
            }
        },
        {
            label: '所属机构', prop: 'calLibraryList', notDisplay: true,
            addEditInfo: {
                addSort: 4,
                type: 'select',
                valueKey: 'id',
                span: 12,
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8,
                required: true,
                multiple: true,
            }
        },
        {
            label: '员工编号', prop: 'employeeNumber', addEditInfo: {
                addSort: 5,
                type: 'input', defaultValue: null, placeholder: '请输入', span: 8, xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
                xl: 8, required: false,
            }
        },

    ],
    actionColumn: {
        label: '操作',
        width: '215px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        buttons: [
            // { label: '重置密码', hide: false, type: 'primary', icon: 'Refresh', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            { label: '激活', hide: true, type: 'primary', icon: 'Refresh', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
        ],
    },
} as TZHTableSetting);

onMounted(async () => {
    // 获取角色列表
    const itemRole = tableSettings.columns?.find((x: any) => x.label === '角色');
    const resultRole = await dataListHelper.getRoleList();
    itemRole!.addEditInfo!.options = resultRole;

    // 获取所属机构列表
    const itemClien = tableSettings.columns?.find((x: any) => x.label === '所属机构');
    const resultClient = await dataListHelper.getUserClientList();
    itemClien!.addEditInfo!.options = resultClient;
});

const request = ref({
    list: { url: api.getUserList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addUser, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateUser, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteUser, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteUser, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

const opened = async (params: any) => {
    if (params.modal.type === 'edit') {
        const resultClient = await dataListHelper.getUserClientList(false, params.openEditModalData.id);
        const roleIds = await dataListHelper.getUserRoleList(params.openEditModalData.id);
        refZHTable.value.setModalFormModel({ calLibraryList: resultClient, roleIds });
    }
};

const updateUserRole = async (params: any) => {
    const apiParams: TZHRequestParams = {
        url: api.updateUserRole,
        conditions: {
            id: params.conditions.id,
            roleIds: params.conditions.roleIds,
        },
    };
    const result = await ZHRequest.post(apiParams);
};

const updateUserCal = async (params: any) => {
    const apiParams: TZHRequestParams = {
        url: api.updateUserCal,
        conditions: {
            id: params.conditions.id,
            calLibraryList: params.conditions.calLibraryList,
        },
    };
    const result = await ZHRequest.post(apiParams);
};

</script>

<script lang="ts">
export default { name: 'userManagement' };
</script>

<style lang="scss" scoped>

</style>