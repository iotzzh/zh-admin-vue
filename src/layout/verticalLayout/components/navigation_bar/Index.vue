<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-05-02 22:56:32
 * @Description: 导航栏，包含折叠，最大化，个人信息
 * @FilePath: \zh-admin\src\layout\verticalLayout\components\navigation_bar\Index.vue
-->
<template>
  <div class="navbar">
    <!-- toggle icon -->
    <el-icon :size="30" @click="toggleSideBar">
      <i class="iconfont icon-zhedie1" v-if="collapse" />
      <i class="iconfont icon-zhedie2" v-else />
    </el-icon>
    <!-- info -->
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          15655395332
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                退出
              </el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- fullscreen -->
      <div @click="clickFullscreen">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="isFullscreen?`退出全屏`:`全屏`"
        placement="bottom"
      >
      <el-icon class="fullScreen"><full-screen /></el-icon>
      </el-tooltip>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, toRefs } from 'vue';
import { useLayoutStore } from '../../../../stores';
import { storeToRefs } from 'pinia';


const store = useLayoutStore();
const { collapse } = storeToRefs(store);
const toggleSideBar = () => { console.log('qiehuan'); store.toggleCollapse(); };

// 点击全屏
let isFullscreen = ref(false);
const clickFullscreen = () => {
  const documentX:any = document;
  let element:any = documentX.documentElement;
      if (isFullscreen.value) {
        if (documentX.exitFullscreen) {
          documentX.exitFullscreen();
        } else if (documentX.webkitCancelFullScreen) {
          documentX.webkitCancelFullScreen();
        } else if (documentX.mozCancelFullScreen) {
          documentX.mozCancelFullScreen();
        } else if (documentX.msExitFullscreen) {
          documentX.msExitFullscreen();
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

</script>

<style lang="scss" scoped>

.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 5px;
  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        margin-top: 15px;
        margin-right: 16px;
        margin-left: 16px;
        position: relative;
      }
    }
    .fullScreen {
      cursor: pointer;
      color: #909090;
    }
  }
}
</style>
