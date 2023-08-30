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
  if (settings.requestConfig?.list?.url)
    pageSetting.value.requestConfig.list = api[pageSetting.value.requestConfig.list];
};
convertRequest();
</script>
