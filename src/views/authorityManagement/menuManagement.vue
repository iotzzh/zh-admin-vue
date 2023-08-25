<!-- 权限管理 - 菜单管理 -->
<template>
  <Table
    ref="refTable"
    :formSettings="formSettings"
    :tableSettings="tableSettings"
    :usePage="true"
    :request="request"
    @opened="opened"
  >
    <template v-slot:zh-table-form-test>
      <el-input placeholder="请输入自定义搜索" v-model="formSettings.customModel!.test"></el-input>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import Table from '@/components/zh-table/index.vue';
  import { TZHTableRequest, TZHTableForm, TZHTableSetting } from '@/components/zh-table/type';
  import { onMounted, reactive, ref } from 'vue';
  import api from '@/api/authorityManagement';
  import { TZHRequestParams } from '@/components/zh-request/type';
  import ZHRequest from '@/components/zh-request';

  const refTable = ref();
  const rootPermision = ref({} as any);

  const getSearchFormModel = () => {
    const model = refTable.value.getSearchFormModel();
    // console.log(model);
  };

  const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasDeleteButton: false,
    hasUploadButton: false,
    hasExportButton: false,
    hasResetButton: false,
    hideUnimportantFields: false,
    customModel: {},
    convertParams: (params: { [x: string]: any }) => {
      return {
        ...params,
        // convertParams: true,
      };
    },
    buttons: [
      // { label: '自定义按钮1', icon: 'Filter', method: () => { console.log('hello world'); }, style: 'color: pink; background-color: blue;' }
    ],
    formLabelWidth: '70px',
    fields: [{ label: '菜单名称', type: 'input', prop: 'routeName', width: '200px' }],
  } as TZHTableForm);

  const tableSettings = reactive({
    hasIndex: false,
    hasSelection: false,
    rowKey: 'id',
    lazy: true,
    treeProps: { children: 'children', hasChildren: 'id' },
    modal: {
      customModel: {},
      footer: {
        hasCancelButton: true,
        hasSubmitButton: true,
      },
      formLabelWidth: '90px',
      onBeforeSubmit: async (params: any) => {
        // if (params.conditions.menuType === 2) params.conditions.isSkip = true;
        // else params.conditions.isSkip = false;
      },
      onAfterSubmit: async (params: any) => {
        refTable.value && refTable.value.reloadTableTreeChild(params.conditions.parentId);
      },
    },
    validateLoad: (row: any) => {
      return row.menuType !== 1;
    },
    load: async (row: any, treeNode: unknown, resolve: (data: any[]) => void) => {
      resolve([]);
      // return [];
      // const apiParams: TZHRequestParams = {
      //     url: api.getPermisMenuChildList,
      //     conditions: {
      //         moduleId: row.id
      //     },
      //     errorMessage: '获取子节点数据失败',
      // };
      // const result = await ZHRequest.post(apiParams);
      // if (result.success) resolve(result.data[0] ? result.data[0].children : []);
    },
    columns: [
      {
        label: '菜单名称',
        prop: 'routeName',
        allowCellEdit: false,
        width: '200px',
        align: 'left',
        addEditInfo: {
          type: 'input',
          width: '100%',
          addSort: 1,
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
        label: '排序',
        prop: 'sortNo',
        notDisplay: false,
        addEditInfo: {
          type: 'input',
          inputType: 'number',
          addSort: 5,
          placeholder: '请输入',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      {
        label: 'URL',
        prop: 'url',
        width: '200px',
        addEditInfo: {
          type: 'input',
          width: '100%',
          addSort: 3,
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
          required: true,
        },
      },
      {
        label: '权限编码',
        prop: 'permsionCode',
        allowCellEdit: false,
        notDisplay: true,
        align: 'left',
        addEditInfo: {
          type: 'input',
          addSort: 2,
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
        label: '类型',
        prop: 'menuType',
        notDisplay: false,
        convert: (row: any) => {
          switch (row.menuType) {
            case 0:
              return '系统';
            case 1:
              return '目录';
            case 2:
              return '菜单';
            case 3:
              return '按钮';
            default:
              return '未知';
          }
        },
        addEditInfo: {
          type: 'select',
          addSort: 2,
          placeholder: '请输入',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
          required: true,
          options: [
            { label: '系统', value: 0 },
            { label: '目录', value: 1 },
            { label: '菜单', value: 2 },
            { label: '按钮', value: 3 },
          ],
        },
      },
      {
        label: '图标',
        prop: 'icon',
        notDisplay: false,
        addEditInfo: {
          type: 'input',
          addSort: 4,
          defaultValue: '',
          placeholder: '请输入',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      {
        label: '路由名',
        prop: 'routeName',
        notDisplay: false,
        addEditInfo: {
          type: 'input',
          addSort: 6,
          defaultValue: '',
          placeholder: '请输入',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      {
        label: '可跳转',
        prop: 'isSkip',
        notDisplay: false,
        convert: (row: any) => {
          return row.isSkip ? '是' : '否';
        },
        addEditInfo: {
          type: 'select',
          addSort: 8,
          defaultValue: true,
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
          options: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
        },
      },
      {
        label: '是否启用',
        prop: 'isEbl',
        convert: (row: any) => {
          return row.isEbl ? '是' : '否';
        },
        minWidth: '120px',
        addEditInfo: {
          type: 'switch',
          addSort: 9,
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24,
          options: [
            { label: '启用', value: true },
            { label: '不启用', value: false },
          ],
          defaultValue: true,
          activeValue: true,
          inactiveValue: false,
        },
      },
      {
        label: '文件路径',
        prop: 'filePath',
        notDisplay: false,
        width: '200px',
        addEditInfo: {
          width: '100%',
          type: 'input',
          addSort: 7,
          defaultValue: '',
          placeholder: '请输入',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
    ],
    actionColumn: {
      fixed: 'right',
      label: '操作',
      width: '215px',
      hasRowDeleteAction: true,
      displayRowEditActionMethod: (row: any) => row.menuType !== 3,
      hasRowEditAction: true,
      displayRowDeleteActionMethod: (row: any) => row.menuType !== 3,
      buttons: [
        {
          label: '新建子级菜单',
          type: 'success',
          icon: 'Plus',
          displayMethod: (row: any) => row.menuType !== 3,
          onClick: (row: any, index: any) => openAddModal(row),
        },
      ],
    },
  } as TZHTableSetting);

  onMounted(() => {
    // getCalRootPermissionId();
  });

  const request = ref({
    list: {
      url: api.getRouteList,
      successMessage: '查询成功',
      errorMessage: '查询失败',
    },
    add: {
      url: api.addMenu,
      successMessage: '新增成功',
      errorMessage: '新增失败',
    },
    update: {
      url: api.updateMenu,
      successMessage: '更新成功',
      errorMessage: '更新失败',
    },
    delete: {
      url: api.deleteMenu,
      successMessage: '删除成功',
      errorMessage: '删除失败',
    },
    batchDelete: {
      url: api.batchDeleteMenu,
      successMessage: '批量删除成功',
      errorMessage: '批量删除失败',
    },
  } as TZHTableRequest);

  // const getCalRootPermissionId = async () => {
  //     const apiParams: TZHRequestParams = {
  //         url: api.getCalRootPermissionId,
  //         conditions: {},
  //         errorMessage: '获取根目录数据失败',
  //     };
  //     const result = await ZHRequest.post(apiParams);
  //     if (result.success) rootPermision.value = result.data;
  // };

  const openAddModal = (row: any) => {
    refTable.value && refTable.value.openAddModal(row);
  };

  const opened = async (params: any) => {
    if (params.modal.type === 'add') {
      if (!params.openAddModalData) {
        refTable.value.setModalFormModel({ parentId: rootPermision.value.id });
      } else {
        refTable.value.setModalFormModel({
          parentId: params.openAddModalData.id,
        });
      }
    } else {
      const modelWithoutChild = JSON.parse(JSON.stringify(params.openEditModalData));
      modelWithoutChild.children = null;
      refTable.value.setModalFormModel({ ...modelWithoutChild });
    }
  };
</script>

<script lang="ts">
  export default { name: 'menuManagement' };
</script>

<style lang="scss" scoped></style>
