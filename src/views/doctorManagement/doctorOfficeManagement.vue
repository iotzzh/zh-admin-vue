<!-- 用户管理 -->
<template>
    <Table ref="refTable" :useSearchForm="true" :formSettings="formSettings" :tableSettings="tableSettings"
        :usePage="true" :request="request" @opened="opened">
    </Table>
    <ModalForm 
        ref="refModalForm" 
        :modal="modal" 
        :formSettings="modalFormSettings" 
        v-model="modalModel" 
        @opened="openedModalChangePwd"
        @submit="submit"
        >
        <template v-slot:zh-form-buttons>
           <el-button type="info" @click="resetPwd">重置密码</el-button>
           <el-button type="success" @click="changePwd">修改密码</el-button>
        </template>
    </ModalForm>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import ModalForm from '@/components/zh-modal-form/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, Ref, ref } from 'vue';
import api from '@/api/doctorManagement';
import dataListHelper from '@/utils/dataListHelper';
import { TZHModal } from '@/components/zh-modal/type';
import { TZHFormSettings } from '@/components/zh-form/type';
import { TZHRequestParams } from '@/components/zh-request/type';
import { isMessageConfirm } from '@/components/zh-message';
import ZHRequest from '@/components/zh-request';

const refTable = ref();
const refModalForm = ref();

const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: false,
    hasUploadButton: false,
    hasExportButton: true,
    hasResetButton: true,
    hideUnimportantFields: false,
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
    formLabelWidth: '70px',
    fields: [
        { label: '诊室编码', type: 'input', prop: 'id', width: '200px', },
        { label: '诊室名称', type: 'input', prop: 'consultingName', width: '200px', },
        { label: '诊室医生', type: 'input', prop: 'caaFullName', width: '200px', },
        { label: '所属医院', type: 'input', prop: 'calName', width: '200px', },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    hasIndex: true,
    hasSelection: true,
    rowKey: 'id',
    modal: {
        footer: {},
        formSettings: {
            formLabelWidth: '120px',
        },
    },
    columns: [
        { label: '诊室编码', prop: 'id', minWidth: '100px', },
        {
            label: '诊室名称', prop: 'consultingName',
            addEditInfo: {
                type: 'input',
                addSort: 1,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '诊室医生', prop: 'caaFullName', addEditInfo: {
                type: 'input',
                addSort: 2,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '诊室手机号', prop: 'caaPhoneNumber', addEditInfo: {
                type: 'input',
                addSort: 3,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '医生职位', prop: 'orgstaPosition', addEditInfo: {
                type: 'input',
                addSort: 7,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '科室', prop: 'departmentName', addEditInfo: {
                type: 'input',
                addSort: 6,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: true,
            }
        },
        {
            label: '所属医院', prop: 'calName',
            addEditInfo: {
                prop: 'cal',
                type: 'select',
                addSort: 4,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                valueKey: 'calCode',
                extendedFieldMethod: (model: any, convertModel: any, fields: any) => {
                    return [
                        { property: 'calCode', value: model && model.calCode },
                        { property: 'calName', value: model && model.calName },
                    ];
                },
                required: true,
            }
        },
        {
            label: '诊室地址', prop: 'departmentAddress', addEditInfo: {
                type: 'input',
                addSort: 8,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: false,
            }
        },
        {
            label: '登录账户', prop: 'caaLoginAccount', notDisplay: true,
            addEditInfo: {
                type: 'input',
                addSort: 5,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8,
                xl: 8,
                required: true,
            }
        },

        {
            label: '诊室简介', prop: 'introduction', notDisplay: true,
            addEditInfo: {
                type: 'input',
                inputType: 'textarea',
                addSort: 9,
                xs: 24,
                sm: 24,
                md: 12,
                lg: 12,
                xl: 12,
                required: true,
            }
        },

        {
            label: '医生擅长方向', prop: 'expertiseField', notDisplay: true,
            addEditInfo: {
                type: 'input',
                inputType: 'textarea',
                addSort: 10,
                xs: 24,
                sm: 24,
                md: 12,
                lg: 12,
                xl: 12,
                required: true,
            }
        },
    ],
    actionColumn: {
        label: '操作',
        width: '280px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        buttons: [
            // { label: '启用', displayMethod: (row: any) => row.sex, type: 'primary', icon: 'Unlock', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            // { label: '禁用', type: 'primary', icon: 'Lock', style: 'color: #E42222;', onClick: (row: any, index: any) => { console.log('row: ' + row, '/n index: ' + index); } },
            { label: '重置密码', hide: false, type: 'success', icon: 'RefreshLeft', onClick: (row: any, index: any) => { clickResetPwd(row); } },
        ],
    },
} as TZHTableSetting);

const request = ref({
    list: { url: api.getDoctorAccountList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addDoctorAccount, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateDoctorAccount, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteDoctorAccount, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.deleteDoctorAccount, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

onMounted(async () => {
    // 获取医院
    const item = tableSettings.columns?.find((x: any) => x.label === '所属医院');
    const result: any = await dataListHelper.getClientList();
    item!.addEditInfo!.options = result;
});

//#region 修改密码
const modalModel = ref({} as any);
const modal: Ref<TZHModal> = ref({
    width: '500px',
    show: false,
    title: '修改密码',
    footer: {},
});

const modalFormSettings: Ref<TZHFormSettings> = ref({
    fields: [
        { label: '管理账号:', prop: 'caaLoginAccount', type: 'text', span: 24, },
        { label: '管理密码:', prop: 'caaLoginPassword', type: 'input', inputType: 'password', showPassword: true, span: 24, defaultValue: '*********', disabled: true, },
        { label: '', prop: 'buttons', type: 'slot', span: 24,  },
    ],
});

const opened = (params: any) => {
    if (params.modal.type === 'edit') {
        const item = tableSettings.columns?.find((x: any) => x.label === '所属医院');
        const calCodeValue = item?.addEditInfo?.options?.find((x: any) => x.calCode === params.openEditModalData.calCode);
        refTable.value.setModalFormModel({ cal: calCodeValue });
    }
};

const clickResetPwd = (row: any) => {
    modal.value.show = true;
    modal.value.data = row;
};

const openedModalChangePwd = (params: any) => {
    refModalForm.value.setModalFormModel({ caaLoginAccount: modal.value.data.caaLoginAccount });
};

const resetPwd = async () => {
    const msgResult = await isMessageConfirm('是否确认重置?', '确认');
    if(!msgResult) return;
    const params: TZHRequestParams = {
        url: api.resetPwd,
        conditions: {
            id: modal.value.data.id
        },
        errorMessage: '重置失败',
        successMessage: '重置成功',
    };
    const result = await ZHRequest.post(params);
};

const changePwd = async () => {
    refModalForm.value.setModalFormModel({ caaLoginPassword: '' });
    const item:any = modalFormSettings!.value!.fields;
    item[1].disabled = false;
};

const submit = async() => {
    const params: TZHRequestParams = {
        url: api.updatePwd,
        conditions: {
            id: modal.value.data.id,
            caaLoginPassword: modalModel.value.caaLoginPassword,
        },
        errorMessage: '修改失败',
        successMessage: '修改成功',
    };
    const result = await ZHRequest.post(params);
    if (result.success) modal.value.show = false;
};
//#endregion
</script>

<script lang="ts">
export default { name: 'doctorOfficeManagement' };
</script>

<style lang="scss" scoped>

</style>