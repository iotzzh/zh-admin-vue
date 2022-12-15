<template>
  <el-dialog v-model="modal.show" :title="modal.title" :closeOnClickModal="false" :width="modal.width"
    @close="zhModal.close" :top="modal.top" :fullscreen="zhModal.fullscreen.value"
    :class="(modal.customClass || '') + ' zh-modal'" @opened="onOpened" :append-to-body="true" :show-close="false">
    <div class="body-box">
      <slot></slot>
    </div>

    <template #header>
      <div class="header">
        <div class="left"></div>
        <div class="center">{{ modal.title }}</div>
        <div class="right">
          <el-button link @click="zhModal.toggleFullScreen" type="primary">{{ zhModal.fullscreen.value ? '退出全屏' : '全屏'
          }}</el-button>
          <el-button link @click="zhModal.close" type="primary">关闭</el-button>
        </div>
      </div>
    </template>

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
  margin-right: 0px;
}

.body-box {
  height: 100%;
  width: 100%;
}

.header {
  display: flex;

  div {
    flex: 1;
  }

  .right {
    text-align: right;
  }
}
</style>
