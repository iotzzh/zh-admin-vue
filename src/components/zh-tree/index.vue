<template>
  <div class="zh-tree" v-loading="loadingTree">
    <el-input v-model="filterText" placeholder="过滤搜索" style="width: 100%;" />
    <el-tree v-if="tData && tData.length > 0" ref="refZHTree" class="tree" :data="tData" :props="defaultProps"
      :indent="0" default-expand-all :filter-node-method="filterNode">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node[defaultProps.label] }}</span>
        </span>
      </template>
    </el-tree>
    <div v-else class="empty" @click="openModal(0)">
      <el-icon :size="40">
        <Plus />
      </el-icon>
    </div>

    <ZhFormModal v-if="treeSettings.formSettings" :modal="modal" v-model="formModel"
      :formSettings="treeSettings.formSettings" @cancel="() => modal.show = false" @close="() => modal.show = false"
      @submit="submit"></ZhFormModal>
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType, computed, ref, reactive, Ref, watch, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import ZhFormModal from '../zh-form-modal/index.vue';
import { TZHModal } from '../zh-modal/type';
import { TZHFromField } from '../zh-form/type';
import { TZHTreeRequest, TZHTreeSetting } from './type';
import ZHRequest from '../zh-request';
import { TZHRequestParams } from '../zh-request/type';
import { TZHTableRequestResult } from '../zh-table/type';

const props = defineProps({
  defaultProps: {
    type: Object as PropType<any>,
    required: true, // 必传
  },

  treeSettings: {
    type: Object as PropType<TZHTreeSetting>,
    required: true, // 必传
  },

  request: {
    type: Object as PropType<TZHTreeRequest>,
    required: false,
  },
});

const { defaultProps, request, treeSettings } = toRefs(props);
const refZHTree = ref();

//#region Tree
const loadingTree = ref(false);
const filterText = ref('');
const tData = ref([] as any);
const arrayToTree = (list: Array<any>, parent = 0): any => {
  return list.filter(item => item.parent === parent).map(item => ({ ...item, children: arrayToTree(list, item.id), }));
};

const getTreeData = async () => {
  loadingTree.value = true;
  const params: TZHRequestParams = { url: request?.value?.urlGet || '', conditions: request?.value?.conditionsGet, };
  const result = await ZHRequest.post(params);
  const treeRecords = arrayToTree(result.data.records);
  tData.value = treeRecords;
  loadingTree.value = false;
};

onMounted(async () => {
  getTreeData();
});

watch(filterText, (val) => { refZHTree.value && refZHTree.value!.filter(val); });

const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.label.includes(value);
};

//#endregion

//#region Form
const formModel = ref({} as any);
//#endregion

//#region Modal
const modal = ref({ show: false, title: '新增', loadingSubmit: false } as TZHModal);

// 0: 总， 1：新增， 2：编辑
const openModal = (type: number) => {
  const fields = treeSettings!.value!.formSettings!.fields as TZHFromField[];
  if (type === 0) {
    // fields[0].hide = true;
    modal.value.type = 'add';
  } else if (type === 1) {
    // fields[0].hide = false;
    modal.value.type = 'add';
  } else if (type === 2) {
    // fields[0].hide = false;
    modal.value.type = 'edit';
  } else { }
  modal.value.show = true;
};

const closeModal = () => {
  modal.value.show = false;
  formModel.value = {};
};

const submit = async () => {
  modal.value.loadingSubmit = true;
  const url = (modal.value.type === 'add' ? request?.value?.urlAdd : request?.value?.urlEdit) || '';
  const params: TZHRequestParams = {
    url,
    conditions: formModel.value,
  };
  const result: TZHTableRequestResult = await ZHRequest.post(params);
  if (result.success) {
    closeModal();
    getTreeData();
  }

  modal.value.loadingSubmit = false;
};
//#endregion
</script>

<script lang="ts">
export default { name: 'ZHTree' };
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
