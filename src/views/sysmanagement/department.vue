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
          hasDeleteButton: false,
          hasUploadButton: false,
          hasExportButton: false,
          hasResetButton: false,
          customModel: {},
          formLabelWidth: '70px',
          fields: [
            {
              label: '部门名称',
              type: 'input',
              prop: 'phone',
              maxWidth: '220px',
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
              maxWidth: '220px',
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
          hasIndex: false,
          hasSelection: false,
          rowKey: 'id',
          convertTableData: 'return $utils.DataHelper.convertArrayToTree(data)',
          // convertTableData: (data:any) =>  { return $utils.DataHelper.convertArrayToTree(data); },
          modal: {
            width: '500px',
            mainTitle: '部门',
            destroyOnClose: true,
            footer: {},
            formSettings: {
              formLabelWidth: '130px',
            },
            onBeforeSubmit: 'console.log("onbeforeSubmit");',
            onAfterSubmit: 'console.log("onaftersubmit");',
            onOpened: 'console.log("窗口已打开");',
          },
          columns: [
            {
              label: '上一级部门',
              prop: 'departmentParent',
              notDisplay: true,
              align: 'left',
              minWidth: '130px',
              addEditInfo: {
                type: 'select',
                addSort: 0.5,
                placeholder: '请选择',
                defaultOptions: [
                  { label: '部门1', value: '1' },
                  { label: '部门2', value: '2' },
                ],
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: false,
              },
            },
            {
              label: '部门名称',
              prop: 'departmentName',
              allowCellEdit: false,
              align: 'left',
              minWidth: '100px',
              addEditInfo: {
                type: 'input',
                addSort: 1,
                defaultValue: '',
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: true,
              },
            },
            {
              label: '排序',
              prop: 'sort',
              minWidth: '80px',
              addEditInfo: {
                type: 'input',
                inputType: 'number',
                defaultValue: null,
                addSort: 2,
                placeholder: '请输入',
                span: 24,
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                // options: [{ label: '男', value: 1 }, { label: '女', value: 2 }], required: false,
              },
            },
            {
              label: '状态',
              prop: 'status',
              // convert: `return row?.status === 0 ? \'启用\' : \'禁用\'`,
              slot: {
                name: 'zh-table-status',
                props: { row: {}, index: {}, label: {} },
                template: `
                            <el-tag type="danger" v-if="row.status === 0">禁用</el-tag>
                            <el-tag type="success" v-else>启用</el-tag>
                            `,
              },
              minWidth: '80px',
              addEditInfo: {
                type: 'select',
                addSort: 2,
                placeholder: '请选择',
                span: 24,
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                defaultOptions: [
                  { label: '启用', value: '启用' },
                  { label: '禁用', value: '禁用' },
                ],
                required: true,
              },
            },
            {
              label: '备注',
              prop: 'comment',
              addEditInfo: {
                addSort: 3,
                type: 'input',
                inputType: 'textarea',
                span: 24,
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: false,
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
                label: '新增子节点',
                hide: false,
                type: 'success',
                icon: 'Plus',
                onClick: `params.modal.executeOpenAddModal({ title: '新增子节点', departmentParent: params.row.id, comment: params.row.comment }, params.row);
                        `,
              },
            ],
          },
        },
        requestConfig: {
          list: {
            url: api.getDepartmentList,
            successMessage: '查询成功',
            errorMessage: '查询失败',
          },
          add: {
            url: api.addDepartment,
            successMessage: '新增成功',
            errorMessage: '新增失败',
          },
          update: {
            url: api.updateDepartment,
            successMessage: '更新成功',
            errorMessage: '更新失败',
          },
          delete: {
            url: api.deleteDepartment,
            successMessage: '删除成功',
            errorMessage: '删除失败',
          },
          batchDelete: {
            url: api.batchDeleteDepartment,
            successMessage: '批量删除成功',
            errorMessage: '批量删除失败',
          },
        },
        pageConfig: {},
      },
    };
    pageSetting.value = JSON.parse(JSON.stringify(pageConfig));
    // pageSetting.value = pageConfig;
  });
</script>

<script lang="ts">
  export default { name: 'department' };
</script>
