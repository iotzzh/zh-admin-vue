<template>
    <div class="zh-select">
        <el-select :model="modelValue" :loading="loading" :loading-text="loadingText" :multiple="multiple"
            :disabled="disabled" :value-key="valueKey" :size="size" :clearable="clearable">
            <el-option v-for="(item, index) in (options as any)" :key="(valueKey && item[valueKey]) || index"
                :label="item.label" :value="item.valueKey ? item : item.value"></el-option>
        </el-select>

    </div>
</template>
  
<script setup lang="ts">
import { toRefs, PropType, computed, ref, reactive, Ref, watch, onMounted } from 'vue';
import { iconPropType, isValidComponentSize } from 'element-plus/lib/utils';

import { ComponentSize } from './type';
import { TZHRequestParams } from '../zh-request/type';
import ZHRequest from '../zh-request';

const props = defineProps({
    name: String,
    id: String,
    modelValue: {
        type: [Array, String, Number, Boolean, Object],
        default: undefined,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    automaticDropdown: Boolean,
    size: {
        type: String as PropType<ComponentSize>,
        validator: isValidComponentSize,
    },
    effect: {
        type: String as PropType<'light' | 'dark' | string>,
        default: 'light',
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: {
        type: String,
        default: '',
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
        type: Number,
        default: 0,
    },
    placeholder: {
        type: String,
    },
    defaultFirstOption: Boolean,
    reserveKeyword: {
        type: Boolean,
        default: true,
    },
    valueKey: {
        type: String,
        default: 'value',
    },
    collapseTags: Boolean,
    collapseTagsTooltip: {
        type: Boolean,
        default: false,
    },
    persistent: {
        type: Boolean,
        default: true,
    },
    clearIcon: {
        type: iconPropType,
    },
    fitInputWidth: {
        type: Boolean,
        default: false,
    },
    suffixIcon: {
        type: iconPropType,
    },
    validateEvent: {
        type: Boolean,
        default: true,
    },
    remoteShowSuffix: {
        type: Boolean,
        default: false,
    },
    suffixTransition: {
        type: Boolean,
        default: true,
    },
    placement: {
        type: String,
        default: 'bottom-start',
    },
    requestDataWhenMounted: {
        type: Boolean,
        default: true
    },
    options: {
        type: Array,
    },
    conditions: {
        type: Object,
    },
    api: {
        type: String
    },
    apiResultProperty: {
        type: Array
    }
});

const {
    modelValue,
    valueKey,
    loading,
    loadingText,
    multiple,
    size,
    clearable,
    options,
    conditions,
    api,
    apiResultProperty,
    requestDataWhenMounted
} = toRefs(props);

const refZHTree = ref();

const getDeepValue = (obj: any, currProp: any, level: number): any => {
    let value = obj[currProp]; // 当前层级的属性值
    level++; // 增加一层

    if (typeof value === 'object' && value !== null) { // 如果当前属性值是一个对象，则继续遍历
        getDeepValue(value, currProp + '.' + (level - 1), level); // 递归调用函数，获取下一层级的属性值
    } else { // 否则，直接返回当前属性值
        return value;
    }

    return getDeepValue(obj, currProp, level); // 返回下一层级的属性值
};

const getList = async () => {
    loading.value = true;
    if (api && api.value) {
        const params: TZHRequestParams = { url: api.value, conditions: conditions!.value };
        const result = await ZHRequest.post(params);
        if (apiResultProperty!.value) {
            options!.value = getDeepValue(result, 'data.records', 0);
        } else {
            options!.value = result.data.records;
        }
    }

};

onMounted(() => {
    if (requestDataWhenMounted && requestDataWhenMounted.value) {
        getList();
    }
});






defineExpose({
    getList,
});
</script>
  
<script lang="ts">
export default { name: 'ZHSelect' };
</script>
  
<style lang="scss" scope>
@import './index.scss';
</style>
  