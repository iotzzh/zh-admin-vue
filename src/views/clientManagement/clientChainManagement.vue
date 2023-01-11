<!-- 客户连锁管理 -->
<template>
    <el-row class="row" :gutter="10">
        <el-col class="column" :span="isMobile ? 0 : 6">
            <ZHTree :treeSettings="treeSettings" :defaultProps="defaultProps" :request="request">
            </ZHTree>
        </el-col>
        <el-col class="column" :span="isMobile ? 24 : 18">
            <span class="icon" @click="openTreeSettings" v-if="isMobile" style="position: absolute; top: 0; z-index: 10000; right: 0;">
                <i class="iconfont icon-zhedie2" />
        <!-- <i v-if="collapse" class="iconfont icon-zhedie1" />
        <i v-else class="iconfont icon-zhedie2" /> -->
      </span>
            <Table ref="refZHTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
                :usePage="true" :request="requestTable">
                <template v-slot:zh-table-form-test>
                    <el-input placeholder="请输入自定义搜索" v-model="formSettings.customModel!.test"></el-input>
                </template>
            </Table>
        </el-col>

        <el-drawer
    v-model="isOpenDrawerMenu"
    title="客户连锁管理"
    :show-close="true"
    direction="rtl"
    :with-header="true"
    size="70%"
    modal-class="layout-menu-drawer"
  >
  <ZHTree :treeSettings="treeSettings" :defaultProps="defaultProps" :request="request">
            </ZHTree>
  </el-drawer>
    </el-row>
</template>

<script lang="ts" setup>
import ZHTree from '@/components/zh-tree/index.vue';
import { TZHTreeRequest, TZHTreeSetting } from '@/components/zh-tree/type';
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, ref } from 'vue';
import treeApi from '@/api/authorityManagement';
import api from '@/api/clientManagement';
import storage from '@/utils/storage';

const treeSettings = ref({
    hasEmptyAdd: true,
    hasRootAdd: true,
    hasAdd: true,
    hasEdit: true,
    hasDelete: true,
    labelDisplayMaxLength: 10,
    modal: {
        footer: {
            hasCancelButton: true,
            hasSubmitButton: true,
        },
        formSettings: {
            formLabelWidth: '120px',
            fields: [
                { label: '上级部门名称', prop: 'parent1', type: 'input', span: 12, },
                { label: '部门名称', prop: 'parent2', type: 'input', span: 12, required: true, },
                {
                    label: '部门名称', prop: 'parent3', type: 'radio-group', span: 12, required: true,
                    options: [
                        { label: '公司', value: '1' },
                        { label: '部门', value: '1' },
                        { label: '组', value: '1' },
                        { label: '小组', value: '1' },
                    ]
                },
                { label: '层级深度', prop: 'parent4', type: 'input', span: 12, },
                { label: '是否启用', prop: 'parent5', type: 'switch', span: 12, },
            ],
        },
    },

} as TZHTreeSetting);

const defaultProps = ref({
    label: 'label',
});

const request = ref({
    urlGet: treeApi.getOrgList,
    urlAdd: treeApi.addOrg,
    urlEdit: treeApi.updateOrg,
    urlDelete: treeApi.deleteOrg,
} as TZHTreeRequest);

const refZHTable = ref();

const getSearchFormModel = () => {
    const model = refZHTable.value.getSearchFormModel();
    console.log(model);
};

const formSettings = ref({
    hasAddButton: false,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: false,
    hideUnimportantFields: false,
    customModel: {},
    convertParams: (params: { [x: string]: any }) => {
        return {
            ...params,
            convertParams: true,
        };
    },
    buttons: [
        { label: '添加', icon: 'Plus', method: () => { console.log('hello world'); }, style: 'color: white; background-color: blue;' }
    ],
    formLabelWidth: '70px',
    fields: [
        { label: '客户编码', type: 'input', prop: 'name', width: '200px', },
        { label: '客户名称', type: 'input', prop: 'name1112', width: '200px', },
        { label: '状态', type: 'select', prop: 'name111', width: '200px', options: [
            { label: '是', value: 1},
            { label: '否', value: 0},
        ], },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    tablePanelSetting: {
        title: '客户列表',
        secondaryTitle: '某某医院'
    },
    hasIndex: true,
    hasSelection: true,
    modal: {
        customModel: {},
        footer: {
            hasCancelButton: true,
            hasSubmitButton: true,
        },
        formLabelWidth: '90px',
    },
    
    columns: [
        { label: '客户编码', prop: 'id', }, 
        { label: '客户名称', prop: 'name', }, 
        { label: '税号', prop: 'sex', }, 
        { label: '联系人', prop: 'phone', }, 
        { label: '客户地址', prop: 'test', }, 
    ],

    actionColumn: {
        label: '操作',
        width: '100px',
        hasRowDeleteAction: false,
        hasRowEditAction: false,
        fixed: 'right',
        buttons: [
            { label: '移出', displayMethod: (row: any) => row.sex, type: 'danger', icon: 'Minus', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            { label: '添加', displayMethod: (row: any) => !row.sex, type: 'primary', icon: 'Plus', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
        ],
    },
} as TZHTableSetting);

onMounted(() => {
    // 控制列是否显示
    //  const idColumn: any = tableSettings.columns?.find((x: any) => x.prop === 'id');
    //  idColumn.notDisplay = true;
    // idColumn.notDisplay = false;
});

const requestTable = ref({
    list: { url: api.getClientList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addClient, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateClient, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteClient, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteClient, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

const isMobile = ref(storage.getIsMobile());

const isOpenDrawerMenu = ref(false);

const openTreeSettings = () => {
    isOpenDrawerMenu.value = true;
};
</script>

<script lang="ts">
export default { name: 'clientChainManagement' };
</script>

<style lang="scss" scoped>
.row,
.column {
    height: 100%;
}
</style>