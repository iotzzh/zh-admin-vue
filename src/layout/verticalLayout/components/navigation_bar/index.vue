<template>
  <div class="navbar">
    <!-- left -->
    <div class="left">
      <span class="icon" @click="toggleSideBar">
        <i v-if="collapse" class="iconfont icon-zhedie1" />
        <i v-else class="iconfont icon-zhedie2" />
      </span>
    </div>
    
    <!-- right: info -->
    <div class="info">
      <span class="bell"><el-badge is-dot class="item"><el-icon><Bell /></el-icon></el-badge></span>

      <span class="fullscreen" @click="toggleFullScreen">
        <i v-if="fullscreen" class="iconfont icon-fullscreen-shrink"></i>
        <i v-else class="iconfont icon-fullscreen-expand"></i>
      </span>
      
      <el-dropdown :hide-on-click="true" @command="changeLanguage" class="lang">
        <i class="iconfont icon-language-outline" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <span class="setting-icon" @click="changeLayout">
        <i class="iconfont icon-layout-2-fill"></i>        
      </span> -->
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <span>{{ userInfo?.realName }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/layout/store';
import UIHelper from '@/utils/uiHelper';

import VerticalLayout from '@/layout/verticalLayout/index.vue';
import HorizontalLayout from '@/layout/horizontalLayout/index.vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { router } from '@/router/index';
import ZHRequest from '@/components/zh-request';
import { updateMenuToRouter, convertMenuArrToTree } from '@/utils/dataConvert';
import storage from '@/utils/storage';
import api from '@/api/login';
import { store as summaryStore } from '@/stores/index';
import { useLocale } from '@/locales/useLocale';
import { LocaleType } from '@/locales/type';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

const isMobile = storage.getIsMobile();

const toggleSideBar = () => { 
  if (isMobile) {
    store.changeIsOpenDrawerMenu(true);
  } else {
    store.toggleCollapse(); 
  }
};

const userInfo = ref({} as any);

onMounted(() => {
  userInfo.value = storage.getUserInfo();
});

// 退出登录事件
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    sessionStorage.clear();
    localStorage.clear();
    router && router.push('/');
    location.reload();
    // summaryStore.state;
  }
};

const locale = useLocale();
const changeLanguage = async (command: string | number | object) => {
  
  await locale.changeLocale(command as LocaleType);

};


const fullscreen = ref(false);
const toggleFullScreen = () => {
  UIHelper.toggleFullScreen(document.body, !fullscreen.value);
  fullscreen.value = !fullscreen.value;
};

// const router = useRouter();
const  changeLayout = async () => {
  const roots = router!.getRoutes();
  // const rootName = roots[roots.length - 1].name || '';
  // router!.removeRoute(rootName);

  const params = {
    url: api.getMenus,
    conditions: {},
  };
  const result = await ZHRequest.get(params);
  // console.log(result);
  // RouteRecordRaw[]
  const routes:RouteRecordRaw[] = result.data;
  const list:RouteRecordRaw[] = convertMenuArrToTree(routes);
  updateMenuToRouter(list);
  const rou: RouteRecordRaw =  {
    path: '/',
    component: () => import('@/layout/horizontalLayout/index.vue'),
    name: 'root',
    children: [
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      name: '首页',
      meta: {
        title: '首页',
      }
    },
      ...list,
    ],
  };
  router!.addRoute(rou);
  router!.push('/dashboard');
};
</script>

<style lang="scss" scoped>
@import '../../index.scss';
@import './index.scss';
</style>
