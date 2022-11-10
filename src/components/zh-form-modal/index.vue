<template>
  <ZHModal ref="refZHModal" :modal="modal" @close="close" @submit="submit" @cancel="cancel">
    <ZHForm :formSettings="formSettings" v-model="modelValue"></ZHForm>
  </ZHModal>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref } from 'vue';
import ZHModal from '../zh-modal/index.vue';
import { TModal } from '../zh-modal/type';
import ZHForm from '../zh-form/index.vue';
import { TZHFormSettings } from '../zh-form/type';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
  },

  modal: {
    type: Object as PropType<TModal>,
    required: true, // 必传
  },

  formSettings: {
    type: Object as PropType<TZHFormSettings>,
  },
});

const { modal, modelValue } = toRefs(props);
const refZHModal = ref();


const emit = defineEmits(['close', 'submit', 'cancel']);
const close = () => emit('close');
const submit = () => emit('submit');
const cancel = () => emit('cancel');

defineExpose({
  toggleLodadingSubmit: (isLoading: boolean) => refZHModal.value.toggleLodadingSubmit(isLoading),
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
