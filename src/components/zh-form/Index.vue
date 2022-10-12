<template>
  <el-form
    class="zh-form"
    v-bind="$attrs"
    ref="refForm"
    :model="modelValue"
    :rules="formSettings?.rules"
    :label-width="formSettings?.formLabelWidth || 'auto'"
    type="flex"
    inline
    justify="end"
    style="flex-wrap: wrap; flex-direction: row"
  >
    <el-row style="display: flex; flex-wrap: wrap">
      <el-col
        v-for="(item, index) in formSettings?.fields"
        :key="index"
        :span="item.span"
        :style="{
          maxWidth:
            item.span === undefined
              ? Number(item.width) + Number(item.labelWidth) + 'px'
              : '',
        }"
      >
        <el-form-item
          :key="'form-item' + index"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.labelWidth"
          v-show="!item.hide"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :type="item.inputType"
            :clearable="item.clearable"
          ></el-input>

          <!-- 文本显示 -->
          <span
            v-if="item.type === 'text'"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            >{{ modelValue[item.prop] }}</span
          >

          <!-- 开关 -->
          <el-switch
            v-else-if="item.type === 'switch'"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"
            v-model="modelValue[item.prop]"
          />

          <!-- 数字输入框 :min="1" :max="10" -->
          <el-input-number
            v-else-if="item.type === 'input-number'"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :clearable="item.clearable"
          />

          <!-- 下拉 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="modelValue[item.prop]"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            :value-key="item.valueKey"
            :disabled="item.disabled"
            :multiple="item.multiple"
            filterable
            clearable
            :remote="item.remote"
            :remote-method="item.remoteMethod"
            :placeholder="
              item.placeholder
                ? item.placeholder
                : item.remoteMethod
                ? '请输入选择'
                : '请选择'
            "
          >
            <el-option
              v-for="(subItem, subIndex) in (item.options as Array<TSelectOption>)"
              :key="subIndex"
              :label="subItem.label"
              :value="subItem.value"
            ></el-option>
          </el-select>

          <el-date-picker
            v-else-if="item.type === 'date-picker'"
            v-model="modelValue[item.prop]"
            :disabled="item.disabled"
            :type="item.timeType"
            :format="item.timeShowFormat"
            :value-format="item.timeValueFormat"
            :placeholder="item.placeholder || '请选择'"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            :clearable="item.clearable"
          ></el-date-picker>

          <!-- 级联选择器  -->
          <el-cascader
            v-else-if="item.type === 'cascader'"
            :options="item.options"
            :props="item.props"
            v-model="modelValue[item.prop]"
            :clearable="item.clearable"
          />

          <!-- 单选框组 -->
          <el-radio-group
            v-else-if="item.type === 'radio-group'"
            v-model="modelValue[item.prop]"
          >
            <el-radio
              v-for="(subItem, subIndex) in (item.options as Array<TSelectOption>)"
              :key="subIndex"
              :label="subItem.label"
              >{{ subItem.text }}</el-radio
            >
          </el-radio-group>

          <!-- 多选框 -->
          <el-checkbox
            v-else-if="item.type === 'checkbox'"
            v-model="modelValue[item.prop]"
            :label="item.checkboxText"
            :size="item.checkboxSize"
          />

          <!-- 自定义筛选内容 -->
          <template v-else-if="item.type === 'slot'">
            <slot :name="'form-' + item.prop" />
          </template>
        </el-form-item>
      </el-col>
      <slot></slot>
    </el-row>
    <slot name="nextRow"></slot>
  </el-form>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref } from 'vue';
import Form from './index';
import { TFormSettings, TSelectOption } from './type';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
  },

  formSettings: {
    type: Object as PropType<TFormSettings>,
  },
});

const refForm = ref();
const { modelValue, formSettings } = toRefs(props);

const emit = defineEmits(['close', 'submit', 'update:modelValue']); //定义一个变量来接收父组件传来的方法
const hsFormInstance = new Form({ emit, refForm });

defineExpose({ validate: hsFormInstance.validate });
</script>

<script lang="ts">
export default { name: 'ZhForm' };
</script>

<style lang="scss" scoped>
.zh-form {
  &:deep(.el-col-0) {
    display: block;
  }
}
</style>

<style lang="scss"></style>
