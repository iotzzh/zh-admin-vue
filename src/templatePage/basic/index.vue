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
  if (pageSetting.value?.requestConfig?.urlList) pageSetting.value.requestConfig.urlList = api[pageSetting.value.requestConfig.urlList];
};
convertRequest();
</script>
