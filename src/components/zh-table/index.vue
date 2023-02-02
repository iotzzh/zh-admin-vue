<template>
  <div class="zh-table">
    <ZHForm ref="refZHForm" class="zh-form"
      :style="{ maxHeight: isMobile ? '50%' : '', height: isMobile ? '190px' : 'auto', overflow: isMobile ? 'auto' : '' }" v-if="useSearchForm"
      v-model="form.formModel" v-model:converted-model="form.convertedFormModel" :form-settings="formSettings">
      <!-- 传递form默认插槽 -->
      <template #default>
        <slot name="zh-table-form-default-before"></slot>
        <ZHFormButtons :form="form" :table="table" :formSettings="formSettings" :modalInstance="modalInstance">
        </ZHFormButtons>
        <slot name="zh-table-form-default-after"></slot>
      </template>

      <!-- 传递form带字段名的插槽 -->
      <template v-for="item in sloTFromFields" v-slot:[form._convertSlotName(item.prop)]>
        <slot :name="'zh-table-form-' + item.prop"></slot>
      </template>

      <!-- 传递form下一行的插槽 -->
      <template v-slot:zh-form-next-row>
        <slot name="zh-table-form-next-row"></slot>
      </template>
    </ZHForm>

    <!-- table设置行部分：配置文件对象 tableSettingPanel -->
    <div class="zh-table-panel-setting" v-if="tableSettings.tablePanelSetting">
      <el-row>
        <el-col :span="12">
          <div class="table-title">
            <el-icon v-if="tableSettings.tablePanelSetting.title">
              <Grid />
            </el-icon>
            {{ tableSettings.tablePanelSetting.title }}
            <span v-if="tableSettings.tablePanelSetting.secondaryTitle" style="color: blue">
              ({{ tableSettings.tablePanelSetting.secondaryTitle }})
            </span>
          </div>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <div class="table-title">
            <el-icon v-if="tableSettingPanel.tableTitle">
              <help />
            </el-icon>
            {{ tableSettingPanel.tableTitle }}
            <span v-if="tableSettingPanel.secondaryTitle" style="color: blue">({{ tableSettingPanel.secondaryTitle
            }})</span>
          </div>
        </el-col>
        <el-col :span="12" class="setting-panel right">
          <span class="export-setting" v-if="tableSettingPanel.showExportSettingButton" @click="clickExportSetting">
            <el-icon>
              <Setting />
            </el-icon>导出设置
          </span>
          <span class="display-setting" v-if="tableSettingPanel.showDisplaySettingButton" @click="clickDisplaySetting">
            <el-icon>
              <Setting />
            </el-icon>显示设置
          </span>
        </el-col>
      </el-row> -->

      <!-- <i class="el-icon-s-tools setting-define-columns" @click="openDefineColumnsModal">定制列</i> -->
    </div>

    <!-- table部分：配置文件对象 tableSettings  -->
    <el-table ref="refTable" class="zh-el-table" :data="table.data.value" size="default"
      :height="tableSettings.height || '100%'" :highlight-current-row="tableSettings.highlightCurrentRow"
      v-loading="table.loading.value" :row-key="tableSettings.rowKey === undefined ? 'id' : tableSettings.rowKey"
      @row-click="table.rowClick" :tree-props="tableSettings.treeProps" :lazy="tableSettings.lazy" :load="table.load"
      :default-expand-all="tableSettings.defaultExpandAll" :border="tableSettings.border === undefined ? true : tableSettings.border">

      <el-table-column v-if="tableSettings.hasSelection" type="selection" width="50" align="center" reserve-selection>
      </el-table-column>

      <el-table-column v-if="tableSettings.hasIndex" type="index" width="60" label="序号" align="center">
      </el-table-column>

      <el-table-column v-for="(item, index) in table.columns.value" :key="index" :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''" :align="item.align ? item.align : 'center'" :label="item.label"
        :prop="item.prop" :fixed="item.fixed" :sortable="item.sortable" :class-name="item.className">
        <template #default="scope">
          <span class="cell-content-box" @mouseover="(e: any) => {
            if (item.allowCellEdit) table.cellContentOver(scope);
          }" @mouseleave="(e: any) => table.cellContentLeave(scope)">

            <span class="cell-content" v-if="!table.cellCanShowSaveCancel(scope)">
              <span v-if="item.convert">{{
                item.convert(scope.row, scope.$index)
              }}</span>

              <span v-else-if="item.format">{{
                scope.row[item.prop as string] &&
                  dayjs(scope.row[item.prop as string]).format(item.format)
              }}</span>

              <!-- 自定义内容 -->
              <template v-else-if="item.useSlot">
                <slot :name="'zh-table-' + item.prop" :row="scope.row" :index="scope.$index" :label="item.label" />
              </template>

              <span v-else>
                {{
                  scope.row[item.prop as string] === undefined ||
                    scope.row[item.prop as string] === null
                    ? item.nullValue
                    : scope.row[item.prop as string]
                }}
              </span>
            </span>

            <span v-else class="cell-content-edit" style="display: inline-block; width: calc(100% - 36px)">
              <!-- 输入框 -->
              <el-input v-if="item.addEditInfo?.type === 'input'"
                v-model="scope.row[table._convertPropToEditingProp(item.prop as string)]"
                :type="item.addEditInfo?.inputType" :clearable="item.addEditInfo?.clearable"></el-input>

              <!-- 下拉 -->
              <el-select v-else-if="item.addEditInfo?.type === 'select'"
                v-model="scope.row[table._convertPropToEditingProp(item.prop as string)]"
                :style="{ width: item.addEditInfo?.width ? `${item.addEditInfo?.width}` : '100%' }"
                :value-key="item.addEditInfo?.valueKey" :disabled="item.addEditInfo?.disabled"
                :multiple="item.addEditInfo?.multiple" filterable clearable :remote="item.addEditInfo?.remote"
                :remote-method="item.addEditInfo?.remoteMethod" :placeholder="
                  item.addEditInfo?.placeholder
                    ? item.addEditInfo?.placeholder
                    : item.addEditInfo?.remoteMethod
                      ? '请输入选择'
                      : '请选择'
                ">
                <el-option
                  v-for="(subItem, subIndex) in (item.addEditInfo?.options as Array<TZHFromFieldSelectOption> | Array<{ [x: string]: any }>)"
                  :key="item.addEditInfo?.valueKey ? subItem[item.addEditInfo?.valueKey] : subIndex"
                  :label="subItem.label" :value="item.addEditInfo?.valueKey ? subItem : subItem.value"></el-option>
              </el-select>
            </span>

            <span>
              <el-button v-show="table.cellCanShowEdit(scope)" link type="primary" size="small" :icon="Edit"
                @click="() => table.clickInlineEdit(scope)"></el-button>
              <span v-show="table.cellCanShowSaveCancel(scope)">
                <el-button link type="success" size="small" :icon="Select" @click="table.clickInlineSave(scope)">
                </el-button>
                <el-button link type="danger" size="small" :icon="CloseBold" @click="table.clickInlineCancel(scope)">
                </el-button>
              </span>
            </span>
          </span>
        </template>
      </el-table-column>

      <el-table-column v-if="tableSettings.actionColumn"
        :fixed="isMobile ? undefined : tableSettings.actionColumn?.fixed" :width="tableSettings.actionColumn?.width"
        :min-width="tableSettings.actionColumn?.minWidth" :label="tableSettings.actionColumn?.label" :align="
          tableSettings.actionColumn?.align
            ? tableSettings.actionColumn.align
            : 'center'
        ">
        <template #default="scope">
          <el-button 
            v-if="tableSettings.actionColumn?.hasRowEditAction" 
            v-show="tableSettings.actionColumn?.displayRowEditActionMethod === undefined ? true : !!tableSettings.actionColumn?.displayRowEditActionMethod(scope.row)"
            link 
            type="primary" 
            size="small" 
            :icon="Edit"
            @click.stop="modalInstance.openEditModal(scope.row)">编辑</el-button>
          <el-button v-if="tableSettings.actionColumn?.hasRowDeleteAction" link type="danger" size="small"
          v-show="tableSettings.actionColumn?.displayRowDeleteActionMethod === undefined ? true : !!tableSettings.actionColumn?.displayRowDeleteActionMethod(scope.row)"
            :icon="Delete" @click.stop="table.rowDelete(scope.row)">删除</el-button>

          <el-button v-for="(item, buttonIndex) in tableSettings.actionColumn.buttons" :key="buttonIndex" link
            v-show="(item?.hide === undefined ? true : !item?.hide) && (item?.displayMethod === undefined ? true : !!item?.displayMethod(scope.row))"
            :type="item?.type" :size="item?.size ? item.size : 'small'" :icon="item?.icon" :style="item?.style"
            @click.stop="item?.onClick && item?.onClick(scope.row, scope.$index)">{{ item.label }}
          </el-button>
        </template>
      </el-table-column>

      <template v-slot:empty>
        <slot name="table-empty"></slot>
      </template>
    </el-table>

    <!-- page部分： 配置文件对象 pageSettings -->
    <el-pagination v-if="usePage" class="zh-table-pagination" :page-sizes="page?.sizes.value"
      :pager-count="page?.pagerCount.value" :layout="page?.layout.value" :total="pageData.total"
      v-model:currentPage="pageData.current" v-model:page-size="pageData.size"
      @current-change="page?.handleCurrentChange" @size-change="page?.handleCurrentChange" />

    <ZhModalForm ref="refZhModalForm" :modal="modalInstance.modal.value" v-model="modalInstance.formModel.value"
      v-model:converted-model="modalInstance.convertedModel.value" :formSettings="modalInstance.formSettings.value"
      @cancel="modalInstance.cancel" @close="modalInstance.close" @submit="modalInstance.submit" @opened="modalInstance.opened"></ZhModalForm>
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType, computed, ref, reactive, Ref, watch, onMounted, nextTick } from 'vue';
import { RefreshLeft, Search, Delete, Download, DocumentChecked, Refresh, Upload, Edit, CloseBold, Select } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import ZHForm from '../zh-form/index.vue';
import ZhModalForm from '../zh-modal-form/index.vue';
import ZHFormButtons from './form-buttons.vue';
import { ElTable } from 'element-plus';
import { TZHTablePageSetting, TZHTableRequest, TZHTableSetting, TZHTablePage, TZHTableFormSettings } from './type';
import Page from './page';
import Table from './table';
import Form from './form';
import Modal from './modal';
import { TZHFromField, TZHFormSettings, TZHFromFieldSelectOption } from '../zh-form/type';
import storage from '@/utils/storage';

