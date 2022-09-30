<!--
 * @Author: zzh
 * @Date: 2022-03-23 11:24:15
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:07:36
 * @Description: 负责新增/编辑/详情的表单弹窗
 * @FilePath: \zh-admin\src\components\hs-form-modal\Index.vue
-->
<template>
  <el-dialog
    v-model="modal.show"
    :title="modal.title"
    :closeOnClickModal="false"
    :width="modal.width"
    @close="hsFormModalInstance.handleClose"
    append-to-body
    :top="modal.top"
    :fullscreen="modal.fullscreen"
  >
    <el-form
      class="hs-form-modal-form"
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
            >
              <template v-if="item.prepend" #prepend>{{ item.prepend }}</template>
            </el-input>

            <!-- 开关 -->
            <el-switch
              v-else-if="item.type === 'switch'"
              :active-value="item.activeValue"
              :inactive-value="item.inactiveValue"
              :disabled="item.disabled"
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
              v-model="modelValue[item.prop]"
              :props="item.props"
              :disabled="item.disabled"
              :ref="(el:any) => itemRefs[item.refName] = el"
              :style="{ width: item.width ? `${item.width}` : '100%' }"
              @change="hsFormModalInstance.changeCascader(item.refName)"
              clearable
            />

            <!-- 单选框组 -->
            <el-radio-group v-else-if="item.type === 'radio-group'" v-model="modelValue[item.prop]">
              <el-radio
                v-for="(subItem, subIndex) in item.options"
                :key="subIndex"
                :label="subItem.label"
                :disabled="item.disabled"
              >{{ subItem.text }}</el-radio>
            </el-radio-group>

            <!-- 多选组件 -->
            <el-checkbox-group
              v-else-if="item.type === 'checkbox-group'"
              v-model="modelValue[item.prop]"
            >
              <el-checkbox
                v-for="(subItem, subIndex) in item.options"
                :key="subIndex"
                :label="subItem.label"
                :name="subItem.text"
                :disabled="item.disabled"
              />
            </el-checkbox-group>

            <!-- 多选框 -->
            <el-checkbox
              v-else-if="item.type === 'checkbox'"
              v-model="modelValue[item.prop]"
              :label="item.text"
              :size="item.size"
              :disabled="item.disabled"
            />

            <!-- 自定义筛选内容 -->
            <template v-else-if="item.type === 'slot'">
              <slot :name="'form-' + item.prop" />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span v-if="formSettings.needOperations">
        <el-button
          v-for="(item, buttonIndex) in formSettings.operations"
          :key="buttonIndex"
          :type="item.type"
          :size="item.size ? item.size : 'small'"
          :icon="item.icon"
          :style="item.style"
          @click.stop="item.method"
        >{{ item.label }}</el-button>
      </span>
      <span class="dialog-footer" v-else>
        <el-button @click="hsFormModalInstance.handleClose">取消</el-button>
        <el-button type="primary" @click="hsFormModalInstance.handleSubmit(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref, reactive } from 'vue';
import { modal as hsFormModal } from './index';
interface modalModel {
  show: boolean
  width: string
  title: string
  top: string
  fullscreen: boolean
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
  },

  formSettings: {
    type: Object as PropType<any>,
  },

  modal: {
    type: Object as PropType<modalModel>,
    required: true, // 必传
  },
});

const formRef = ref();

const { modal, formSettings, modelValue } = toRefs(props);

const itemRefs = ref([] as any);

const emit = defineEmits(['close', 'submit', 'update:modelValue',]);   //定义一个变量来接收父组件传来的方法

const hsFormModalInstance = new hsFormModal({ modal, emit, formRef, itemRefs, formSettings });


</script>

<script lang="ts">
export default { name: 'hsFormModal' };
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


