<template>
  <div class="hs-table">
    <!-- form部分： 配置文件对象 formSetting -->
    <el-form
      class="hs-table-el-form"
      v-if="formSettings.useSearchForm"
      ref="form"
      :model="formSettings.formModel"
      :label-width="formSettings.labelWidth || 'auto'"
      type="flex"
      inline
      justify="end"
      style="flex-wrap: wrap; flex-direction: row"
    >
      <el-form-item
        v-for="(item, index) in formSettings.fields"
        :key="'form-item' + index"
        :label="item.label"
        :prop="item.prop"
        :label-width="item.labelWidth"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'input'"
          :style="{ width: item.width ? `${item.width}` : '215px' }"
          v-model="formSettings.formModel[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :type="item.inputType"
          clearable
        ></el-input>

        <!-- 下拉 -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formSettings.formModel[item.prop]"
          :style="{ width: item.width ? `${item.width}` : '215px' }"
          :disabled="item.disabled"
          :value-key="item.valueKey"
          filterable
          clearable
          :multiple="item.multiple"
          :remote="item.remote"
          :remote-method="item.remoteMethod"
          @change="item.changeMethod"
          :placeholder="item.placeholder ? item.placeholder : item.remoteMethod ? '请输入选择' : '请选择'"
        >
          <el-option
            v-for="(subItem, subIndex) in item.options"
            :key="subIndex"
            :label="subItem.label"
            :value="subItem.value"
          ></el-option>
        </el-select>

        <!-- 日期控件 -->
        <el-date-picker
          v-else-if="item.type === 'date-picker'"
          v-model="formSettings.formModel[item.prop]"
          :disabled="item.disabled"
          :type="item.timeType"
          :format="item.timeShowFormat"
          :value-format="item.timeValueFormat"
          :placeholder="item.placeholder"
          :style="{ width: item.width ? `${item.width}` : '215px' }"
          :clearable="item.clearable"
        ></el-date-picker>

        <!-- 级联选择器  -->
        <el-cascader
          v-else-if="item.type === 'cascader'"
          v-model="formSettings.formModel[item.prop]"
          :options="item.options"
          :props="item.props"
          clearable
        />

        <!-- 单选框组 -->
        <el-radio-group
          v-else-if="item.type === 'radio-group'"
          v-model="formSettings.formModel[item.prop]"
        >
          <el-radio
            v-for="(subItem, subIndex) in item.options"
            :key="subIndex"
            :label="subItem.label"
          >{{ subItem.text }}</el-radio>
        </el-radio-group>

        <!-- 多选框 -->
        <el-checkbox
          v-else-if="item.type === 'checkbox'"
          v-model="formSettings.formModel[item.prop]"
          :label="item.labelTxt"
          :disabled="item.disabled"
          @change="item.changeMethod"
        />

        <!-- 自定义筛选内容 -->
        <template v-else-if="item.type === 'slot'">
          <slot :name="'form-' + item.prop" />
        </template>
      </el-form-item>

      <!-- 按钮相关部分: 内置按钮事件 -->
      <el-form-item
        class="hs-table-inline-button"
        label-width="0px"
        v-if="formSettings.hasSearchButton"
      >
        <el-button type="primary" :icon="Search" @click="clickSearch">查询</el-button>
      </el-form-item>

      <el-form-item
        class="hs-table-inline-button"
        label-width="0px"
        v-if="formSettings.hasResetButton"
      >
        <el-button type="info" :icon="RefreshLeft" @click="clickReset">重置</el-button>
      </el-form-item>

      <el-form-item
        class="hs-table-inline-button"
        label-width="0px"
        v-if="formSettings.hasImportButton"
      >
        <!-- <el-button type="warning" :icon="Upload" @click="download">导入</el-button> -->
        <el-upload
          ref="uploadRef"
          class="upload"
          :name="formSettings.upload && formSettings.upload.name"
          :action="formSettings.upload && formSettings.upload.api"
          :data="formSettings.upload && formSettings.upload.data"
          :headers="formSettings.upload && formSettings.upload.headers"
          :show-file-list="false"
          :before-upload="formSettings.upload && formSettings.upload.beforeUpload"
          :on-progress="onProgress"
          :on-success="uploadSuccess"
          :on-error="uploadError"
        >
          <el-button type="warning" :icon="Upload" :loading="loadingUpload">{{ loadingUpload ? '正在上传' : '上传' }}</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item
        class="hs-table-inline-button"
        label-width="0px"
        v-if="formSettings.hasExportButton"
      >
        <!-- <el-button type="warning" :icon="Download" @click="download">
          <a href="http://www.baidu.com">导出</a>
        </el-button> -->
        <a download :href="formSettings.export && formSettings.export.url" class="download"><el-icon><Download/></el-icon> 导出</a>
      </el-form-item>

      <el-form-item
        class="hs-table-inline-button"
        label-width="0px"
        v-if="formSettings.hasSaveButton"
      >
        <el-button type="success" :icon="DocumentChecked" @click="clickSave">保存</el-button>
      </el-form-item>

      <el-form-item
        class="hs-table-inline-button"
        label-width="0px"
        v-if="formSettings.hasCancelButton"
      >
        <el-button type="info" :icon="Refresh" @click="clickCancel">取消</el-button>
      </el-form-item>

      <!-- 按钮相关部分: 自定义按钮事件 -->
      <template v-if="formSettings.actions && formSettings.actions.length > 0">
        <el-form-item
          class="hs-table-defined-button"
          :class="formSettings.actionsNeedNewRow ? 'actions-to-right' : ''"
          label-width="0px"
          v-for="(item, buttonIndex) in formSettings.actions"
          :key="buttonIndex"
        >
          <template v-if="item.type === 'slot'">
            <slot :name="'search-form-action-' + item.prop" />
          </template>

          <el-button
            v-else
            :key="buttonIndex"
            :disabled="item.disabled"
            :type="item.type"
            :size="item.size ? item.size : 'default'"
            :icon="item.icon"
            :plain="item.plain"
            :style="item.style"
            @click="handleFormActionButton(item.method)"
          >{{ item.label }}</el-button>
        </el-form-item>
      </template>

      <el-form-item
        v-for="(item, index) in formSettings.headActions"
        :key="'search-form-head' + index"
      >
        <template v-if="item.type === 'slot'">
          <slot :name="'search-form-head-action-' + item.prop" />
        </template>
      </el-form-item>
    </el-form>

    <!-- table设置行部分：配置文件对象 tableSettingPanel -->
    <div class="setting" v-if="tableSettingPanel && tableSettingPanel.showTableSettingPanel">
      <el-row>
        <el-col :span="18">
          <div class="table-title">
            <el-icon>
              <help />
            </el-icon>
            {{ tableSettingPanel.tableTitle }}
            <span
              v-if="tableSettingPanel.secondaryTitle"
              style="color: blue;"
            >({{ tableSettingPanel.secondaryTitle }})</span>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>

      <!-- <i class="el-icon-s-tools setting-define-columns" @click="openDefineColumnsModal">定制列</i> -->
    </div>

    <!-- table部分：配置文件对象 tableSettings  -->
    <el-table
      ref="refTable"
      class="hs-el-table"
      :data="data"
      :height="tableSettings.height"
      :highlight-current-row="tableSettings.highlightCurrentRow"
      border
      v-loading="loading"
      :default-expand-all="tableSettings.defaultExpandAll"
      :row-key="tableSettings.rowKey"
      @row-click="(row, column, event) => tableRowClick(tableSettings, row, column, event)"
      @row-dblclick="(row, column, event) => tableRowDBClick(tableSettings, row, column, event)"
      @cell-dblclick="(row, column, event) => tableCellDblClick(tableSettings, row, column, event)"
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
        v-for="(item, index) in tableSettings.columns"
        :key="'table-column' + index + (item.editable ? '-editable' : '')"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align ? item.align : 'center'"
        :label="item.label"
        :prop="item.prop"
        :fixed="item.fixed"
        :sortable="item.sortable === undefined ? true : item.sortable"
        :class-name="item.className"
      >
        <template #default="scope">
          <span v-if="canEdit(tableSettings.rowKey || '', scope.row, item)">
            <el-input v-model="scope.row[item.prop]"></el-input>
          </span>

          <span v-else-if="item.convertText">{{ item.convertText(scope.row, scope.$index) }}</span>

          <span
            v-else-if="item.timeFormat"
          >{{ scope.row[item.prop] && moment(scope.row[item.prop]).format(item.timeFormat) }}</span>

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
              scope.row[item.prop] === undefined || scope.row[item.prop] === null ? item.nullValue : scope.row[item.prop]
            }}
          </span>
        </template>

        <template v-slot:header="scope">
          <slot
            v-if="item.useHeaderSlot"
            :name="'table-header-' + item.prop"
            :row="scope.row"
            :index="scope.$index"
          />
          <span v-else>{{ item.label }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="tableSettings.needOperations"
        :fixed="tableSettings.operationSettings?.fixed"
        :width="tableSettings.operationSettings?.width"
        :min-width="tableSettings.operationSettings?.minWidth"
        :label="tableSettings.operationSettings?.label"
        :align="tableSettings.operationSettings?.align ? tableSettings.operationSettings.align : 'center'"
      >
        <template #default="scope">
          <el-button
            v-for="(item, buttonIndex) in tableSettings.operations"
            :key="buttonIndex"
            v-show="item.displayMethod ? displayActionButton(item.displayMethod, scope.row, buttonIndex) : true"
            :type="item.type"
            :size="item.size ? item.size : 'small'"
            :icon="item.icon"
            :style="item.style"
            @click.stop="item.method && handleTableActionButton(item.method, scope.row, scope.$index)"
          >{{ item.label }}</el-button>
        </template>
      </el-table-column>

      <template v-slot:empty>
        <slot name="table-empty"></slot>
      </template>
    </el-table>

    <!-- page部分： 配置文件对象 pageSettings -->
    <el-pagination
      v-if="pageSettings.hasPage"
      class="hs-table-pagination"
      :page-sizes="[50, 100, 200, 500, 1000]"
      v-model:currentPage="page.current"
      v-model:page-size="page.size"
      :pager-count="pageSettings.pagerCount"
      :total="page.total"
      layout="total, sizes, prev, pager, next"
      :background="true"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { post } from '../../utils/request';
import { RefreshLeft, Search, Download, DocumentChecked, Refresh, Upload } from '@element-plus/icons-vue';
import { toRefs, PropType, computed, ref, reactive } from 'vue';
import { FormSettingsModel, TableSettingsModel, pageSettingsModel, TableSettingPanelModel } from '../../model/hsTableModel';
import { getSearchParams, initFormModel, handleFormActionButton, search, reset, download, save } from './form';
import { handleTableActionButton, displayActionButton, getData, tableRowClick, tableCellDblClick, tableRowDBClick, canEdit, canEditCellList, getTableData } from './table';
import type { ElTable } from 'element-plus';
import { popErrorMessage, popSuccessMessage } from '../hs-message';
const refTable = ref<InstanceType<typeof ElTable>>();

const props = defineProps({
  formSettings: {
    type: Object as PropType<FormSettingsModel>,
    required: true, // 必传
  },

  tableSettingPanel: {
    type: Object as PropType<TableSettingPanelModel> | undefined
  },

  tableSettings: {
    type: Object as PropType<TableSettingsModel>,
    required: true, // 必传
  },
  pageSettings: {
    type: Object as PropType<pageSettingsModel>,
    required: true, // 必传
  },
});
const { formSettings, tableSettings, pageSettings, tableSettingPanel } = toRefs(props);

//#region 上传
const loadingUpload = ref(false);
const onProgress = () => {
  loadingUpload.value = true;
};
const uploadError = (err: any, file: any, fileList: any) => {
  loadingUpload.value = false;
  popErrorMessage('上传失败');
};
const uploadSuccess = (response: any, file: any, fileList: any) => {
  if (response.success) {
    popSuccessMessage('上传成功');
  } else {
    popErrorMessage('上传失败');
  }

  // this.getData();
  loadingUpload.value = false;
};
//#endregion
// page相关
const page = reactive({ current: pageSettings.value.current, size: pageSettings.value.size, total: pageSettings.value.total });

// form相关
const conditions = computed(() => getSearchParams(formSettings.value, page));
initFormModel(formSettings.value);

// 点击重置事件
const clickReset = async () => {
  initFormModel(formSettings.value);
  reloadTableData();
};

const reInitFormModel = async () => {
  initFormModel(formSettings.value);
};

// 点击保存事件
const clickSave = async () => {
  for (let item of canEditCellList) {
    const rowData = data.value.find(x => x[tableSettings.value.rowKey || ''] == item.key);
    const params = {
      url: formSettings.value.updateRequest.url,
      conditions: rowData,
    } as any;
    await post(params);
  }
  reloadTableData();
  canEditCellList.splice(0, canEditCellList.length);
};

const clickCancel = async () => {
  canEditCellList.splice(0, canEditCellList.length);
};

const clickSearch = async () => {
  reloadTableData();
};

// table相关
const loading = ref(false);
const data = ref(tableSettings.value.data);

// 组件加载时初始化数据
if (tableSettings.value.needInitialData) {
  getData(data, loading, formSettings, conditions, page, tableSettings);
}

// 获取table数据（导出给父组件方法）
const reloadTableData = () => {
  page.current = 1;
  getData(data, loading, formSettings, conditions, page, tableSettings);
};

// 获取表格选择条目
const getSelectionRows = () => {
  return refTable.value?.getSelectionRows();
};

// 获取表格数据
const getHSTableData = async () => {
  return await getTableData(data, loading, formSettings, conditions, page);
};

// 设置数据
const setHSTableData = async (newData: any) => {
  data.value = newData;
};

//#region 表单相关
const getFormModel = () => {
  return formSettings.value.formModel;
};
//#endregion

defineExpose({ reloadTableData, getSelectionRows, clickReset, reInitFormModel, getHSTableData, setHSTableData, getFormModel });
</script>

<script lang="ts">
export default {
  name: 'HSTable',
  methods: {

  },
};
</script>

<style lang="scss" scope>
.hs-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  .hs-table-el-form {
    .download {
      background-color: #FE6A0C; 
      padding: 8px 15px; 
      color: white; 
      height: 32px; 
      line-height: 1;
      border-radius:4px;
    }
    .download:hover {
      background-color: #FF9555;
    }
  }

  .setting {
    height: 30px;
    width: 100%;
    .table-title {
      color: #3694f6;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .hs-table-pagination {
    margin: 10px 0px 0px 0px;
    justify-content: end;
  }
}
</style>