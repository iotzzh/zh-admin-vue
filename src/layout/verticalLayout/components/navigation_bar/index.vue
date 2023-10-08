<template>
  <div class="navbar">
    <Folder></Folder>
    <User></User>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useLayoutStore } from '@/layout/store';
  import storage from '@/utils/storage';
  import User from '@/layout/components/User.vue';
  import Folder from '@/layout/components/Folder.vue';

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
</script>

<style lang="scss" scoped>
  @import '../../index.scss';
  .navbar {
    height: $topBarHeight;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding-left: 7px;

    .left {
      height: $topBarHeight;
      line-height: $topBarHeight;
      vertical-align: middle;
      color: var(--el-text-color-regular);
      font-size: var(--el-font-size-base);

      .icon {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        top: 2px;
      }
    }
  }

  .iconfont.icon-zhedie1,
  .iconfont.icon-zhedie2 {
    font-size: 20px;
    cursor: pointer;
  }

  .iconfont {
    margin-right: 0px;
    padding-right: 0px;
  }
</style>
