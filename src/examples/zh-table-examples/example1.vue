<template>
    <Table :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings" :usePage="true"
        :request="request">
        <template v-slot:zh-table-form-default-before>
            <el-button link>自定义前</el-button>
        </template>
        <template v-slot:zh-table-form-default-after>
            <el-button link>自定义后</el-button>
        </template>
        <template v-slot:zh-table-form-test>
            <el-input placeholder="请输入自定义搜索" v-model="formSettings.customModel!.test"></el-input>
        </template>
        <template v-slot:zh-table-form-next-row>
            <el-button link>自定义下一行内容</el-button>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { TZHFromField } from '@/components/zh-form/type';
import Table from '@/components/zh-table/index.vue';
import { TObject, TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, ref } from 'vue';
import api from '../api/table/index';

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasUploadButton: true,
    hasExportButton: true,
    hasResetButton: true,
    customModel: { test: '自定义搜索' },
    convertParams: (params: { [x: string]: any }) => {
        return {
            ...params,
            convertParams: true,
        };
    },
    fields: [
        // { label: '姓名', type: 'input', prop: 'name', width: '220px', },
        // { label: '性别', type: 'select', prop: 'sex', width: '220px', options: [], },
        // { label: '性别1', type: 'radio-group', prop: 'sex1', width: '220px', options: [], },
        // { label: '创建日期', type: 'date-picker', timeType: 'date', timeShowFormat: 'YYYY-MM-DD', timeValueFormat: 'YYYY-MM-DD', prop: 'createTime', width: '220px', options: [], },
        // { label: '创建日期范围', type: 'date-picker', timeType: 'daterange',  prop: 'createTime1', width: '360px', options: [],
        // convertDateTime: [{field: 'startCreateTime1', format: 'YYYY-MM-DD 00:00:00'}, {field: 'endCreateTime1', format: 'YYYY-MM-DD 23:59:59'}], },
        // { label: '自定义搜索', type: 'radio-group', prop: 'sex1', width: '220px', options: [], },

        { label: '姓名', type: 'input', prop: 'name', md: 8, xl: 24, sm: 24, xs: 24, span: 8, }, // 输入框测试
        { label: '姓名', type: 'input', prop: 'name111', md: 8, xl: 24, sm: 24, xs: 24, span: 8, notChangeTriggerSearch: true, }, // 输入框测试, 输入不搜索
        { label: '性别', type: 'select', prop: 'sex', span: 8, sm: 24, xs: 24, options: [], }, // 下拉：[{label, value}]
        {
            label: '性别Obj', type: 'select', prop: 'sexObj', valueKey: 'id', span: 8, sm: 24, xs: 24, options: [],
            convert: (fieldValue: TObject, modelValue: TObject) => fieldValue && fieldValue.id
        }, // 下拉：[objct]
        { label: '性别1', type: 'radio-group', prop: 'sex1', span: 8, sm: 12, xs: 24, options: [], },
        {
            label: '创建日期', type: 'date-picker', timeType: 'date',
            timeShowFormat: 'YYYY-MM-DD',
            timeValueFormat: 'YYYY-MM-DD',
            prop: 'createTime', span: 8, sm: 12, xs: 24, options: [],
        },
        {
            label: '创建日期范围', type: 'date-picker', timeType: 'daterange', prop: 'createTime1', options: [],
            span: 8, sm: 12, xs: 24,
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD 00:00:00' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD 23:59:59' }],
        },
        { label: '自定义搜索', type: 'slot', prop: 'test', span: 8, sm: 12, xs: 24, options: [], },
    ],
} as TZHTableFormSettings);

onMounted(() => {
    const sexItem = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'sex') as TZHFromField;
    sexItem.options = [{ label: '男', value: 0 }, { label: '女', value: 1 }];

    const sexItemObj = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'sexObj') as TZHFromField;
    sexItemObj.options = [{ label: '男', value: 0, id: 1 }, { label: '女', value: 1, id: 2 }];

    const sexItem1 = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'sex1') as TZHFromField;
    sexItem1.options = [{ label: '男', value: 0 }, { label: '女', value: 1 }];
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
                type: 'select', defaultValue: 0, placeholder: '请输入', span: 8, options: [{ label: '男', value: 0 }, { label: '女', value: 1 }],
            }
        },
        {
            label: '年龄', prop: 'age', useInModal: {
                type: 'input', defaultValue: '18', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '手机号', prop: 'phone', useInModal: {
                type: 'input', defaultValue: '15665395332', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '工号', prop: 'employeeNum', useInModal: {
                type: 'input', defaultValue: 'HS921593', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '角色', prop: 'role', useInModal: {
                type: 'input', defaultValue: 'Developer', placeholder: '请输入', span: 8,
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
} as TZHTableSetting);

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
} as TZHTableRequest);

</script>

<style lang="scss" scoped>

</style>