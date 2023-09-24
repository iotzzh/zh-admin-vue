<template>
  <div v-loading="loading">
    <Title></Title>
    <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">
      <el-menu class="menu el-menu-vertical" router :collapse="!collapse" :collapse-transition="false"
        @select="changeSelectMenu">
        <SidebarItem v-for="menu in menuList" :key="menu.id" :item="menu"></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import Title from '@/layout/components/Title.vue';



import SidebarItem from './SidebarItem.vue';
import { useLayoutStore } from '@/layout/store';
import ZHRequest from '@/components/zh-request';
import Logo from '@/assets/img/logo.png';

import api from '@/api';
const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';
import routeData from '@/router/routes/index';
import { appendRouter } from '@/router';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

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

const router = useRouter();
const showLogo = ref(true);
const defaultSelectTab = computed(() => {
  return router.currentRoute.value.path;
});

const changeSelectMenu = (index: any, indexPath: any) => {
  store.changeIsOpenDrawerMenu(false);
};

const { t } = useI18n();
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
    // background: linear-gradient(to bottom, #7234c3, #496be7);
    background: #fff;
  }
}

.menu.el-menu-vertical {
  background-color: rgb(12, 33, 53) !important;
  --el-menu-text-color: rgb(255, 255, 255, 0.8) !important;
  --el-menu-hover-text-color: red !important;
  --el-menu-bg-color: rgb(12, 33, 53);
  --el-menu-hover-bg-color: rgba(9, 96, 189, 0.8) !important;

  // --el-color-primary
  // --el-menu-active-color: rgb(255, 255, 255, 1) !important;
  &:deep(.el-menu-item) {
    color: rgb(255, 255, 255, 0.8) !important;
  }

  &:deep(.el-menu-item.is-active) {
    color: white !important;
    // background-color: rgba(9,96,189, 0.8);
    background-color: var(--el-color-primary);
  }
}
</style>