const props = defineProps({
  useSearchForm: {
    type: Boolean,
    required: false,
  },

  formSettings: {
    type: Object as PropType<TZHTableFormSettings>,
    required: false, // 必传
  },

  tableSettings: {
    type: Object as PropType<TZHTableSetting>,
    required: true, // 必传
  },

  usePage: {
    type: Boolean,
    required: false,
  },

  pageSettings: {
    type: Object as PropType<TZHTablePageSetting>,
    required: false,
  },

  request: {
    type: Object as PropType<TZHTableRequest>,
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
} = toRefs(props);

const refZHForm = ref();

const emit = defineEmits(['changeModel', 'opened']);


const isMobile = ref(storage.getIsMobile());

//#region common
// 分页的组件内部数据
const pageData: Ref<TZHTablePage> = ref({
  total: 0,
  current: 1,
  size: 20,
});
//#endregion

//#region search form
const form = new Form(pageData, request, formSettings, refZHForm);
const watchFormModel = computed(() => {
  return JSON.parse(JSON.stringify(form.formModel.value));
});
watch(
  () => watchFormModel.value,
  (newVal: { [x: string]: any }, oldVal: { [x: string]: any }) => {
    if (!form._compareNeedTriggerSearchFieldsIsEqual(newVal, oldVal)) {
      table.debounceInitData();
    }

    emit('changeModel', newVal);
  }, { immediate: false });

// 自定义插槽
const sloTFromFields = formSettings?.value?.fields?.filter((x: TZHFromField) => x.type === 'slot');
//#endregion

//#region table
const refTable = ref<InstanceType<typeof ElTable>>();
const table = new Table(tableSettings, refTable, request, form, pageData, emit);
onMounted(() => {
  if (request?.value && request.value.list?.url && (request.value.initialData || request.value.initialData === undefined))
    table.debounceInitData();
});
//#endregion

//#region page
let page: undefined | Page;
// console.log('usePage', usePage.value);
if (usePage.value) page = new Page(pageSettings?.value, pageData, table);
//#endregion

//#region add/edit modal
const refZhModalForm = ref();
const modalInstance = new Modal(request, table, refZhModalForm, tableSettings, emit);
//#endregion

defineExpose({
  // 表单
  getSearchFormModel: form.getSearchFormModel,
  setSearchFormModel: form.setSearchFormModel,
  getSearchFormParams: form.getSearchFormParams,
  // 弹窗
  openAddModal: modalInstance.openAddModal,
  setModalFormModel: modalInstance.setModalFormModel,
  // 表格
  debounceInitData: table.debounceInitData, // 防抖查询
  throttleInitData: table.throttleInitData, // 节流查询
  initData: table.initData, // 正常查询
  getData: table.getData, // 获取当前表格数据
  setData: table.setData,
  getDataAsync: table.getDataAsync, // 从接口获取表格数据，且不刷新表格
  getDataWithInitTable: table.getDataWithInitTable, // 获取接口数据，并刷新表格
  reloadTableTreeChild: table.reloadTableTreeChild,
});

</script>

<script lang="ts">
export default { name: 'ZHTable' };
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
