<template>
  <div class="zh-tree">
    <el-tree
      v-if="data && data.length > 0"
      class="tree"
      :data="data"
      :props="defaultProps"
      :indent="0"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node[defaultProps.label] }}</span>
        </span>
      </template>
    </el-tree>
    <div v-else class="empty" @click="openModal(0)">
      <el-icon><Plus /></el-icon>
      <div>新增总类</div>
    </div>

    <ZhFormModal 
      :modal="modal" 
      v-model="formModel" 
      :formSettings="formSettings"
      @cancel="() => modal.show = false"
      @close="() => modal.show = false"
      @submit="submit"
    ></ZhFormModal>
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType, computed, ref, reactive, Ref, watch } from 'vue';
import { Plus, Search, Delete, Download, 
  DocumentChecked, Refresh, Upload } from '@element-plus/icons-vue';
import ZhFormModal from '../zh-form-modal/index.vue';
import { TModal } from '../zh-modal/type';
import { TField, TFormSettings } from '../zh-form/type';
import { TRequest } from './type';
import { ipcRenderer } from 'electron';
import { sendSync } from '../zh-request';

const props = defineProps({
  defaultProps: {
    type: Object as PropType<any>,
    required: true, // 必传
  },

  request: {
    type: Object as PropType<TRequest>,
    required: false,
  },
});

const {
  defaultProps,
  request
} = toRefs(props);

const data = ref([] as any);

const modal = ref({
  show: false,
  title: '新增',
} as TModal);
const formModel = ref({} as any);
const formSettings = ref({
  fields: [
    { label: '父级分类', prop: 'parent_classfication_name', type:'text', span: 24, hide: false },
    { label: '分类名称', prop: 'classfication_name', type:'input', span: 24, },
  ],
} as TFormSettings);

// 0: 总， 1：新增， 2：编辑
const openModal = (type: number) => {
  const fields = formSettings.value.fields as TField[];

  if (type === 0) {
    fields[0].hide = true;
    modal.value.type = 'add';
  } else if (type === 1) {
    fields[0].hide = false;  
    modal.value.type = 'add';
  } else if (type === 2) {
    fields[0].hide = false;
    modal.value.type = 'edit';
  } else {}
  modal.value.show = true;
};

const submit = async() => {
  let result = null;
  if (modal.value.type === 'add') {
  const parmas = {
    url: request?.value?.urlAdd,
    conditions: formModel.value,
  };
  const result = sendSync(parmas);
  // result = ipcRenderer.sendSync(request?.value?.urlAdd as string, {});
  } else if (modal.value.type === 'edit') {
  
  }
};
</script>

<script lang="ts">
export default { name: 'ZHTree' };
</script>

<style lang="scss" scope>
@import './index.scss';
</style>