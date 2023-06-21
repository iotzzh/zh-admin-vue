<!-- 基础模板：表格，自带增删改查 -->
<template>
    <ZHLayout>
        <ZHTable ref="refZHTable" v-if="config.tableConfig" :config="config.tableConfig"></ZHTable>
        <div v-else>loading...</div>

        <div v-for="(item, index) in config.modalConfig" :key="index">
        <ZHModal2 :ref="(el: any) => setRefMap(el, item.refName)" :modal="item.modal">
            <component v-for="(item, index) in modalComponents" :key="index" :is="item"></component>
        </ZHModal2>
        </div>
    </ZHLayout>    
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs, createApp, provide } from 'vue';
import ZHLayout from '@/components/zh-layout/index.vue';
import ZHTable from '@/components/zh-table/index.vue';
import { TZHTable } from '@/components/zh-table/type';
import ZHModal2 from '@/components/zh-modal2/index.vue';
import { TZHModal } from '@/components/zh-modal/type';
import { onMounted } from 'vue';

type TPageConfig = {
    tableConfig: TZHTable
    modalConfig: Array<TZHModal>
};

const props = defineProps({
    config: {
        type: Object as PropType<TPageConfig>,
        required: true, // 必传
    },
});

const { config } = toRefs(props);
const refZHTable = ref();
const refModals: Record<string, any> = {};
provide('refModals', refModals);
const setRefMap = (el: any, name: string) => {
    if (el) {
        refModals[`${name}`] = el;
    }
};


const modalComponents = ref({} as any);
const createComponent = () => {
    const app = createApp({});
    for (let modalConfig of config.value?.modalConfig) {
        const settings = modalConfig.modal;
        app.component(settings.stringSlotName, {
            template: settings.stringSlotT
        });
        modalComponents.value[settings.stringSlotName] = app.component(settings.stringSlotName);
    }
};

onMounted(() => {
    createComponent();
});

onMounted(() => {
    window.refModals = refModals;
});
</script>

<script lang="ts">
export default { name: 'basicTemplate' }; </script>