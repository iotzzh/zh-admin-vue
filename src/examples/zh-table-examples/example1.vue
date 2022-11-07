<template>
    <Table :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings" :usePage="true"
        :request="request"></Table>
</template>

<script lang="ts" setup>
import { TField } from '@/components/zh-form/type';
import Table from '@/components/zh-table/index.vue';
import { TRequest, TTableFormSettings, TTableSetting } from '@/components/zh-table/type';
import { onMounted, ref } from 'vue';
import api from '../api/table/index';

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasExportButton: true,
    hasResetButton: true,
    fields: [
        { label: '姓名', type: 'input', prop: 'name', width: '220px', },
        { label: '性别', type: 'select', prop: 'sex', width: '220px', options: [], },
        { label: '性别1', type: 'radio-group', prop: 'sex1', width: '220px', options: [], },
        { label: '创建日期', type: 'date-picker', timeType: 'date', timeShowFormat: 'YYYY-MM-DD', timeValueFormat: 'YYYY-MM-DD', prop: 'createTime', width: '220px', options: [], },
        { label: '创建日期范围', type: 'date-picker', timeType: 'daterange',  prop: 'createTime1', width: '360px', options: [],
        convertDateTime: [{field: 'startCreateTime1', format: 'YYYY-MM-DD 00:00:00'}, {field: 'endCreateTime1', format: 'YYYY-MM-DD 23:59:59'}], },
        { label: '自定义搜索', type: 'radio-group', prop: 'sex1', width: '220px', options: [], },
    ],
} as TTableFormSettings);

onMounted(() => {
    const sexItem = formSettings.value.fields?.find((x: TField) => x.prop === 'sex') as TField;
    const sexItem1 = formSettings.value.fields?.find((x: TField) => x.prop === 'sex1') as TField;
    sexItem.options = [
        { label: '男', value: 0 },
        { label: '女', value: 1 },
    ];
    sexItem1.options = [
        { label: '男', value: 0 },
        { label: '女', value: 1 },
    ];
});

const tableSettings = ref({
    columns: [
        {
            label: '默认不显示列',
            prop: 'id0',
            notDisplay: true,
        },
        { label: 'ID', prop: 'id', },
        {
            label: '姓名', 
            prop: 'name', 
            useInModal: { 
                type: 'input', 
                defaultValue: 'zzh', 
                placeholder: '请输入', 
                span: 8, 
            }
        },
        {
            label: '性别', prop: 'sex', convert: (row: any) => row.sex === 0 ? '男' : '女', useInModal: {
                type: 'select', defaultValue: 'zzh', placeholder: '请输入', span: 8, options: [{ label: '男', value: 0 }, { label: '女', value: 1 }],
            }
        },
        {
            label: '年龄', prop: 'age', useInModal: {
                type: 'input', defaultValue: 'zzh', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '手机号', prop: 'phone', useInModal: {
                type: 'input', defaultValue: 'zzh', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '工号', prop: 'employeeNum', useInModal: {
                type: 'input', defaultValue: 'zzh', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '角色', prop: 'role', useInModal: {
                type: 'input', defaultValue: 'zzh', placeholder: '请输入', span: 8,
            }
        },
    ],
    actionColumn: {
        label: '操作',
        width: '215px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        buttons: [
            { label: '自定义按钮', type: 'primary', icon: 'Plus', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } }
        ],
    },
} as TTableSetting);

onMounted(() => {
    // 控制列是否显示
    const idColumn: any = tableSettings.value.columns?.find((x: any) => x.prop === 'id');
    idColumn.notDisplay = true;
});


const request = ref({
    urlList: api.getUserList,
    urlAdd: api.addUser,
    urlBatchDelete: api.batchDeleteUser,
    urlDelete: api.deleteUser,
    urlUpdate: api.updateUser
} as TRequest);

</script>

<style lang="scss" scoped>

</style>