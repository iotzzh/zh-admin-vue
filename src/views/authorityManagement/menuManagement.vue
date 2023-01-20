<!-- 权限管理 - 菜单管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request" @opened="opened">
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
import { TZHRequestParams } from '@/components/zh-request/type';
import ZHRequest from '@/components/zh-request';

const refZHTable = ref();
const rootPermision = ref({} as any);

const getSearchFormModel = () => {
    const model = refZHTable.value.getSearchFormModel();
    console.log(model);
};

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
            // convertParams: true,
        };
    },
    buttons: [
        // { label: '自定义按钮1', icon: 'Filter', method: () => { console.log('hello world'); }, style: 'color: pink; background-color: blue;' }
    ],
    formLabelWidth: '70px',
    fields: [
        { label: '菜单名称', type: 'input', prop: 'permsionName', width: '200px', },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    hasIndex: false,
    hasSelection: false,
    rowKey: 'id',
    lazy: true,
    treeProps: { children: 'children', hasChildren: 'id' },
    modal: {
        customModel: {},
        footer: {
            hasCancelButton: true,
            hasSubmitButton: true,
        },
        formLabelWidth: '90px',
    },
    load: async (
        row: any,
        treeNode: unknown,
        resolve: (data: any[]) => void
    ) => {
        resolve([{id: '123', parentId: '83065105051861056'}]);
        // const apiParams: TZHRequestParams = {
        //     url: api.getPermisMenuList,
        //     conditions: {
        //         parentId: row.id
        //     },
        //     errorMessage: '获取子节点数据失败',
        // };
        // const result = await ZHRequest.post(apiParams);
        // if (result.success) resolve(result.data.records);
    },
    columns: [
        { label: 'ID', prop: 'id', },
        {
            label: '菜单名称',
            prop: 'permsionName',
            allowCellEdit: false,
            align: 'left',
            addEditInfo: {
                type: 'input',
                addSort: 1,
                defaultValue: '',
                placeholder: '请输入',
                span: 8,
                required: true,
            }
        },
        {
            label: '权限编码',
            prop: 'permsionCode',
            allowCellEdit: false,
            align: 'left',
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
            label: 'URL', prop: 'url',
            addEditInfo: {
                type: 'input',
                defaultValue: null,
                addSort: 3,
                span: 8,
                required: true,
            }
        },
        {
            label: '文件路径', prop: 'filePath', notDisplay: false,
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
            label: '类型', prop: 'menuType', notDisplay: false,
            addEditInfo: {
                type: 'select',
                addSort: 5,
                defaultValue: '',
                placeholder: '请输入',
                span: 8,
                required: true,
                options: [
                    { label: '系统', value: 0 },
                    { label: '目录', value: 1 },
                    { label: '菜单', value: 2 },
                    { label: '按钮', value: 3 },
                ],
            }
        },
        {
            label: 'ICON', prop: 'icon', notDisplay: false,
            addEditInfo: {
                type: 'input',
                addSort: 4,
                defaultValue: '',
                placeholder: '请输入',
                span: 8,
                required: true,
            }
        },
    ],
    actionColumn: {
        label: '操作',
        width: '215px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        buttons: [
            { label: '新建子级菜单', type: 'success', icon: 'Plus', onClick: (row: any, index: any) => { refZHTable.value && refZHTable.value.openAddModal(row); } }
        ],
    },
} as TZHTableSetting);

onMounted(() => {
    getCalRootPermissionId();
});

const request = ref({
    list: { url: api.getPermisMenuList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addMenu, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateMenu, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteMenu, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteMenu, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);


const getCalRootPermissionId = async () => {
    const apiParams: TZHRequestParams = {
        url: api.getCalRootPermissionId,
        conditions: {},
        errorMessage: '获取根目录数据失败',
    };
    const result = await ZHRequest.post(apiParams);
    if (result.success) rootPermision.value = result.data;
};

const opened = async (params: any) => {
    if (params.modal.type === 'add' && !params.openAddModalData) {
        refZHTable.value.setModalFormModel({ parentId: rootPermision.value.id });
    }
};

</script>

<style lang="scss" scoped>

</style>