<!-- 基础模板：表格，自带增删改查 -->
<template>
    <ZHTable ref="refZHTable" :usePage="setting.usePage"
        :formSettings="setting.formSettings" :tableSettings="setting.tableSettings" :request="setting.request">
    </ZHTable>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, PropType, toRefs } from 'vue';
import ZHTable from '@/components/zh-table/index.vue';
// @opened="opened"



const props = defineProps({
    setting: {
        type: Object as PropType<{ [x: string]: any }>,
        required: true, // 必传
    },
});

const { setting } = toRefs(props);


const refZHTable = ref();



onMounted(async () => {
    // 获取角色列表
    // const itemRole = tableSettings.columns?.find((x: any) => x.label === '角色');
    // itemRole!.addEditInfo!.options = [
    //     { label: '产品', id: '001' },
    //     { label: '开发', id: '002' },
    //     { label: '测试', id: '003' },
    //     { label: '运营', id: '004' },
    // ];
});


// const opened = async (params: any) => {
//     if (params.modal.type === 'edit') {
//         refZHTable.value.setModalFormModel({ role: { label: '产品', id: '001' } });
//     }
// };

</script>

<script lang="ts">
export default { name: 'basicTemplate' }; </script>