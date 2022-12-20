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
          <SidebarItem v-for="route in menuList && menuList.children" :key="route.id" :item="route"></SidebarItem>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- fullscreen -->
    <div @click="clickFullscreen">
      <el-tooltip class="box-item" effect="dark" :content="isFullscreen ? `退出全屏` : `全屏`" placement="bottom">
        <el-icon class="fullScreen" color="#fff">
          <full-screen />
        </el-icon>
      </el-tooltip>
    </div>

    <!-- info -->
    <div class="info">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <!-- <span class="el-dropdown-link">{{ userInfo.orgstaFullName }}</span> -->
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
const store = useLayoutStore();

// const userInfo = storage.getUserInfo();


let menuList = ref([] as any);

const getMenuData = async () => {
  // 刷新的时候，menuList会被清除
  if (store.allMenuList)
    // menuList = convertMenuArrToTree(store.menuList);
    menuList.value = store.allMenuList.find((x: any) => x.permsionName === store.systemName);
};
getMenuData();


// 退出登录事件
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    // logout();
  }
};

// 点击全屏
let isFullscreen = ref(false);
const clickFullscreen = () => {
  let element: any = document.documentElement;
  let documentEL = document as any;
  if (isFullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (documentEL.webkitCancelFullScreen) {
      documentEL.webkitCancelFullScreen();
    } else if (documentEL.mozCancelFullScreen) {
      documentEL.mozCancelFullScreen();
    } else if (documentEL.msExitFullscreen) {
      documentEL.msExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  }
  isFullscreen.value = !isFullscreen.value;
};

onMounted(() => {
  console.log();
});
</script>


<style lang="scss" scoped>
.nav-bar {
  // background-color: #6196EA;
  background-color: $mainColor;
  height: 59px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;

  .logo {
    width: 200px;
    height: 100%;
  }

  .nav {
    flex: 1;
    background-color: #f5f5f5;

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

    :deep(.el-menu--horizontal>.el-menu-item) {
      color: #fff !important;
    }

    :deep(.el-scrollbar__view>.el-menu--horizontal>.el-menu-item.is-active) {
      // color: #fff !important;
      color: black !important;
    }

    :deep(.el-menu--horizontal .el-menu-item:not(.is-disabled):hover) {
      color: var(--el-text-color-primary) !important;
    }
  }

  .info {
    width: 100px;
    line-height: 59px;
    height: 59px;
    text-align: center;
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

  &:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title) {
    color: $menu-text-color !important;
  }

  &:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover) {
    color: var(--el-menu-text-color) !important;
  }
}
</style>

