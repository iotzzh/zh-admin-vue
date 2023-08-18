<!-- 用户管理 -->
<template>
  <Table
    ref="refZHTable"
    :formSettings="formSettings"
    :tableSettings="tableSettings"
    :usePage="true"
    :request="request"
    @opened="opened"
  >
  </Table>
</template>

<script lang="ts" setup>
  import Table from '@/components/zh-table/index.vue';
  import { TZHTableRequest, TZHTableForm, TZHTableSetting } from '@/components/zh-table/type';
  import { onMounted, reactive, ref } from 'vue';
  import api from '@/api/authorityManagement';
  import isHelper from '@/utils/isHelper';
  import { popErrorMessage } from '@/components/zh-message';

  const refZHTable = ref();
  const isMobile = isHelper.isMobile();

  const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: true,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: true,
    hideUnimportantFields: isMobile,
    customModel: {},
    formLabelWidth: '70px',
    fields: [
      { label: '手机号', type: 'input', prop: 'phone', width: '200px' },
      { label: '姓名', type: 'input', prop: 'name', width: '200px' },
      // { label: '登录账号', type: 'input', prop: 'name111', width: '200px', },
      {
        label: '员工编号',
        type: 'input',
        prop: 'employeeNum',
        width: '200px',
        unimportant: isMobile,
      },
      {
        label: '状态',
        type: 'select',
        prop: 'status',
        width: '200px',
        defaultValue: 1,
        unimportant: isMobile,
        options: [
          { label: '在职', value: 1 },
          { label: '离职', value: 0 },
        ],
      },
    ],
  } as TZHTableForm);

  const tableSettings = reactive({
    hasIndex: true,
    hasSelection: true,
    rowKey: 'id',
    modal: {
      title: '',
      footer: {},
      formSettings: {
        formLabelWidth: '90px',
        customValidate: (modelValue: any) => {
          const isPhoneNum = isHelper.isPhoneNum(modelValue.phone);
          if (!isPhoneNum) {
            popErrorMessage('请输入正确的手机号');
            return false;
          }
          return true;
        },
      },
      onBeforeSubmit: async (params: any) => {
        console.log('onBeforeSubmit');
        // updateUserRole(params);
        // updateUserCal(params);
      },
      onAfterSubmit: async (params: any) => {
        console.log('onAfterSubmit');
      },
    },
    columns: [
      {
        label: '姓名',
        prop: 'name',
        allowCellEdit: false,
        minWidth: '100px',
        addEditInfo: {
          type: 'input',
          addSort: 1,
          defaultValue: '',
          placeholder: '请输入',
          xs: 24,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8,
          required: true,
        },
      },
      {
        label: '性别',
        prop: 'sex',
        convert: (row: any) => (row.sex === 0 ? '女' : row.sex === 1 ? '男' : '未知'),
        minWidth: '80px',
        addEditInfo: {
          type: 'select',
          defaultValue: null,
          addSort: 2,
          placeholder: '请选择',
          span: 12,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8,
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ],
          required: false,
        },
      },
      {
        label: '账号',
        prop: 'phone',
        minWidth: '150px',
        addEditInfo: {
          addSort: 2.5,
          label: '手机号',
          prop: 'phone',
          type: 'input',
          defaultValue: null,
          placeholder: '请输入',
          span: 8,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8,
          required: true,
        },
      },
      {
        label: '角色',
        prop: 'role',
        notDisplay: true,
        addEditInfo: {
          addSort: 3,
          type: 'select',
          valueKey: 'id',
          span: 12,
          xs: 24,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8,
          required: true,
          convert: (model: any, convertModel: any, fields: any) => {
            return model && model.map((x: any) => x.id);
          },
        },
      },
    ],
    actionColumn: {
      label: '操作',
      width: '215px',
      hasRowDeleteAction: true,
      hasRowEditAction: true,
      buttons: [
        {
          label: '激活',
          hide: true,
          type: 'primary',
          icon: 'Refresh',
          onClick: (row: any, index: any) => {
            console.log('row: ' + row, '/n index: ' + index);
          },
        },
      ],
    },
  } as TZHTableSetting);

  onMounted(async () => {
    // 获取角色列表
    const itemRole = tableSettings.columns?.find((x: any) => x.label === '角色');
    itemRole!.addEditInfo!.options = [
      { label: '产品', id: '001' },
      { label: '开发', id: '002' },
      { label: '测试', id: '003' },
      { label: '运营', id: '004' },
    ];
  });

  const request = ref({
    list: {
      url: api.getUserList,
      successMessage: '查询成功',
      errorMessage: '查询失败',
    },
    add: {
      url: api.addUser,
      successMessage: '新增成功',
      errorMessage: '新增失败',
    },
    update: {
      url: api.updateUser,
      successMessage: '更新成功',
      errorMessage: '更新失败',
    },
    delete: {
      url: api.deleteUser,
      successMessage: '删除成功',
      errorMessage: '删除失败',
    },
    batchDelete: {
      url: api.batchDeleteUser,
      successMessage: '批量删除成功',
      errorMessage: '批量删除失败',
    },
  } as TZHTableRequest);

  const opened = async (params: any) => {
    if (params.modal.type === 'edit') {
      refZHTable.value.setModalFormModel({ role: { label: '产品', id: '001' } });
    }
  };
</script>

<script lang="ts">
  export default { name: 'userManagement' };
</script>

<style lang="scss" scoped></style>
