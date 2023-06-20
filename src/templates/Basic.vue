<!-- 基础模板：表格，自带增删改查 -->
<template>
    <ZHTable ref="refZHTable" :usePage="setting.usePage"
        :formSettings="setting.formSettings" :tableSettings="setting.tableSettings" :request="setting.request">
    </ZHTable>
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs } from 'vue';
import ZHTable from '@/components/zh-table/index.vue';

const props = defineProps({
    setting: {
        type: Object as PropType<{ [x: string]: any }>,
        required: true, // 必传
    },
});

const { setting } = toRefs(props);
const refZHTable = ref();


</script>

<script lang="ts">
export default { name: 'basicTemplate' }; </script>