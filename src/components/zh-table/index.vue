<template>
  <div class="zh-table">
    <ZhForm
      class="zh-form"
      v-if="useSearchForm"
      v-model="form.formModel"
      :form-settings="formSettings"
    >
      <!-- 按钮相关部分: 内置按钮事件 -->
      <el-form-item
        class="zh-table-inline-button"
        label-width="0px"
        v-if="formSettings?.hasSearchButton"
      >
        <el-button type="primary" :icon="Search" @click="() => table.initData()"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item
        class="zh-table-inline-button"
        label-width="0px"
        v-if="formSettings?.hasAddButton"
      >
        <el-button type="primary" :icon="Search" @click="modalInstance.openAddModal"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item
        class="zh-table-inline-button"
        label-width="0px"
        v-if="formSettings?.hasDeleteButton"
      >
        <el-button type="danger" :icon="Delete" @click="table.batchDelete"
          >批量删除</el-button
        >
      </el-form-item>
    </ZhForm>

    <!-- table部分：配置文件对象 tableSettings  -->
    <el-table
      ref="refTable"
      class="zh-el-table"
      :data="table.data.value"
      size="small"
      :height="tableSettings.height || '100%'"
      :highlight-current-row="tableSettings.highlightCurrentRow"
      v-loading="table.loading.value"
      :row-key="tableSettings.rowKey"
      @row-click="table.rowClick"
    >
      <el-table-column
        v-if="tableSettings.hasSelection"
        type="selection"
        width="50"
        align="center"
        reserve-selection
      ></el-table-column>

      <el-table-column
        v-if="tableSettings.hasIndex"
        type="index"
        width="60"
        label="序号"
        align="center"
      ></el-table-column>

      <el-table-column
        v-for="(item, index) in table.columns.value"
        :key="'table-column' + index + (item.editable ? '-editable' : '')"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align ? item.align : 'center'"
        :label="item.label"
        :prop="item.prop"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :class-name="item.className"
      >
        <template #default="scope">
          <span v-if="item.convert">{{
            item.convert(scope.row, scope.$index)
          }}</span>

          <span v-else-if="item.format">{{
            scope.row[item.prop as string] &&
            moment(scope.row[item.prop as string]).format(item.format)
          }}</span>

          <!-- 自定义内容 -->
          <template v-else-if="item.useSlot">
            <slot
              :name="'table-' + item.prop"
              :row="scope.row"
              :index="scope.$index"
              :label="item.label"
            />
          </template>

          <span v-else>
            {{
              scope.row[item.prop as string] === undefined ||
              scope.row[item.prop as string] === null
                ? item.nullValue
                : scope.row[item.prop as string]
            }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="tableSettings.actionColumn"
        :fixed="tableSettings.actionColumn?.fixed"
        :width="tableSettings.actionColumn?.width"
        :min-width="tableSettings.actionColumn?.minWidth"
        :label="tableSettings.actionColumn?.label"
        :align="
          tableSettings.actionColumn?.align
            ? tableSettings.actionColumn.align
            : 'center'
        "
      >
        <template #default="scope">
          <el-button
            v-if="tableSettings.actionColumn?.hasRowEditAction"
            link
            type="primary"
            size="small"
            :icon="Edit"
            @click.stop="modalInstance.openEditModal(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="tableSettings.actionColumn?.hasRowDeleteAction"
            link
            type="danger"
            size="small"
            :icon="Delete"
            @click.stop="table.rowDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            v-for="(item, buttonIndex) in tableSettings.actionColumn.buttons"
            :key="buttonIndex"
            link
            v-show="!item?.hide"
            :type="item?.type"
            :size="item?.size ? item.size : 'small'"
            :icon="item?.icon"
            :style="item?.style"
            @click.stop="item?.onClick && item?.onClick(scope.row, scope.$index)"
            >{{ item.label }}</el-button
          >
        </template>
      </el-table-column>

      <template v-slot:empty>
        <slot name="table-empty"></slot>
      </template>
    </el-table>

    <!-- page部分： 配置文件对象 pageSettings -->
    <el-pagination
      v-if="usePage"
      class="zh-table-pagination"
      :page-sizes="page?.sizes.value"
      :pager-count="page?.pagerCount.value"
      :layout="page?.layout.value"
      :total="pageData.total"
      v-model:currentPage="pageData.current"
      v-model:page-size="pageData.size"
      @current-change="page?.handleCurrentChange"
      @size-change="page?.handleCurrentChange"
    />

    <ZhFormModal
      ref="refZHFormModal" 
      :modal="modalInstance.modal.value" 
      v-model="modalInstance.formModel.value" 
      :formSettings="modalInstance.formSettings.value"
      @cancel="modalInstance.cancel"
      @close="modalInstance.close"
      @submit="modalInstance.submit"
    ></ZhFormModal>
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType, computed, ref, reactive, Ref, watch } from 'vue';
import { RefreshLeft, Search, Delete, Download, 
  DocumentChecked, Refresh, Upload, Edit } from '@element-plus/icons-vue';
import moment from 'moment';
import ZhForm from '../zh-form/index.vue';
import ZhFormModal from '../zh-form-modal/index.vue';
import { ElTable } from 'element-plus';
import { TPageSetting, TRequest, TTableSetting, TPage, TTableFormSettings } from './type';
import Page from './page';
import Table from './table';
import Form from './form';
import Modal from './modal';
import { TFormSettings } from '../zh-form/type';

const props = defineProps({
  useSearchForm: {
    type: Boolean,
    required: false,
  },

  formSettings: {
    type: Object as PropType<TTableFormSettings>,
    required: false, // 必传
  },

  tableSettings: {
    type: Object as PropType<TTableSetting>,
    required: true, // 必传
  },

  usePage: {
    type: Boolean,
    required: false,
  },

  pageSettings: {
    type: Object as PropType<TPageSetting>,
    required: false,
  },

  request: {
    type: Object as PropType<TRequest>,
    required: false,
  },

  addModalFormSettings: {
    type: Object as PropType<TFormSettings>,
    required: false,
  },
});

const {
  useSearchForm,
  formSettings,
  tableSettings,
  usePage,
  pageSettings,
  request,
  addModalFormSettings
} = toRefs(props);

//#region common
// 分页的组件内部数据
const pageData: Ref<TPage> = ref({
  total: 0,
  current: 1,
  size: 20,
});
//#endregion

//#region search form
const form = new Form(pageData, request, formSettings);
form.init();
const watchFormModel = computed(() => JSON.parse(JSON.stringify(form.formModel.value)));
watch(watchFormModel, (newVal:any, oldVal: any) => {
  console.log(newVal);
  console.log(oldVal);
});
//#endregion

//#region table
const refTable = ref<InstanceType<typeof ElTable>>();
const table = new Table(tableSettings, refTable, request, form, pageData);
//#endregion

//#region page
let page: undefined | Page;
// console.log('usePage', usePage.value);
if (usePage.value) page = new Page(pageSettings?.value, pageData, table);
//#endregion

//#region add/edit modal
const refZHFormModal = ref();
const modalInstance = new Modal(addModalFormSettings as Ref<TFormSettings>, request, table, refZHFormModal);
//#endregion

defineExpose({
  initData: table.initData,
  getData: table.getData,
  getDataAsync: table.getDataAsync,

});
</script>

<script lang="ts">
export default { name: 'ZHTable' };
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
