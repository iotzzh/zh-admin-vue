<template>
  <div class="navbar">
    <div class="left">
      <span class="icon" @click="toggleSideBar">
        <i v-if="collapse" class="iconfont icon-zhedie1" />
        <i v-else class="iconfont icon-zhedie2" />
      </span>

      <span class="menu">
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            菜单
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>子菜单1</el-dropdown-item>
              <el-dropdown-item>子菜单2</el-dropdown-item>
              <el-dropdown-item>子菜单3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>/子菜单
      </span>
    </div>

    <!-- info -->
    <div class="info">
      <!-- <span>搜索</span> -->
      <span class="bell"><el-badge is-dot class="item"><el-icon><Bell /></el-icon></el-badge></span>

      <span class="fullscreen" @click="toggleFullScreen">
        <i v-if="fullscreen" class="iconfont icon-fullscreen-shrink"></i>
        <i v-else class="iconfont icon-fullscreen-expand"></i>
      </span>
      
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <i :size="50" class="iconfont icon-language-outline" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">中文</el-dropdown-item>
            <el-dropdown-item command="logout">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <span>个人信息（头像 + Name）</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="setting-icon" @click="changeLayout"><el-icon>
          <Setting />
        </el-icon></span>
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
import { updateMenuToRouter } from '@/utils/dataConvert';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);
const toggleSideBar = () => { store.toggleCollapse(); };

const userInfo = ref({} as any);

onMounted(() => {
  // userInfo.value = storage.getUserInfo();
});

// 退出登录事件
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    // logout();
  }
};


const fullscreen = ref(false);
const toggleFullScreen = () => {
  UIHelper.toggleFullScreen(document.body, !fullscreen.value);
  fullscreen.value = !fullscreen.value;
};

// const router = useRouter();
const  changeLayout = async () => {
  const roots = router!.getRoutes();
  const rootName = roots[roots.length - 1].name || '';
  router!.removeRoute(rootName);

  const params = {
    url: '/api/menu/list',
    conditions: {},
  };
  const result = await ZHRequest.post(params);
  console.log(result);
  // RouteRecordRaw[]
  const routes:RouteRecordRaw[] = result.data.records;
  updateMenuToRouter(routes);
  const rou: RouteRecordRaw =  {
    path: '/',
    component: () => import('@/layout/horizontalLayout/index.vue'),
    name: 'root1',
    children: routes,
  }
  ;

  // RouteRecordRaw
  // const rou:RouteRecordRaw = {
  //   path: '/',
  //   component: () => import('@/layout/horizontalLayout/index.vue'),
  //   name: 'root1',
  //   children: [
  //   {
  //       path: 'dashboard',
  //       name: 'dashboard',
  //       component: () => import('@/views/dashboard/index.vue'),
  //       meta: {
  //         title: '首页',
  //       },
  //     },
  //     {
  //       path: '/layoutExamplesExample1',
  //       name: 'layoutExamplesExample1',
  //       component: () => import('@/examples/zh-layout-examples/eaxmple1.vue'),
  //       meta: {
  //         title: 'layoutExamplesExample1',
  //       },
  //     },
  //     {
  //       path: '/tableExample1',
  //       name: 'tableExample1',
  //       component: () => import('@/examples/zh-table-examples/example1.vue'),
  //       meta: {
  //         title: 'tableExample1',
  //       },
  //     },
  //     {
  //       path: '/tableExample2',
  //       name: 'tableExample2',
  //       component: () => import('@/examples/zh-virtual-scroll-table-examples/example1.vue'),
  //       meta: {
  //         title: 'tableExample2',
  //       },
  //     }
  //   ]
  // };


  router.addRoute(rou);
  router.push('/authorityManagement/userManagement');
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
