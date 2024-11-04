<template>
  <component v-bind="$attrs" :is="useScrollContentBox ? ScrollContentBox : ContentBox" @scroll="scroll">
    <slot></slot>
  </component>
</template>

<!-- Splitpanes: https://antoniandre.github.io/splitpanes/ -->
<!-- vue-splitpane -->
<script lang="ts" setup>
import { toRefs } from 'vue';
import ContentBox from './ContentBox.vue';
import ScrollContentBox from './ScrollContentBox.vue';

const emit = defineEmits(['scroll']);
/**
 * 参数
 * useScrollContentBox： 是否使用滚动盒子，默认为 true
*/
const props = defineProps({
  useScrollContentBox: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const { useScrollContentBox } = toRefs(props);

const scroll = (e: any) => {
  // console.log('组件内滚动监听：', e);
  emit('scroll', e);
};
</script>

<style lang="scss" scoped></style>
