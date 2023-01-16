<!-- 客户类别管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="false" :request="request" @opened="opened">
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
    hasExportButton: false,
    hasResetButton: false,
    formLabelWidth: '100px',
    fields: [
        { label: '分类名称', type: 'input', prop: 'calcName', width: '200px', },
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
        },
    },
    columns: [
        { label: '分类编码', prop: 'calcCode' },
        {
            label: '分类名称', prop: 'calcName',
            addEditInfo: {
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
            label: '层级', prop: 'calcHierarchy',
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
        {
            label: '上级编码', prop: 'calcSuperior',
            addEditInfo: {
                type: 'input',
                addSort: 2,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                disabled: true,
            }
        },
        { label: '创建时间', prop: 'creationtime' },
    ],
    actionColumn: {
        label: '操作',
        width: '280px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        fixed: 'right',
        buttons: [
            { label: '新增', type: 'success', icon: 'Plus', onClick: (row: any, index: any) => { refZHTable.value && refZHTable.value.openAddModal(row); } },
        ],
    },
} as TZHTableSetting);

const request = ref({
    list: { url: api.getClientClassList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addClientClass, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateClientClass, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteClientClass, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteClientClass, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

const opened = (params:any) => {
    if (params.modal.type === 'add') {
        if (params.openAddModalData) { // 当点击行内的新增时
            refZHTable.value.setModalFormModel({ calcHierarchy: params.openAddModalData.calcHierarchy, calcCode: params.openAddModalData.calcCode, }); // 当点击头部的新增时
        } else {
            refZHTable.value.setModalFormModel({ calcHierarchy: '0' }); // 当点击头部的新增时
        }
    }
};
</script>

<script lang="ts">
export default { name: 'clientClassManagement' };
</script>

<style lang="scss" scoped>

</style>