<template>
  <div class="nav-bar">
    <!-- logo -->
    <div class="logo">
      <SidebarLogo />
    </div>
    <!-- nav -->
    <Menu mode="horizontal"></Menu>
    <User></User>
  </div>
</template>

<script setup lang="ts">
  import User from '@/layout/components/User.vue';
  import SidebarLogo from './SidebarLogo.vue';
  import Menu from '@/layout/components/Menu.vue';
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

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid rgba(9, 96, 189, 1) !important;
  }

  .el-sub-menu__title:hover {
    // background-color: red !important;
  }

  .el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
    // background-color: red;
  }

  .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
    background-color: transparent !important;
    color: black !important;
  }

  .iconfont {
    margin-right: 0px;
    padding-right: 0px;
  }
</style>
