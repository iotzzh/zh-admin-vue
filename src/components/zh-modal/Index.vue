<template>
  <el-dialog v-model="modal.show" :title="modal.title" :closeOnClickModal="false" :width="modal.width"
    @close="zhModal.close" :top="modal.top" :fullscreen="modal.fullscreen"
    :class="(modal.customClass || '') + ' zh-modal'" @opened="onOpened" :append-to-body="true">
    <div class="body-box">
      <slot></slot>

    </div>
    <template #footer v-if="modal.footer">
      <span class="dialog-footer">
        <el-button @click="zhModal.cancel"
          v-if="modal.footer?.hasCancelButton || modal.footer?.hasCancelButton === undefined">取消</el-button>
        <el-button type="primary" :loading="modal.loadingSubmit" @click="zhModal.submit"
          v-if="modal.footer?.hasSubmitButton || modal.footer?.hasSubmitButton === undefined">确定</el-button>
      </span>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { toRefs, PropType, onMounted } from 'vue';
import { ZHModal } from './index';
import { TZHModal } from './type';

const props = defineProps({
  modal: {
    type: Object as PropType<TZHModal>,
    required: true, // 必传
  },
});

const { modal } = toRefs(props);

const emit = defineEmits(['close', 'submit', 'cancel', 'onOpened']);

const zhModal = new ZHModal({ modal, emit });

const onOpened = () => { emit('onOpened'); };

defineExpose({});

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

.body-box {
  height: 100%;
  width: 100%;
}
</style>
