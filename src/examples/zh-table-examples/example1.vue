<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request">
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
            <el-button link @click="getSearchFormModel">自定义下一行内容</el-button>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { TZHFromField } from '@/components/zh-form/type';
import Table from '@/components/zh-table/index.vue';
import { TObject, TZHTableRequest, TZHTableFormSettings, TZHTableSetting, TZHTableColumn } from '@/components/zh-table/type';
import { onMounted, ref } from 'vue';
import api from '../api/table/index';
import { RefreshLeft, Search, Delete, Download, Plus, DocumentChecked, Refresh, Upload, Edit } from '@element-plus/icons-vue';

const refZHTable = ref();

const getSearchFormModel = () => {
    const model = refZHTable.value.getSearchFormModel();
    console.log(model);
};

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasUploadButton: true,
    hasExportButton: true,
    hasResetButton: true,
    hideUnimportantFields: true,
    customModel: { test: '自定义搜索' },
    convertParams: (params: { [x: string]: any }) => {
        return {
            ...params,
            convertParams: true,
        };
    },
    buttons: [
        { label: '自定义按钮1', icon: Edit, method: () => { console.log('hello world'); }, style: 'color: pink; background-color: blue;' }
    ],
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
            unimportant: true,
        },
        {
            label: '创建日期范围', type: 'date-picker', timeType: 'daterange', prop: 'createTime1', options: [], unimportant: true,
            span: 8, sm: 12, xs: 24,
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD 00:00:00' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD 23:59:59' }],
        },
        { label: '自定义搜索', type: 'slot', prop: 'test', span: 8, sm: 12, xs: 24, options: [], unimportant: true, },
        {
            label: '级联选择器搜索', type: 'cascader', prop: 'cascaderParams', refName: 'refCascaderParams', span: 8, sm: 12, xs: 24, options: [], unimportant: true,
            props: {}
        },
        { label: '测试复选框', type: 'checkbox', prop: 'testCheckbox', checkboxText: '复选框后面的文字', span: 8, sm: 12, xs: 24, options: [], },
    ],
} as TZHTableFormSettings);

onMounted(() => {
    const sexItem = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'sex') as TZHFromField;
    sexItem.options = [{ label: '男', value: 0 }, { label: '女', value: 1 }];

    const sexItemObj = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'sexObj') as TZHFromField;
    sexItemObj.options = [{ label: '男', value: 0, id: 1 }, { label: '女', value: 1, id: 2 }];

    const sexItem1 = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'sex1') as TZHFromField;
    sexItem1.options = [{ label: '男', value: 0 }, { label: '女', value: 1 }];

    const cascaderParamsItem = formSettings.value.fields?.find((x: TZHFromField) => x.prop === 'cascaderParams') as TZHFromField;
    cascaderParamsItem.options = [
        { label: '男', value: 0, children: [{ label: '男1', value: 0.1, }], },
        { label: '女', value: 1, children: [{ label: '女1', value: 1.1, }], },
        { label: '未知', value: 2, children: [{ label: '未知1', value: 2.1, }], },
    ];

    const cascaderModalParamsItem = tableSettings.value.columns?.find((x: TZHTableColumn) => x.prop === 'org') as TZHTableColumn;
    cascaderModalParamsItem.useInModal!.options = [
        { label: '男', value: 0, children: [{ label: '男1', value: 0.1, }], },
        { label: '女', value: 1, children: [{ label: '女1', value: 1.1, }], },
        { label: '未知', value: 2, children: [{ label: '未知1', value: 2.1, }], },
    ];
});

const testGetSettings = (origin: { [x: string]: any }, model: { [x: string]: any }, formSettings: any) => {
    console.log('convert formSettings: ' + JSON.stringify(formSettings.value[7]));
    return origin && origin[0];
};

const tableSettings = ref({
    modal: {
        customModel: {},
    },
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
        {
            label: '组织架构', prop: 'org',
            useInModal:
            {
                defaultValue: 'Developer', type: 'cascader', placeholder: '请输入', span: 8, options: [],
                refName: 'refOrg',
                props: { checkStrictly: true, },
                checkedNodes: [],
                convert: testGetSettings,
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
    conditionsDelete: {},
    urlDelete: api.deleteUser,
    urlUpdate: api.updateUser
} as TZHTableRequest);




</script>

<style lang="scss" scoped>

</style>