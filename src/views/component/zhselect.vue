<template>
  <splitpanes class="default-theme">
    <pane>
      <div class="setting-box" style="overflow-y: auto; height: 100%; overflow-x: hidden">
        <div class="title">配置项</div>
        <p> 1. 这里有两种设置数据选项方式，一种是通过API请求数据列表，一种是直接设置列表 </p>
        <p>2. 值的数据类型有两种，可以是值类型，也可以设置成一个对象</p>
        <p style="font-weight: bolder">优点：</p>
        <p> 1. 传入API即可，不再需要写代码去做数据请求，支持自定义显示字段和value字段 </p>
        <p> 2. 当item是object时，支持使用key value进行回显，毕竟在后端有时只会存一个值。 </p>
        <p>3. 支持远程搜索，默认每次20条</p>
        <ZHForm
          v-model="model"
          v-bind:converted-model="convertedModel"
          :form-config="formConfig"
        ></ZHForm>
      </div>
    </pane>
    <pane>
      <div class="show-box" style="overflow-y: auto; height: 100%; text-align: center">
        <div class="title">示例展示</div>
        <ZHSelect
          ref="refSelect"
          v-model="sValue"
          :width="model.width"
          :options="options"
          :api="model.api"
          :value-key="model.valueKey"
          :label-field="model.labelField"
          :value-field="model.valueField"
        ></ZHSelect>

        <div class="title">值</div>
        <div>{{ sValue }}</div>
      </div>
    </pane>
  </splitpanes>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue';
  import ZHSelect from '@/components/zh-select/index.vue';
  import api from '@/api/authorityManagement';
  import { Splitpanes, Pane } from 'splitpanes';
  import ZHForm from '@/components/zh-form/index.vue';
  import { TZHformConfig } from '@/components/zh-form/type';

  const refSelect = ref();

  const sValue = ref();
  const options = ref([
    { label: '测试1', value: '测试1' },
    { label: '测试2', value: '测试2' },
    { label: '测试3', value: '测试3' },
  ]);

  // const apiUrl = ref(api.getRouteList);

  //#region 配置项
  const model = ref({
    api: api.getRouteList,
  } as any);
  const convertedModel = ref({} as any);
  const formConfig = ref({
    fields: [
      {
        label: '设置数据源',
        prop: 'dataSource',
        span: 12,
        type: 'select',
        defaultOptions: [
          { label: 'api', value: 'api' },
          { label: 'options', value: 'options' },
        ],
        defaultValue: 'api',
      },
      {
        label: 'api',
        prop: 'api',
        type: 'input',
        span: 12,
        defaultValue: api.getRouteList,
        disabled: true,
        hide: false,
      },
      {
        label: 'valueKey',
        prop: 'valueKey',
        type: 'input',
        span: 12,
        defaultValue: 'id',
        disabled: true,
        hide: false,
      },
      {
        label: 'labelField',
        prop: 'labelField',
        type: 'input',
        span: 12,
        defaultValue: 'routeName',
        disabled: true,
        hide: false,
      },
      {
        label: 'valueField',
        prop: 'valueField',
        type: 'input',
        span: 12,
        defaultValue: 'id',
        disabled: true,
        hide: false,
      },
      {
        label: 'options',
        prop: 'options',
        type: 'input',
        span: 12,
        disabled: true,
        hide: true,
      },
      {
        label: '宽度',
        prop: 'width',
        type: 'input',
        span: 12,
        defaultValue: '200px',
      },
    ],
  } as TZHformConfig);

  watch(model.value, async (newVal: any) => {
    if (newVal.dataSource === 'options') {
      formConfig.value.fields!.find((x: any) => x.label === 'api')!.hide = true;
      formConfig.value.fields!.find((x: any) => x.label === 'options')!.hide = false;
      model.value.valueKey = '';
      model.value.labelField = '';
      model.value.valueField = '';
      refSelect.value.setOptions([
        { label: '测试1', value: '测试1' },
        { label: '测试2', value: '测试2' },
      ]);
      await nextTick();
      refSelect.value.setValue('测试1');
    } else {
      formConfig.value.fields!.find((x: any) => x.label === 'api')!.hide = false;
      formConfig.value.fields!.find((x: any) => x.label === 'options')!.hide = true;
      model.value.valueKey = 'id';
      model.value.labelField = 'routeName';
      model.value.valueField = 'id';
      await refSelect.value.getList();
      refSelect.value.setValue('001');
    }
  });

  //#endregion
</script>

<script lang="ts">
  export default { name: 'select-example' };
</script>

<style lang="scss" scoped>
  .title {
    font-weight: bolder;
    text-align: center;
    padding: 20px;
    font-size: 20px;
  }
</style>
