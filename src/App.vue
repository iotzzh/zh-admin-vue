<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import isHelper from './utils/isHelper';
  import storage from './utils/storage';
  onMounted(async () => {
    const isMobile = isHelper.isMobile();
    storage.setIsMobile(isMobile);
  });
</script>
