<template>
  <ZHModal ref="refZHModal" :modal="modal" @close="close" @submit="submit" @cancel="cancel">
    <ZHForm ref="refZHForm" :formSettings="formSettings" v-model="modelValue"></ZHForm>
  </ZHModal>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref } from 'vue';
import ZHModal from '../zh-modal/index.vue';
import { TZHModal } from '../zh-modal/type';
import ZHForm from '../zh-form/index.vue';
import { TZHFormSettings } from '../zh-form/type';
import { TZHModalFormSettings } from './type';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
  },

  modal: {
    type: Object as PropType<TZHModal>,
    required: true, // 必传
  },

  formSettings: {
    type: Object as PropType<TZHModalFormSettings>,
  },
});

const { modal, modelValue, formSettings } = toRefs(props);
const refZHModal = ref();
const refZHForm = ref();


const emit = defineEmits(['close', 'submit', 'cancel']);
const close = () => emit('close');
const submit = () => {
  if(refZHForm.value.validate()) {
    if (formSettings?.value?.customValidate && !formSettings?.value?.customValidate(modelValue?.value)) return;
    emit('submit');
  }
};
const cancel = () => emit('cancel');

defineExpose({
  // toggleLodadingSubmit: (isLoading: boolean) => refZHModal.value.toggleLodadingSubmit(isLoading),
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
