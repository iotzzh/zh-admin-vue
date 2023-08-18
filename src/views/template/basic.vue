<template>
  <BasicTemplate :config="pageSetting"></BasicTemplate>
</template>

<script lang="ts" setup>
  import BasicTemplate from '@/templates/basic/index.vue';
  import { ref } from 'vue';
  import api from '@/api/index';

  const pageSetting: any = ref({});
  new Promise((resolve, reject) => {
    const pageConfig = {
      table: {
        formConfig: {
          hasAddButton: true,
          hasSearchButton: true,
          hasDeleteButton: true,
          hasUploadButton: true,
          hasExportButton: true,
          hasResetButton: true,
          customModel: {},
          formLabelWidth: '70px',
          fields: [
            {
              label: '手机号',
              type: 'input',
              prop: 'phone',
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
            },
            {
              label: '姓名',
              type: 'input',
              prop: 'name',
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
            },
            {
              label: '员工编号',
              type: 'input',
              prop: 'employeeNum',
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
            },
            {
              label: '状态',
              type: 'select',
              prop: 'status',
              xs: 24,
              sm: 12,
              md: 8,
              lg: 8,
              xl: 6,
              defaultValue: 1,
              defaultOptions: [
                { label: '在职', value: 1 },
                { label: '离职', value: 0 },
              ],
            },
          ],
        },
        tableConfig: {
          hasIndex: true,
          hasSelection: true,
          rowKey: 'id',
          modal: {
            modalConfig: {
              title: '',
              footer: {},
              onBeforeSubmit: 'console.log("onbeforeSubmit");',
              onAfterSubmit: 'console.log("onaftersubmit");',
            },
            formConfig: {
              formLabelWidth: '90px',
            },
          },
          onBeforeInitData: `console.log('onBeforeInitData：在初始化数据前执行');`,
          convertTableData: 'return data;',
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
                md: 12,
                lg: 12,
                xl: 12,
                required: true,
              },
            },
            {
              label: '性别',
              prop: 'sex',
              convert: "return row?.sex === 0 ? '男' : '女'",
              minWidth: '80px',
              addEditInfo: {
                type: 'select',
                defaultValue: null,
                addSort: 2,
                placeholder: '请选择',
                span: 12,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
                defaultOptions: [
                  { label: '男', value: 0 },
                  { label: '女', value: 1 },
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
                md: 12,
                lg: 12,
                xl: 12,
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
                api: api.getRoleList,
                valueKey: 'id',
                labelField: 'roleName',
                valueField: 'id',
                span: 12,
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
                required: true,
                convert: 'return fieldValue && fieldValue.id',
              },
            },
          ],
          actionColumn: {
            label: '操作',
            width: '400px',
            hasRowDeleteAction: true,
            hasRowEditAction: true,
            buttons: [
              {
                label: '弹窗1',
                hide: false,
                type: 'primary',
                icon: 'Refresh',
                onClick:
                  "refModals && refModals['modal1'] && refModals['modal1'].open(params.row);",
              },
              {
                label: '弹窗2',
                hide: false,
                type: 'primary',
                icon: 'Refresh',
                onClick: "refModals && refModals['modal2'] && refModals['modal2'].open();",
              },
              {
                label: '表单弹窗1',
                hide: false,
                type: 'primary',
                icon: 'Refresh',
                onClick:
                  "refModals && refModals['refFormModal1'] && refModals['refFormModal1'].open();",
              },
              {
                label: '表单弹窗2',
                hide: false,
                type: 'primary',
                icon: 'Refresh',
                onClick:
                  "refModals && refModals['refFormModal2'] && refModals['refFormModal2'].open();",
              },
            ],
          },
        },
        requestConfig: {
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
        },
        pageConfig: {},
      },

      modalsConfig: [
        {
          refName: 'modal1',
          width: '300px',
          title: '测试自定义modal内容',
          show: false,
          closeInModal: true,
          conmponentName: 'my-c1',
          methods: [{ name: 'clickMethod', props: '', body: `console.log(this.data)` }],
          template: `<div style="width: 100%; text-align: center; height: 300px;
                display: flex; align-items:center;justify-content: center;">
                <el-button type="primary" @click="clickMethod">弹窗1 </el-button>
                <div>name: {{this.data?.name}}</div>
                
            </div>`,
        },
        {
          refName: 'modal2',
          width: '300px',
          title: '测试自定义modal内容',
          show: false,
          closeInModal: true,
          conmponentName: 'my-c2',
          methods: [
            {
              name: 'clickMethod',
              props: '',
              body: `console.log('hello world')`,
            },
          ],
          template: `<div style="width: 100%; text-align: center; height: 300px;
                display: flex; align-items:center;justify-content: center;"><el-button type="primary" @click="clickMethod">弹窗2 </el-button></div>`,
        },
      ],

      formModalsConfig: [
        {
          refName: 'refFormModal1',
          modalConfig: {
            show: false,
            width: '300px',
            closeInModal: true,
            footer: {
              hasCancelButton: true,
              hasSubmitButton: true,
            },
          },
          formConfig: {
            fields: [
              { prop: 'test', label: '测试', type: 'input', span: 12 },
              {
                prop: 'test1',
                label: '测试1',
                type: 'select',
                span: 12,
                convert: 'return 111',
                defaultOptions: [
                  { label: '测试1', value: '测试1' },
                  { label: '测试2', value: '测试2' },
                ],
              },
            ],
          },
          model: {},
          convertedModel: {},
        },
        {
          refName: 'refFormModal2',
          modalConfig: {
            show: false,
            closeInModal: true,
          },
          formConfig: {
            fields: [
              { prop: 'test', label: '测试', type: 'input', span: 12 },
              {
                prop: 'test1',
                label: '测试1',
                type: 'select',
                span: 12,
                convert: 'return 111',
                defaultOptions: [
                  { label: '测试1', value: '测试1' },
                  { label: '测试2', value: '测试2' },
                ],
              },
            ],
          },
          model: {},
          convertedModel: {},
        },
      ],
    };
    pageSetting.value = JSON.parse(JSON.stringify(pageConfig));
  });
</script>
