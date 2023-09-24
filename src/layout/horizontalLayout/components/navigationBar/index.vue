<template>
  <div class="nav-bar">
    <!-- logo -->
    <div class="logo">
      <SidebarLogo />
    </div>

    <!-- nav -->
    <div class="nav">
      <el-scrollbar class="scrollbar">
        <el-menu class="menu" mode="horizontal" router>
          <SidebarItem v-for="route in menuList" :key="route.id" :item="route"></SidebarItem>
        </el-menu>
      </el-scrollbar>
    </div>

    <User></User>
  </div>
</template>

<script setup lang="ts">
import User from '@/layout/components/User.vue'
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import { ref, reactive, onMounted } from 'vue';
import { useLayoutStore } from '@/layout/store';
import UIHelper from '@/utils/uiHelper';
import { appendRouter, router } from '@/router';
import { RouteRecordRaw } from 'vue-router';
import ZHRequest from '@/components/zh-request';
import storage from '@/utils/storage';
import api from '@/api';
import { useLocale } from '@/locales/useLocale';
import { LocaleType } from '@/locales/type';
import pinyin from 'js-pinyin';

const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';

const store = useLayoutStore();

const menuList = ref([] as any);
const userInfo = ref({} as any);
onMounted(() => {
  // userInfo.value = storage?.getUserInfo();
  userInfo.value = {
    name: '李太白',
  };
});

onMounted(async () => {
  const params = {
    url: api.getRouteList,
    conditions: {},
  };
  const result = await ZHRequest.post(params);
  menuList.value = result?.data?.records || [];

  if (ROUTE_DATA_SOURCE === 'api') appendRouter(result.data.records);
});

// 退出登录事件
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    sessionStorage.clear();
    localStorage.clear();
    router && router.push('/');
    location.reload();
  }
};

const fullscreen = ref(false);
const toggleFullScreen = () => {
  UIHelper.toggleFullScreen(document.body, !fullscreen.value);
  fullscreen.value = !fullscreen.value;
};

const locale = useLocale();
const changeLanguage = async (command: string | number | object) => {
  await locale.changeLocale(command as LocaleType);
};

const clickChangeLayout = () => store.setLayout('vertical');
</script>

<style lang="scss" scoped>
@import '../../../index.scss';

.nav-bar {
  background-color: white;
  height: $topBarHeight;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;

  .logo {
    width: 200px;
    height: 100%;
  }

  .nav {
    flex: 1;
    overflow: auto;
    height: 100%;

    .scrollbar {
      text-align: right;
      background-color: #f5f5f5;
      height: 100%;

      &:deep(.el-scrollbar__view) {
        height: 100%;
      }

      &:deep(.el-menu-item) {
        height: 100%;
        overflow: hidden;
      }

      .menu {
        background-color: $mainColor;
        border-bottom: none;
        height: 100%;
        // justify-content: right;
      }
    }
  }

  .info {
    // line-height: $topBarHeight;
    // height: $topBarHeight;
    text-align: right;
    vertical-align: middle;
    padding-left: 20px;
    padding-right: 10px;
    display: flex;

    .item {
      height: 100%;
      width: 34px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .iconfont {
      font-size: 20px !important;
    }

    .avatar {
      text-align: center;
    }

    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 10px;
    }

    .name span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .name span span:nth-child(1) {
      padding-bottom: 2px;
    }

    .name span span:nth-child(2) {
      padding-left: 5px;
    }

    .lang {
      font-size: 20px !important;
    }

    .el-dropdown {
      vertical-align: middle !important;
      cursor: pointer;
      font-size: 14px;
      font-weight: bolder;
    }

    .setting-icon {
      cursor: pointer;
    }
  }
}

.nav-bar .info .el-dropdown {
  color: var(--el-menu-text-color);
}

.el-menu.el-menu--horizontal.menu {
  // background-color: rgb(12,33,53) !important;
  background-color: white !important;
  --el-menu-text-color: black !important;
  --el-menu-hover-text-color: var(--el-color-primary) !important;
  --el-menu-bg-color: rgb(12, 33, 53);
  // --el-menu-hover-bg-color: rgba(9,96,189, 0.8) !important;
  // --el-menu-hover-bg-color: white !important;
  // --el-color-primary
  // --el-menu-active-color: rgb(255, 255, 255, 1) !important;
  --el-menu-active-color: var(--el-color-primary) !important;

  &:deep(.el-menu-item) {
    // color: rgb(255, 255, 255, 0.8) !important;
    color: black !important;
  }

  &:deep(.el-menu-item.is-active) {
    // color: white !important;
    // background-color: rgba(9,96,189, 0.8);
    // background-color: var(--el-color-primary);
    // background-color: white !important;
  }
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid rgba(9, 96, 189, 1) !important;
}

.el-sub-menu__title:hover {
  // background-color: red !important;
}

.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover {
  // background-color: red;
}

.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus {
  background-color: transparent !important;
  color: black !important;
}

.iconfont {
  margin-right: 0px;
  padding-right: 0px;
}
</style>
