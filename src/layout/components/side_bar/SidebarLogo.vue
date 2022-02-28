<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-28 16:19:03
 * @Description: 侧边栏logo(需要跟随侧边栏折叠)
 * @FilePath: \zh-admin\src\layout\components\side_bar\SidebarLogo.vue
-->
<template>
  <div
    class="sidebar-logo-container"
    :class="[props.collapse ? 'collapse': 'notitle']"
  >
    <!-- <transition name="sidebarLogoFade">

    </transition> -->
          <router-link
        key="expand"
        class="sidebar-logo-link"
        to="/dashboard"
      >
        <img
          class="sidebar-logo"
          src="@/assets/img/fold_icon.png"
        >
        <h1 class="sidebar-title">实验室管理系统</h1>
      </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps} from 'vue';

const props = defineProps({
  collapse: {
      type: Boolean,
      default: true
  }
});

</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  // transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  // margin-bottom: 20px;
  margin-top: 10px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      display: inline-block;
      height: 100%;
      background-color: #435EBE;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #435EBE;
      font-weight: 600;
      line-height: 50px;
      font-size: 22px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 12px;
    }
  }
  &.notitle{
    .sidebar-title{
      display: none;
    }
       & .sidebar-logo {
      height: 60%;
    }
  }
}
</style>
