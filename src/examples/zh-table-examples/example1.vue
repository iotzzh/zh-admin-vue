<template>
    <Table
    :useSearchForm="true"
    :formSettings="formSettings"
    :tableSettings="tableSettings"
    :usePage="true"
    :request="request"
    ></Table>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TRequest, TTableFormSettings, TTableSetting } from '@/components/zh-table/type';
import { ref } from 'vue';
import api from '../api/table/index';

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasExportButton: true,
    fields: [
        { label: '姓名', type: 'input', prop: 'name', width: '120px', }
    ],
} as TTableFormSettings);
const tableSettings = ref({
    columns: [
        { label: 'ID', prop: 'id' },
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'sex', convert: (row:any, index: number) => row.sex === 0 ? '男' : '女' },
        { label: '年龄', prop: 'age' },
        { label: '手机号', prop: 'phone' },
        { label: '工号', prop: 'employeeNum' },
        { label: '角色', prop: 'role' },
    ],
} as TTableSetting);

const request = ref({
    urlList: api.getUserList,
} as TRequest);

</script>

<style lang="scss" scoped>
</style>