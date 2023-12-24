<template>
    <h3>普通下拉</h3>
    <ZHSelect v-model="value" :defaultOptions="options" :multiple="true"></ZHSelect>
</template>

<script setup>
import { ref } from 'vue';
import ZHSelect from '@/components/zh-select/index.vue';

const value = ref();
const options = ref([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
]);
</script>