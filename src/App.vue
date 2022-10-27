<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router';
import ZHRequest from '@/components/zh-request/index';
import { onMounted } from 'vue';

onMounted(async () => {
  const result = await ZHRequest.get({ url: '/upms/user/info' });
  // const result1 = await ZHRequest.get({ url: 'http://localhost:9091/api/getUseList' });
  // const result2 = await ZHRequest.get({ url: 'http://localhost:9091/api/getUseList' });
  // const result3 = await ZHRequest.get({ url: 'http://localhost:9091/api/getUseList' });
  console.log(result);
});

</script>

<template>
  <router-view />
</template>
