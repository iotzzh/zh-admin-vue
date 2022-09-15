<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-06-04 22:43:59
 * @Description: 侧边栏logo(需要跟随侧边栏折叠)
 * @FilePath: \zh-admin\src\layout\verticalLayout\components\side_bar\SidebarLogo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="[props.collapse ? 'collapse' : 'notitle']">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/dashboard">
        <img class="sidebar-logo animate__animated animate__bounce" src="@/assets/images/logo.png" />
        <p v-if="props.collapse" class="animate__animated animate__bounce">后台管理系统</p>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
});

</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
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
      width: auto;
      // background-color: #435ebe;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 12px;
    }
  }
  &.notitle {
    .sidebar-title {
      display: none;
    }
    & .sidebar-logo {
      height: 60%;
    }
  }
}
</style>
