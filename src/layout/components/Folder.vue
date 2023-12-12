<template>
  <div class="folder-box">
    <span class="icon" @click="toggleSideBar">
      <i v-if="collapse" class="iconfont icon-zhedie1" />
      <i v-else class="iconfont icon-zhedie2" />
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useLayoutStore } from '@/layout/store';
  import storage from '@/utils/storage';

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
  .folder-box {
    display: flex;
    align-items: center;
    color: var(--el-text-color-regular);
    font-size: var(--el-font-size-base);

    .icon {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      top: 2px;
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
