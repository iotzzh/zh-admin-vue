<template>
  <div class="zh-select-icon">
    <el-select v-bind="$attrs" v-model="value" ref="refSelect" :disabled="isDisabled"
      :popper-class="'zh-select-icon-popper ' + (useGrid ? 'use-grid' : '')"
      :style="{ width: width ? `${width}` : '100%' }" @change="change" :placeholder="placeholder ? placeholder : '请选择'"
      filterable clearable @visible-change="visibleChange">
      <el-option v-for="(item, index) in options" :key="index" :value="item.font_class">
        <i :class="'iconfont icon-' + item.font_class"></i><span>{{ item.font_class }}</span>
      </el-option>
      <template #label>
        <i :class="'iconfont icon-' + value"></i><span>{{options.find((x: any) => x.font_class === value)?.font_class
        }}</span>
      </template>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, nextTick, onMounted, onUnmounted } from 'vue';
import { computed } from 'vue';
import iconfont from '@/assets/iconfont/iconfont.json';

type disabledFun = (modelValue: any) => boolean;

const props = defineProps({
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
  },
  width: {},
  disabled: {
    type: Boolean || Function,
  },
  placeholder: {
    type: String,
  },
  useGrid: {
    type: Boolean,
    default: true
  }
});

const {
  modelValue,
  disabled,
  placeholder,
  useGrid
} = toRefs(props);

const emit = defineEmits(['update:modelValue']);

const refSelect = ref();

const isDisabled = computed(() => {
  let result = false;
  if (!disabled.value) return result;
  if (typeof disabled.value === 'boolean') return disabled.value;
  if (typeof disabled.value === 'function')
    return (disabled.value as disabledFun)(modelValue?.value);
  return result;
});

const options = ref(iconfont.glyphs);

const value = ref(modelValue?.value);
// 选择变化时，传出选中值
const change = (newVal: any) => {
  emit('update:modelValue', newVal);
};

const setOptionsDialogWidth = () => {
  // 如果不需要grid展示，不处理
  if (!useGrid.value) return;
  const width = refSelect.value.selectRef.clientWidth;
  // 获取下拉框的id值
  const id = refSelect.value.selectRef.children[0].getAttribute('aria-describedby');
  // 通过id获取对应的dom
  const dom = document.getElementById(id);
  if (!dom) return;
  // 根据元素可知，要控制下zh-select-icon-popper的宽度，所以这里获取该元素
  const domPoppers = document.getElementsByClassName('zh-select-icon-popper');
  const domPopper = domPoppers ? domPoppers[0] as HTMLElement : '';
  if (!domPopper) return
  domPopper.style.width = width + 'px';
  domPopper.style.minWidth = 'auto';
  domPopper.style.maxWidth = width;
}

const visibleChange = async (isShow) => {
  // 如果关闭下拉框，直接返回
  if (!isShow) return;
  await nextTick();
  setOptionsDialogWidth();
}

onMounted(() => {
  window.addEventListener('resize', setOptionsDialogWidth);
})

onUnmounted(() => {
  window.removeEventListener('resize', setOptionsDialogWidth);
});

</script>

<script lang="ts">
export default { name: 'ZHSelectIcon' };
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
