<template>
  <V v-if="layout === 'vertical'"></V>
  <H v-else></H>
</template>

<script lang="ts" setup>
  import V from './verticalLayout/index.vue';
  import H from './horizontalLayout/index.vue';
  import { useLayoutStore } from '@/layout/store';
  import { storeToRefs } from 'pinia';

  const store = useLayoutStore();
  const { layout } = storeToRefs(store);
</script>
