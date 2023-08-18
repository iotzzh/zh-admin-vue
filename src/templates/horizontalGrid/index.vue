<!-- 基础模板：表格，自带增删改查 -->
<template>
  <ZHLayout>
    <splitpanes class="default-theme">
      <pane
        v-for="(component, index) in config.components"
        :key="index"
        :min-size="component.minSize"
        :size="component.size"
      >
        <ZHTable
          v-if="component.type === 'table'"
          :ref="(el: any) => setRefMap(el, component.ref)"
          :config="(component.config as TZHTable)"
        ></ZHTable>
        <ZHTree
          v-else-if="component.type === 'tree'"
          :ref="(el: any) => setRefMap(el, component.ref)"
          :config="(component.config as TZHTree)"
          @nodeclick="treeNodeClick"
        >
        </ZHTree>
      </pane>
    </splitpanes>

    <div v-for="(modalConfig, index) in config.modalsConfig" :key="index">
      <ZHModal :ref="(el: any) => setRefMap(el, modalConfig.refName)" :modalConfig="modalConfig">
        <component
          v-if="modalConfig.conmponentName"
          :is="modalComponents[modalConfig.conmponentName]"
          :data="modalConfig.data"
        ></component>
      </ZHModal>
    </div>

    <div v-for="(formModalConfig, index) in (config.formModalsConfig as any)" :key="index">
      <ZHFormModal
        :ref="(el: any) => setRefMap(el, formModalConfig.refName)"
        v-model="formModalConfig.model"
        v-bind:convertedModel="formModalConfig.convertedModel"
        :modalConfig="formModalConfig.modalConfig"
        :formConfig="formModalConfig.formConfig"
      >
      </ZHFormModal>
    </div>
  </ZHLayout>
</template>

<script lang="ts" setup>
  import { ref, PropType, toRefs, createApp, provide, onMounted, shallowRef } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import ZHLayout from '@/components/zh-box/index.vue';
  import ZHTable from '@/components/zh-table/index.vue';
  import ZHTree from '@/components/zh-tree/index.vue';
  import { TZHTree } from '@/components/zh-tree/type';
  import ZHModal from '@/components/zh-modal/index.vue';
  import { TZHModal } from '@/components/zh-modal/type';
  import ZHFormModal from '@/components/zh-form-modal/index.vue';
  import { createVueComponent } from '@/components/hooks';
  import { TZHTable } from '@/components/zh-table/type';
  import { TComponent } from '@/components/type';

  type TPageComponent = {
    type: string;
    ref: string;
    size: number;
    minSize: number;
    config: TZHTable | TZHTree;
  };
  type TPageConfig = {
    components: Array<TPageComponent>;
    events: Array<string | Function>;
    // components: Array<TZHTable | TZHTree>
    modalsConfig: Array<TZHModal>;
    formModalsConfig: Array<any>;
  };

  const props = defineProps({
    config: {
      type: Object as PropType<TPageConfig>,
      required: true, // 必传
    },
  });

  const { config } = toRefs(props);
  const refs: Record<string, any> = {};

  const setRefMap = (el: any, name: string | undefined) => {
    if (el && name) {
      refs[`${name}`] = el;
    }
  };

  const modalComponents = shallowRef({} as any);
  const createComponent = () => {
    if (!config.value?.modalsConfig || config.value?.modalsConfig.length === 0) return;
    const app = createApp({});
    for (let modalConfig of config.value.modalsConfig) {
      const settings = modalConfig;
      if (!settings.conmponentName) continue;
      let methods: any = {};
      modalConfig.methods &&
        modalConfig.methods.forEach((x: any) => {
          methods[x.name] = new Function(x.prop, x.body);
        });
      const component: TComponent = {
        name: settings.conmponentName,
        template: settings.template || '',
        methods,
        props: { data: {} },
      };
      const vueComponent = createVueComponent(component);
      modalComponents.value[settings.conmponentName] = vueComponent;
    }
  };

  onMounted(() => {
    createComponent();
  });

  onMounted(() => {
    const cWindow: any = window;
    cWindow.refs = refs;
  });

  // 执行监听事件
  const treeNodeClick = (params: any) => {
    if (!('treeNodeClick' in config.value.events)) return;
    if (typeof config.value.events['treeNodeClick'] === 'string') {
      new Function('params', config.value.events['treeNodeClick'])({
        ...params,
        refs,
      });
    } else {
      config.value.events['treeNodeClick']({ ...params, refs });
    }
  };
</script>

<script lang="ts">
  export default { name: 'horizontalGridTemplate' };
</script>

<style lang="scss" scoped>
  .default-theme {
    height: 100%;
    overflow: hidden;
    &:deep(.splitpanes__pane) {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
