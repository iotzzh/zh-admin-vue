<!-- 基础模板：表格，自带增删改查 -->
<template>
    <ZHLayout>
        <ZHTable ref="refZHTable" v-if="config.table" :config="config.table"></ZHTable>
        <div v-else>loading...</div>

        <div v-for="(modalConfig, index) in config.modalsConfig" :key="index">
            <ZHModal :ref="(el: any) => setRefMap(el, modalConfig.refName)" :modalConfig="modalConfig">
                <component v-if="modalConfig.conmponentName" :is="modalComponents[modalConfig.conmponentName]" :data="modalConfig.data"></component>
            </ZHModal>
        </div>

        <div v-for="(formModalConfig, index) in (config.formModalsConfig as any)" :key="index">
            <ZHFormModal :ref="(el: any) => setRefMap(el, formModalConfig.refName)" v-model="formModalConfig.model"
                v-bind:convertedModel="formModalConfig.convertedModel" :modalConfig="formModalConfig.modalConfig"
                :formConfig="formModalConfig.formConfig">
            </ZHFormModal>
        </div>
    </ZHLayout>
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs, createApp, provide, onMounted } from 'vue';
import ZHLayout from '@/components/zh-layout/index.vue';
import ZHTable from '@/components/zh-table/index.vue';
import { TZHTable } from '@/components/zh-table/type';
import ZHModal from '@/components/zh-modal/index.vue';
import { TZHModal } from '@/components/zh-modal/type';
import ZHFormModal from '@/components/zh-form-modal/index.vue';
import { TZHFormModal } from '@/components/zh-form-modal/type';

type TPageConfig = {
    table: TZHTable
    modalsConfig: Array<TZHModal>
    formModalsConfig: Array<TZHFormModal>
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
const setRefMap = (el: any, name: string | undefined) => {
    if (el && name) {
        refModals[`${name}`] = el;
    }
};


const modalComponents = ref({} as any);
const createComponent = () => {
    if (!config.value?.modalsConfig || config.value?.modalsConfig.length === 0) return;
    const app = createApp({});
    for (let modalConfig of config.value.modalsConfig) {
        const settings = modalConfig;
        if (!settings.conmponentName) continue;
        let methods: any = {};
        modalConfig.methods && modalConfig.methods.forEach((x: any) => {
            methods[x.name] = new Function(x.prop, x.body);
        });

        app.component(settings.conmponentName || 'temp', {
            template: settings.template,
            props: {
                data: {},
            },
            methods,
        });
        modalComponents.value[settings.conmponentName] = app.component(settings.conmponentName);
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