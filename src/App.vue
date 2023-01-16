<script setup lang="ts">
import { onMounted } from 'vue';
import ZHRequest from './components/zh-request';
import isHelper from './utils/isHelper';
import storage from './utils/storage';
const ENV = import.meta.env;
onMounted(async () => { 
  // storage.setIsCloud(ENV.VITE_ENVIRONMENT === 'cloud'); 
  const isMobile = isHelper.isMobile();
  storage.setIsMobile(isMobile);
});

</script>

<template>
  <router-view />
</template>
