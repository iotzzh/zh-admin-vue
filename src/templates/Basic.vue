<!-- 基础模板：表格，自带增删改查 -->
<template>
    <ZHLayout>
        <ZHTable ref="refZHTable" v-if="config" :config="config"></ZHTable>
        <div v-else>loading...</div>
    </ZHLayout>    
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs } from 'vue';
import ZHLayout from '@/components/zh-layout/index.vue';
import ZHTable from '@/components/zh-table/index.vue';
import { TZHTable } from '@/components/zh-table/type';

const props = defineProps({
    config: {
        type: Object as PropType<TZHTable>,
        required: true, // 必传
    },
});

const { config } = toRefs(props);
const refZHTable = ref();


</script>

<script lang="ts">
export default { name: 'basicTemplate' }; </script>