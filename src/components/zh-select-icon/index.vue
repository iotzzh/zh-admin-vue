<template>
  <div class="zh-select-icon">
    <el-select v-bind="$attrs" v-model="value" ref="refSelect" :disabled="isDisabled"
      popper-class="zh-select-icon-popper" :style="{ width: width ? `${width}` : '100%' }" @change="change"
      :placeholder="placeholder ? placeholder : '请选择'" filterable clearable @visible-change="visibleChange">
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
import { toRefs, ref, onMounted, PropType, watch, nextTick } from 'vue';
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

const setValue = (newValue: any) => {
  value.value = newValue;
  emit('update:modelValue', newValue);
};

const value = ref(modelValue?.value);
const change = (newVal: any) => {
  emit('update:modelValue', newVal);
};

watch(
  () => modelValue!.value,
  (newVal: any) => {
    if (newVal !== value.value) {
      value.value = newVal;
    }
  },
  { deep: true },
);

const setOptions = (newOptions: any) => {
  options.value = newOptions;
};

const visibleChange = async (a, b, c) => {
  console.log(a);
  console.log(b);
  console.log(c);
  await nextTick();
  const width = refSelect.value.selectRef.clientWidth;
  const id = refSelect.value.selectRef.children[0].getAttribute('aria-describedby');
  console.log('id: ', id);

  const dom = document.getElementById(id);
  if (!dom) return;
  var dom1 = dom.getElementsByClassName('zh-select-icon-popper')[0];
  if (dom1) {
    dom1.style.width = width + 'px';
    dom1.style.minWidth = 'auto';
    dom1.style.maxWidth = width;
  }

  console.log('width: ', width);
}

onMounted(() => {
  if (useGrid.value) {
    // inputId: "el-id-5276-80"
    const width = refSelect.value.selectRef.clientWidth;
    console.log('width: ', width);

  }
});


defineExpose({
  setOptions,
  setValue,
});
</script>

<script lang="ts">
export default { name: 'ZHSelectIcon' };
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
