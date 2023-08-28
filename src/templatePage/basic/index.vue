<template>
  <BasicTemplate :config="pageSetting"></BasicTemplate>
</template>

<script lang="ts" setup>
  import BasicTemplate from '@/templates/basic/index.vue';
  import { ref } from 'vue';
  import settings from './index.json';

  const pageSetting: any = ref(settings);
</script>
