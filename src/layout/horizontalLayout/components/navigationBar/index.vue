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

    <!-- info -->
    <div class="info">
      <!-- <span>搜索</span> -->
      <span class="bell"><el-badge is-dot class="item"><el-icon>
            <Bell />
          </el-icon></el-badge></span>

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
      <span class="setting-icon" @click="clickChangeLayout">
        <i class="iconfont icon-layout-2-fill"></i>
      </span>
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <span>{{ userInfo?.name }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';

const store = useLayoutStore();

const menuList = ref([] as any);
const userInfo = ref({} as any);
onMounted(() => {
  // userInfo.value = storage?.getUserInfo();
  userInfo.value = {
    name: '测试名',
  };
});

onMounted(async () => {
  const params = {
    url: api.getMenuList,
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
.nav-bar {
  background-color: white;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px;

  .logo {
    width: 200px;
    height: 100%;
  }

  .nav {
    flex: 1;
    overflow: auto;

    .scrollbar {
      text-align: right;
      background-color: #f5f5f5;

      .menu {
        background-color: $mainColor;
        border-bottom: none;
        height: 100%;
        justify-content: right;
      }
    }
  }

  .info {
    line-height: 59px;
    height: 59px;
    text-align: right;
    vertical-align: middle;

    .el-dropdown {
      vertical-align: middle !important;
      cursor: pointer;
      font-size: 14px;
      color: $menu-text-color;
      font-weight: bolder;
    }
  }

  .fullScreen {
    line-height: 59px;
    margin-left: 15px;
    vertical-align: middle;
    cursor: pointer;
  }

  span,
  .lang {
    padding-left: 12px !important;
  }

  .name {
    height: 18px;
    font-weight: bolder;
    font-size: 17px !important;
  }

  .lang {
    font-size: 20px !important;
  }

  .fullscreen {
    cursor: pointer;
    position: relative;
    top: 3px;

    .iconfont {
      font-size: 20px !important;
    }
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

  .bell {
    cursor: pointer;

    .item {
      height: 21px;
      position: relative;

      &:deep(.el-icon) {
        font-size: 20px !important;
        position: absolute;
        right: 0px;
        top: 0px;
      }
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

.info {
  width: 250px;
  line-height: 59px;
  height: 59px;
  text-align: right;
  vertical-align: middle;
  padding-right: 22px;

  .bell {
    cursor: pointer;

    .item {
      height: 21px;
      position: relative;

      &:deep(.el-icon) {
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }
  }

  span {
    padding: 0px 5px;
  }

  .name {
    height: 18px;
  }

  .fullscreen {
    cursor: pointer;
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

.iconfont {
  margin-right: 0px;
  padding-right: 0px;
}
</style>
