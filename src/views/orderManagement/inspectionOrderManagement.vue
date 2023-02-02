<!-- 用户管理 -->
<template>
    <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request" @changeModel="changeModel">
        <template v-slot:zh-table-status="scope">
            <div v-if="scope.row.status">在职</div>
            <div v-else>不在职</div>
        </template>
    </Table>
    <Modal ref="refModal" :modal="modal" @cancel="closeModal" @close="closeModal" class="modal"
        @submit="() => {}">
        <Form v-model="modalFormModel" :form-settings="modalFormSettings"></Form>
        <!-- <Table ref="refMenuTable" :useSearchForm="false" :tableSettings="menuTableSettings" :usePage="false">
        </Table> -->
    </Modal>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, Ref, ref } from 'vue';
import api from '@/api/authorityManagement';
import isHelper from '@/utils/isHelper';
import Modal from '@/components/zh-modal/index.vue';
import Form from '@/components/zh-form/index.vue';
import { TZHModal } from '@/components/zh-modal/type';
import { TZHFormSettings } from '@/components/zh-form/type';

const refZHTable = ref();
const refModal = ref();
const refMenuTable = ref();
const isMobile = isHelper.isMobile();

//#region 基础表格
const formSettings = ref({
    hasAddButton: false,
    hasSearchButton: true,
    hasDeleteButton: false,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: true,
    hideUnimportantFields: isMobile,
    customModel: {},
    convertParams: (params: { [x: string]: any }) => {
        return {
            ...params,
            convertParams: true,
        };
    },
    buttons: [
        // { label: '自定义按钮1', icon: 'Filter', method: () => { console.log('hello world'); }, style: 'color: pink; background-color: blue;' }
    ],
    formLabelWidth: '80px',
    fields: [
        {
            label: '创建日期', type: 'date-picker', timeType: 'daterange', prop: 'createTimeTest', options: [],
            width: '200px',
            convertDateTime: [{ field: 'startCreateTime1', format: 'YYYY-MM-DD' }, { field: 'endCreateTime1', format: 'YYYY-MM-DD' }],
        },
        { label: '订单编号', type: 'input', prop: 'name111', width: '200px', },
        // { label: '登录账号', type: 'input', prop: 'name111', width: '200px', },
        { label: '患者姓名', type: 'input', prop: 'name1111', width: '200px', unimportant: isMobile, },
        { label: '医院名称', type: 'input', prop: 'name1111', width: '200px', unimportant: isMobile, },
        { label: '科室', type: 'input', prop: 'name1111', width: '200px', unimportant: isMobile, },
        { label: '医生姓名', type: 'input', prop: 'name1111', width: '200px', unimportant: isMobile, },
        {
            label: '状态', type: 'select', prop: 'name11111', width: '200px', defaultValue: 0, unimportant: isMobile,
            options: [
                { label: '已填写', value: 0 },
                { label: '未填写', value: 1 },
                { label: '已核收', value: 1 },
            ],
        },
        {
            label: '支付状态', type: 'select', prop: 'name11111', width: '200px', defaultValue: 0, unimportant: isMobile,
            options: [
                { label: '已支付', value: 0 },
                { label: '未支付', value: 1 },
            ],
        },
        {
            label: '报告状态', type: 'select', prop: 'name11111', width: '200px', defaultValue: 0, unimportant: isMobile,
            options: [
                { label: '报告已出', value: 0 },
                { label: '报告未出', value: 1 },
            ],
        },
        {
            label: '订单类型', type: 'select', prop: 'name11111', width: '200px', defaultValue: 0, unimportant: isMobile,
            options: [
                { label: '全部', value: 0 },
                { label: '普通订单', value: 1 },
                { label: '冲红订单', value: 1 },
                { label: '原单加项', value: 1 },
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
    },
    columns: [
        { label: '创建日期', prop: 'test', width: '120px' },
        { label: '订单编号', prop: 'test', width: '120px' },
        { label: '原订单号', prop: 'test', width: '120px' },
        { label: '患者姓名', prop: 'test', width: '120px' },
        { label: '条码', prop: 'test', width: '120px' },
        { label: '项目名称', prop: 'test', width: '120px' },
        { label: '预约时间', prop: 'test', width: '120px' },
        { label: '采样地点', prop: 'test', width: '120px' },
        { label: '订单金额', prop: 'test', width: '120px' },
        { label: '支付状态', prop: 'test', width: '120px' },
        { label: '结算时间', prop: 'test', width: '120px' },
        { label: '订单渠道（医生端/患者端）', prop: 'test', width: '200px' },
        { label: '医生', prop: 'test', width: '120px' },
        { label: '医生id', prop: 'test', width: '120px' },
        { label: '科室', prop: 'test', width: '120px' },
        { label: '状态', prop: 'test', width: '120px' },
        { label: '报告状态', prop: 'test', width: '120px' },
        { label: '报告地址', prop: 'test', width: '120px' },
        { label: '医院名称', prop: 'test', width: '120px' },
        { label: '医院编码', prop: 'test', width: '120px' },
        { label: '合作商名称', prop: 'test', width: '150px' },
        { label: '合作商编码', prop: 'test', width: '150px' },
        { label: '销售经理', prop: 'test', width: '120px' },
        { label: '销售经理id', prop: 'test', width: '150px' },
        { label: '项目编码', prop: 'test', width: '120px' },
        { label: '收款主体名称', prop: 'test', width: '150px' },
        { label: '收款主体编码', prop: 'test', width: '150px' },
        { label: '患者手机号码', prop: 'test', width: '150px' },
        { label: '患者身份证号码', prop: 'test', width: '150px' },
        { label: '患者家庭地址', prop: 'test', width: '150px' },
        { label: '微信支付订单号', prop: 'test', width: '150px' },
        { label: '退费状态', prop: 'test', width: '120px' },
        { label: '退费操作人', prop: 'test', width: '150px' },
        { label: '退费操作人id', prop: 'test', width: '150px' },
    ],
    actionColumn: {
        fixed: 'right',
        label: '操作',
        width: '90px',
        hasRowDeleteAction: false,
        hasRowEditAction: false,
        buttons: [
            { label: '明细', hide: false, type: 'primary', icon: 'Tickets', onClick: (row: any, index: any) => openModal('') },
        ],
    },
} as TZHTableSetting);

onMounted(() => {
    // 控制列是否显示
    // const idColumn: any = tableSettings.columns?.find((x: any) => x.prop === 'id');
    // idColumn.notDisplay = true;
    // idColumn.notDisplay = false;
});

const request = ref({
    list: { url: api.getUserList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addUser, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateUser, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteUser, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteUser, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

const changeModel = (model: any) => {
    // const actionColumn = tableSettings?.actionColumn;
    // const button0 = tableSettings?.actionColumn?.buttons && tableSettings?.actionColumn?.buttons[0];
    // const button1 = tableSettings?.actionColumn?.buttons && tableSettings?.actionColumn?.buttons[1];
    // if (model.name11111) {
    //     button0!.hide = true;
    //     button1!.hide = false;
    //     actionColumn!.hasRowDeleteAction = false;
    //     actionColumn!.hasRowEditAction = false;
    //     formSettings.value.hasAddButton = false;
    //     formSettings.value.hasDeleteButton = false;
    // } else {
    //     button0!.hide = false;
    //     button1!.hide = true;
    //     actionColumn!.hasRowDeleteAction = true;
    //     actionColumn!.hasRowEditAction = true;

    //     formSettings.value.hasAddButton = true;
    //     formSettings.value.hasDeleteButton = true;
    // }
};
//#endregion

//#region 弹窗
const allCheckedList = ref([] as any);
const modal: Ref<TZHModal> = ref({
    width: '90%',
    show: false,
    title: '订单查询明细',
    footer: {},
});

const modalFormModel = ref({
    test: 'ORSL202301111000002',
    test1: '脏器功能综合检查套餐(男女均可)',
    test2: '20230111',
    test3: '67',
});

const openModal = (row: any) => {
    modal.value.show = true;
    modal.value.data = row;
};

const closeModal = () => {
    modal.value.show = false;
    allCheckedList.value = [];
};

const modalFormSettings = ref({
    fields: [
        { label: '单据号码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '状态:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '支付状态:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '退费状态:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '清账标志:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '结算类型:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '订单类型:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '渠道商名称:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '渠道商编码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '合作商名称:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '合作商编码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '原单号:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '批次号:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '预约时间:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },

        { label: '产品名称:', prop: 'test1', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '产品编码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '销售(物价)价格:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '条码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '渠道区划名称:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '省市区:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '收款主体编码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '收款主体名称:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '样本接收员:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '销售人员:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '送检人员:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '送检人手机:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '套餐标志:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '消费者名称:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '消费者科室:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '性别:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '年龄:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '客户ID:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '婚姻:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '身份证号:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '消费者手机号码:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '消费者家庭地址:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },

        { label: '订单汇总金额:', prop: 'test3', type: 'text', xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '订单汇总数量:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '报告地址:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '使用微信:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '报告状态:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '微信支付单号:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '制单人:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '核收人:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
        { label: '退费操作人:', prop: 'test', type: 'text',  xs: 24, sm: 12, md: 12, lg: 6, xl: 6, },
    ],
} as TZHFormSettings);

//#endregion

</script>

<script lang="ts">
export default { name: 'inspectionOrderManagement' };
</script>

<style lang="scss">
.modal {
    .el-form-item__label {
        font-weight: bolder;
        color: black;
    }
}
</style>