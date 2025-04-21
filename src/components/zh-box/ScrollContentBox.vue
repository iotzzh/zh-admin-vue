<template>
  <el-scrollbar class="zh-scroll-layout" v-bind="$attrs" height="100%" @scroll="scroll">
    <slot></slot>
  </el-scrollbar>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['scroll']);

  const scroll = (e: any) => {
    // console.log('组件内滚动监听：', e);
    emit('scroll', e);
  };
</script>

<style lang="scss" scoped>
  .zh-scroll-layout {
    width: 100%;
  }
</style>
