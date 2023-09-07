<template>
  <BasicTemplate :config="pageSetting"></BasicTemplate>
</template>

<script lang="ts" setup>
import BasicTemplate from '@/templates/basic/index.vue';
import { ref } from 'vue';
import settings from './index.json';
import api from '@/api';

const pageSetting: any = ref(settings);

const convertRequest = () => {
  if (settings.table.requestConfig?.list?.url)
    pageSetting.value.table.requestConfig.list.url = api[settings.table.requestConfig?.list?.url];
};
convertRequest();
</script>
