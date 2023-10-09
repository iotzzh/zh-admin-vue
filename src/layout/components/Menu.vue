<template>
  <div class="nav">
    <el-scrollbar class="scrollbar">
      <el-menu
        class="menu"
        :mode="mode"
        :collapse="!collapse"
        router
        :default-active="$route.path"
        @select="changeSelectMenu"
      >
        <MenuItem v-for="route in menuList" :key="route.id" :item="route"></MenuItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, PropType, toRefs } from 'vue';
  import { storeToRefs } from 'pinia';
  import MenuItem from './MenuItem.vue';

  import { useLayoutStore } from '@/layout/store';
  import { appendRouter } from '@/router';
  import ZHRequest from '@/components/zh-request';
  import api from '@/api';

  enum ModeType {
    horizontal = 'horizontal',
    vertical = 'vertical',
  }

  const props = defineProps({
    mode: {
      type: String as PropType<ModeType>,
      required: true,
      default: 'vertical',
    },
  });

  const { mode } = toRefs(props);

  const ROUTE_DATA_SOURCE = import.meta.env.VITE_ROUTE_DATA_SOURCE || 'file';

  const menuList = ref([] as any);
  onMounted(async () => {
    const params = {
      url: api.getRouteList,
      conditions: {},
    };
    const result = await ZHRequest.post(params);
    menuList.value =
      result?.data?.records.sort((x, y) => {
        if (x.sortNo - y.sortNo >= 0) return 1;
        else return -1;
      }) || [];

    if (ROUTE_DATA_SOURCE === 'api') appendRouter(result.data.records);
  });

  const store = useLayoutStore();
  const { collapse } = storeToRefs(store);

  const changeSelectMenu = (index: any, indexPath: any) => {
    store.changeIsOpenDrawerMenu(false);
  };
</script>

<style lang="scss" scoped>
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

      .menu {
        border-bottom: none;
        border-right: none;
        height: 100%;
      }
    }
  }

  .el-menu.el-menu--vertical.menu {
    background-color: rgb(12, 33, 53) !important;
    --el-menu-text-color: rgb(255, 255, 255, 0.8) !important;
    --el-menu-hover-text-color: red !important;
    --el-menu-bg-color: rgb(12, 33, 53);
    --el-menu-hover-bg-color: rgba(9, 96, 189, 0.8) !important;

    // --el-color-primary
    // --el-menu-active-color: rgb(255, 255, 255, 1) !important;
    &:deep(.el-menu-item) {
      color: rgb(255, 255, 255, 0.8) !important;
    }

    &:deep(.el-menu-item.is-active) {
      color: white !important;
      // background-color: rgba(9,96,189, 0.8);
      background-color: var(--el-color-primary);
    }
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

  .el-menu--horizontal > .el-menu-item {
    height: 100%;
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
</style>
