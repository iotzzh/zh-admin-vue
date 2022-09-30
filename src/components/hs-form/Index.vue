<!--
 * @Author: zzh
 * @Date: 2022-03-23 11:24:15
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:07:12
 * @Description: 表单
 * @FilePath: \zh-admin\src\components\hs-form\Index.vue
-->
<template>
  <el-form
    class="hs-form"
    ref="formRef"
    :model="modelValue"
    :rules="formSettings.rules"
    :label-width="formSettings.labelWidth || 'auto'"
  >
    <el-row style="display: flex; flex-wrap: wrap">
      <el-col v-for="(item, index) in formSettings.fields" :key="index" :span="item.span">
        <el-form-item
          :key="'form-item' + index"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.labelWidth"
          v-show="item.display === undefined || item.dispaly"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :type="item.inputType"
            clearable
          ></el-input>

          <!-- 开关 -->
          <el-switch
            v-else-if="item.type === 'switch'"
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
            clearable
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
            :placeholder="item.placeholder ? item.placeholder : item.remoteMethod ? '请输入选择' : '请选择'"
          >
            <el-option
              v-for="(subItem, subIndex) in item.options"
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
            :value-format="item.timeShowFormat"
            :placeholder="item.placeholder"
            :style="{ width: item.width ? `${item.width}` : '100%' }"
            :clearable="item.clearable"
          ></el-date-picker>

          <!-- 级联选择器  -->
          <el-cascader
            v-else-if="item.type === 'cascader'"
            :options="item.options"
            :props="item.props"
            v-model="modelValue[item.prop]"
            clearable
          />

          <!-- 单选框组 -->
          <el-radio-group v-else-if="item.type === 'radio-group'" v-model="modelValue[item.prop]">
            <el-radio
              v-for="(subItem, subIndex) in item.options"
              :key="subIndex"
              :label="subItem.label"
            >{{ subItem.text }}</el-radio>
          </el-radio-group>

          <!-- 多选框 -->
          <el-checkbox
            v-else-if="item.type === 'checkbox'"
            v-model="modelValue[item.prop]"
            :label="item.text"
            :size="item.size"
          />

          <!-- 自定义筛选内容 -->
          <template v-else-if="item.type === 'slot'">
            <slot :name="'form-' + item.prop" />
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref, onMounted } from 'vue';
import { FormInstance } from 'element-plus';
import Form from './index';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
  },

  formSettings: {
    type: Object as PropType<any>,
  },
});

const formRef = ref();
const { modelValue, formSettings } = toRefs(props);


const emit = defineEmits(['close', 'submit', 'update:modelValue',]);   //定义一个变量来接收父组件传来的方法
const hsFormInstance = new Form({ emit, formRef });

const validate = async () => {
  if (!formRef.value) return;
  const result = await formRef.value.validate((valid:any) => {
    if (valid) {
      return true;
    } else {
      return false;
    }
  });

  return result;

};

defineExpose({ validate });



</script>

<script lang="ts">
export default { name: 'hsForm' };
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
</style>


