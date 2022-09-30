<<<<<<< HEAD
<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-03 15:11:21
 * @Description: 导航栏
 * @FilePath: \hwason-laboratory-systems\src\layout\horizontalLayout\components\navigationBar\Index.vue
-->
<template>
  <div class="nav-bar">
=======
<template>
  <div class="nav-bar">
    <!-- logo -->
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
    <div class="logo">
      <SidebarLogo />
    </div>

<<<<<<< HEAD
=======
    <!-- nav -->
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
    <div class="nav">
      <el-scrollbar class="scrollbar">
        <el-menu class="menu" @open="handleOpen" @close="handleClose" mode="horizontal" router>
          <SidebarItem v-for="route in menuList" :key="route.id" :item="route"></SidebarItem>
        </el-menu>
      </el-scrollbar>
    </div>

<<<<<<< HEAD
    <div class="info">个人信息</div>
=======
    <!-- fullscreen -->
    <div @click="clickFullscreen">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="isFullscreen ? `退出全屏` : `全屏`"
        placement="bottom"
      >
        <el-icon class="fullScreen" color="#fff">
          <full-screen />
        </el-icon>
      </el-tooltip>
    </div>

    <!-- info -->
    <div class="info">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link">个人信息</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
  </div>
</template>

<script setup lang="ts">
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
<<<<<<< HEAD
import { useLayoutStore } from '../../../../stores';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import { defineProps } from 'vue';
// import { get } from '../../../../utils/request';
// import api from '../../../../api/layout';
import { menuListData } from '.././../mockData';
import { convertMenuArrToTree, MenuNode } from '../../../../utils/dataConvert';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

// const store = useLayoutStore();
// const { collapse } = storeToRefs(store);

let menuList: MenuNode[] = reactive([]);

// 获取菜单列表
// const params = {
//   token: '9baf50bf7efb46ebbd8145b9d3eb9db4',
//   callbackName: ''
// };

const getMenuData = async () => {
  // const result = await get(api.getMenuList, params, '', '', 10000);
  // menuList.value = result.data;
  menuList = convertMenuArrToTree(menuListData as MenuNode[]);
};

getMenuData();
console.log(menuList);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
=======
import { ref, reactive } from 'vue';
import { useLayoutStore } from '../../../../stores/layout';
import { convertMenuArrToTree } from '../../../../utils/dataConvert';
import { MenuNode } from '../../../../model/menuNode';

const store = useLayoutStore();

let menuList: MenuNode[] = reactive([]);

const getMenuData = async () => {
  // 刷新的时候，menuList会被清除
  if (store.menuList)
  menuList = convertMenuArrToTree(store.menuList);
};
getMenuData();

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

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
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
};

</script>


<style lang="scss">
.nav-bar {
<<<<<<< HEAD
  background-color: red;
  height: 59px;
  width: 100%;
  display: flex;
  .logo {
    width: 200px;
  }
  .nav {
    flex: 1;
    background-color: blue;
    .scrollbar {
      text-align: right;
      background-color: yellow;
      .menu {
        background-color: pink;
=======
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
    .scrollbar {
      text-align: right;
      .menu {
        border-bottom: none;
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
        height: 100%;
        justify-content: right;
      }
    }
  }

  .info {
<<<<<<< HEAD
    width: 200px;
    line-height: 59px;
    text-align: center;
    vertical-align: middle;
=======
    width: 100px;
    line-height: 59px;
    height: 59px;
    text-align: center;
    vertical-align: middle;
    .el-dropdown {
      vertical-align: middle !important;
      cursor: pointer;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .fullScreen {
    line-height: 59px;
    margin-left: 15px;
    vertical-align: middle;
    cursor: pointer;
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
  }
}
</style>

