<template>
  <div v-loading="loading" style="display:flex; flex-direction: column;height: 100%;">
    <Title></Title>
    <Menu mode="vertical"></Menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

import Title from '@/layout/components/Title.vue';
import Menu from '@/layout/components/Menu.vue';

import ZHRequest from '@/components/zh-request';

import api from '@/api';
const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';
import routeData from '@/router/routes/index';
import { appendRouter } from '@/router';

const menuList = ref([] as any);

const loading = ref(true);

onMounted(async () => {
  const params = {
    url: api.getRouteList,
    conditions: {},
  };
  const result = await ZHRequest.post(params);
  menuList.value = result?.data?.records || [];

  if (ROUTE_DATA_SOURCE === 'api') appendRouter(result.data.records);
  else {
    menuList.value = routeData;
    appendRouter();
  }

  await nextTick();
  loading.value = false;
});

</script>

<style lang="scss" scoped>
@import '../../index.scss';

.logo {
  height: $topBarHeight;
  line-height: $topBarHeight;
  text-align: center;
  vertical-align: middle;
  background-color: rgb(12, 33, 53) !important;
  color: white;
  display: flex;
  padding-left: 7px;
  align-items: center;

  .logo-img {
    width: 40px;
    height: 40px;
    filter: brightness(1.5);
  }

  .logo-text {
    font-size: $leftTitleFontSize;
    padding-left: 7px;
    letter-spacing: 3px;
    font-family: cursive;
    font-weight: bolder;
  }
}

.scrollbar {
  height: calc(100vh - $topBarHeight);

  &:deep(.el-scrollbar__view) {
    height: 100%;
  }

  .el-menu-vertical {
    height: 100%;
    border-right: 0px;
    background: #fff;
  }
}
</style>
