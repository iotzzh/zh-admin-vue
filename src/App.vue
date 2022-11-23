<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router';
import ZHRequest from '@/components/zh-request/index';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocale } from './locales/useLocale';

const { changeLocale } = useLocale();

const { t } = useI18n();

onMounted(async () => {
  // const result = await ZHRequest.get({ url: '/upms/user/info' });
  // const result1 = await ZHRequest.get({ url: 'http://localhost:9091/api/getUseList' });
  // const result2 = await ZHRequest.get({ url: 'http://localhost:9091/api/getUseList' });
  // const result3 = await ZHRequest.get({ url: 'http://localhost:9091/api/getUseList' });
  // console.log(result);
});

</script>

<template>
  <el-button @click="async () => await changeLocale('en')">改变语言</el-button>
  <span>{{ t('sys.app.logoutTip') }}</span>
  <router-view />
</template>
