<!-- 角色管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="false" :request="request" @opened="opened">
    </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, ref } from 'vue';
import api from '@/api/authorityManagement';
import dataListHelper from '@/utils/dataListHelper';
import storage from '@/utils/storage';

const refZHTable = ref();

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasExportButton: false,
    hasResetButton: false,
    formLabelWidth: '100px',
    customModel: {
        isAppoint: true,
        userId: storage.getUserId(),
    },
    fields: [
        { label: '角色', type: 'input', prop: 'roleName', width: '200px', },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    hasIndex: true,
    hasSelection: false,
    modal: {
        width: '500px',
        footer: {},
        formSettings: {
            formLabelWidth: '120px',
            customModel: { userId: storage.getUserId() }
        },
    },
    columns: [
        {
            label: '角色名称', prop: 'roleName', addEditInfo: {
                type: 'input',
                addSort: 1,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: true,
            }
        },
        {
            label: '是否启用', prop: 'isEbl',
            addEditInfo: {
                type: 'switch',
                addSort: 5,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: true,
                options: [
                    { label: '启用', value: 1 },
                    { label: '不启用', value: 0 },
                ],
                defaultValue: 1,
                activeValue: 1,
                inactiveValue: 0,
            }
        },
        {
            label: '角色描述', prop: 'description',
            addEditInfo: {
                type: 'input',
                addSort: 4,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
            }
        },
        {
            label: '所属机构', prop: 'test',
            addEditInfo: {
                addSort: 2,
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                type: 'select',
                multiple: true,
                placeholder: '请输入',
                disabled: true,
            }
        },
        {
            label: '所属部门', prop: 'test1',
            addEditInfo: {
                type: 'input',
                addSort: 3,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                disabled: true,
            }
        },
    ],
    actionColumn: {
        label: '操作',
        width: '280px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        fixed: 'right',
        buttons: [
            // { label: '新增', type: 'success', icon: 'Plus', onClick: (row: any, index: any) => { refZHTable.value && refZHTable.value.openAddModal(row); } },
        ],
    },
} as TZHTableSetting);

const request = ref({
    list: { url: api.getRoleList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addRole, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateRole, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteRole, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteRole, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

onMounted(async () => {
    // 获取医院
    // const item = tableSettings.columns?.find((x: any) => x.label === '所属机构');
    // const result: any = await dataListHelper.getClientList();
    // item!.addEditInfo!.options = result;
});

const opened = (params: any) => {
    // if (params.modal.type === 'add') {
    //     if (params.openAddModalData) { // 当点击行内的新增时
    //         refZHTable.value.setModalFormModel({ calcHierarchy: params.openAddModalData.calcHierarchy, calcCode: params.openAddModalData.calcCode, }); // 当点击头部的新增时
    //     } else {
    //         refZHTable.value.setModalFormModel({ calcHierarchy: '0' }); // 当点击头部的新增时
    //     }
    // }
};
</script>

<script lang="ts">
export default { name: 'roleManagement' };
</script>

<style lang="scss" scoped>

</style>