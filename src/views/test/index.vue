<template>
  <BasicTemplate :config="pageSetting"></BasicTemplate>
</template>

<script lang="ts" setup>
import BasicTemplate from '@/templates/basic/index.vue';
import { ref } from 'vue';
import settings from './index.json';
import api from '@/api';

const originConfigData = JSON.parse(JSON.stringify(settings));
const pageSetting: any = ref(originConfigData);

const convertRequest = () => {
  const keys = ['add', 'delete', 'update', 'list'];
  keys.forEach((x: string) => {
    if (originConfigData.table.requestConfig && originConfigData.table.requestConfig[x]?.url)
      pageSetting.value.table.requestConfig[x].url = api[originConfigData.table.requestConfig[x]?.url];
  });
};
convertRequest();
</script>
