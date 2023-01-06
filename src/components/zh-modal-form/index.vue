<template>
  <ZHModal ref="refZHModal" :modal="modal" @close="zhFormModal.close" @submit="zhFormModal.submit"
    @cancel="zhFormModal.cancel">
    <ZHForm ref="refZHForm" :formSettings="formSettings" v-model="modelValue" v-model:convertedModel="convertedModel"></ZHForm>
  </ZHModal>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref } from 'vue';
import ZHModal from '../zh-modal/index.vue';
import { TZHModal } from '../zh-modal/type';
import ZHForm from '../zh-form/index.vue';
import ZHFormModal from './index';
import { TZHFormSettings } from '../zh-form/type';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
  },

  convertedModel: {
    type: Object as PropType<any>,
  },

  modal: {
    type: Object as PropType<TZHModal>,
    required: true, // 必传
  },

  formSettings: {
    type: Object as PropType<TZHFormSettings>,
  },
});

const { modal, modelValue, formSettings } = toRefs(props);
const refZHModal = ref();
const refZHForm = ref();
const emit = defineEmits(['close', 'submit', 'cancel', 'update:modelValue', 'update:convertedModel']);


const zhFormModal = new ZHFormModal({ emit, refZHModal, refZHForm, modelValue, formSettings });

defineExpose({
  init: zhFormModal.init,
});
</script>

<script lang="ts">
export default { name: 'ZHModal' };
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.el-dialog__header {
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
</style>
