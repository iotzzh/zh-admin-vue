<template>
    <h3>普通下拉, value: {{ value }}</h3>
    <ZHSelect v-model="value" :defaultOptions="options" :multiple="true"></ZHSelect>

    <h3>对象列表选中: value: {{ value1 }}</h3>
    <ZHSelect v-model="value1" :defaultOptions="options1" :multiple="true" value-key="id"></ZHSelect>

    <h3>对象列表选中某个值: value: {{ value11 }}</h3>
    <ZHSelect v-model="value11" :defaultOptions="options1" :multiple="true"></ZHSelect>

    <h3>通过api设置列表: value: {{ value2 }}</h3>
    <ZHSelect v-model="value2" requestDataWhenMounted value-key="id" :api="api.getUserList" valueField="id"
        labelField="name">
    </ZHSelect>
</template>

<script setup>
import { ref } from 'vue';
import ZHSelect from '@/components/zh-select/index.vue';
import api from '@/api'

const value = ref();
const options = ref([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
]);

const value1 = ref();
const value11 = ref();
const options1 = ref([
    { id: 1, label: '1', value: '1' },
    { id: 2, label: '2', value: '2' },
]);

const value2 = ref();
</script>