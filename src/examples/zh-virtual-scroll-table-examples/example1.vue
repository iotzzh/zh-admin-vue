<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request" :pageSettings="pageSettings">
        <template v-slot:zh-table-form-test>
            <el-input placeholder="请输入自定义搜索" v-model="formSettings.customModel!.test"></el-input>
        </template>

        <template v-slot:zh-table-form-default-before>
            <el-button style="margin-right: 15px;">自定义前 any element</el-button>
        </template>
        <template v-slot:zh-table-form-default-after>
            <el-button>自定义后 any element</el-button>
        </template>

        <template v-slot:zh-table-form-next-row>
            <el-button link @click="getSearchFormModel">自定义下一行内容</el-button>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { TZHFromField } from '@/components/zh-form/type';
import Table from '@/components/zh-virtualscroll-table/index.vue';
import { TObject, TZHTableRequest, TZHTableFormSettings, TZHTableSetting, TZHTableColumn, TZHTablePageSetting } from '@/components/zh-table/type';
import { onMounted, reactive, ref } from 'vue';
import api from '../api/table/index';
import { RefreshLeft, Search, Delete, Download, Plus, DocumentChecked, Refresh, Upload, Edit } from '@element-plus/icons-vue';
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
        { label: '自定义按钮1', icon: 'Filter', method: () => { console.log('hello world'); }, style: 'color: pink; background-color: blue;' }
    ],
    fields: [
        { label: '姓名', type: 'input', prop: 'name', span: 8, defaultValue: 'test default' }, // 输入框测试
        { label: '姓名', type: 'input', prop: 'name111', span: 8, notChangeTriggerSearch: true, }, // 输入框测试, 输入不搜索
        { label: '性别', type: 'select', prop: 'sex', span: 8, options: [], }, // 下拉：[{label, value}]
        {
            label: '性别Obj', type: 'select', prop: 'sexObj', valueKey: 'id', span: 8, options: [],
            convert: (fieldValue: TObject, modelValue: TObject) => fieldValue && fieldValue.id
        }, // 下拉：[objct]
        { label: '性别1', type: 'radio-group', prop: 'sex1', span: 8, options: [], },
        {
            label: '创建日期范围', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTest', options: [],
            span: 8,
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD' }],
        },
        {
            label: '创建日期11111', type: 'date-picker', timeType: 'date',
            timeShowFormat: 'YYYY-MM-DD',
            timeValueFormat: 'YYYY-MM-DD',
            prop: 'createTime1111111', span: 8, options: [],
            unimportant: true,
        },
        { label: '自定义搜索', type: 'slot', prop: 'test', span: 8, options: [], unimportant: true, },
        {
            label: '级联选择器搜索', type: 'cascader', prop: 'cascaderParams', refName: 'refCascaderParams', span: 8, options: [], unimportant: true,
            props: {}
        },
        { label: '测试复选框', type: 'checkbox', prop: 'testCheckbox', checkboxText: '复选框后面的文字', span: 8, options: [], },
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

    const cascaderModalParamsItem = tableSettings.columns?.find((x: TZHTableColumn) => x.prop === 'org') as TZHTableColumn;
    cascaderModalParamsItem.addEditInfo!.options = [
        { label: '男', value: 0, children: [{ label: '男1', value: 0.1, }], },
        { label: '女', value: 1, children: [{ label: '女1', value: 1.1, }], },
        { label: '未知', value: 2, children: [{ label: '未知1', value: 2.1, }], },
    ];
});

const testGetSettings = (origin: { [x: string]: any }, model: { [x: string]: any }, formSettings: any) => {
    // console.log('convert formSettings: ' + JSON.stringify(formSettings));
    console.log('test convert method.');
    return origin && origin[0];
};

const tableSettings = reactive({
    hasIndex: true,
    hasSelection: true,
    rowKey: 'id',
    modal: {
        customModel: {},
        customValidate: (model: { [x: string]: any }) => {
            console.log('customValidate', model);
            if (model.sex === 0) {
                popErrorMessage('男若磐石，不变不移~');
                return false;
            }
            return true;
        },
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
            allowCellEdit: true,
            addEditInfo: {
                type: 'input',
                defaultValue: 'zzh',
                placeholder: '请输入',
                span: 8,
                required: true,
            }
        },
        {
            label: '性别', prop: 'sex', convert: (row: any) => row.sex === 0 ? '男' : '女', allowCellEdit: true,
            addEditInfo: {
                type: 'select', defaultValue: 0, placeholder: '请输入', span: 8, options: [{ label: '男', value: 0 }, { label: '女', value: 1 }],
            }
        },
        {
            label: '年龄', prop: 'age', addEditInfo: {
                type: 'input', defaultValue: '18', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '手机号', prop: 'phone', addEditInfo: {
                type: 'input', defaultValue: '15665395332', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '工号', prop: 'employeeNum', addEditInfo: {
                type: 'input', defaultValue: 'HS921593', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '角色', prop: 'role', addEditInfo: {
                type: 'input', defaultValue: 'Developer', placeholder: '请输入', span: 8,
            }
        },
        {
            label: '组织架构', prop: 'org',
            addEditInfo:
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

const pageSettings = ref({ layout: 'total, sizes', size: 1000 } as TZHTablePageSetting);


</script>

<script lang="ts">
export default { name: 'tableExample2' };
</script>

<style lang="scss" scoped>

</style>