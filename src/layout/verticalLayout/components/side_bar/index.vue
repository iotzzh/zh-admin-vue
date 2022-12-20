<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- <SidebarLogo v-if="showLogo" :collapse="collapse" /> -->
    <div style="height: 45px;">Logo 占位</div>
    <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">
      <el-menu class="menu el-menu-vertical" router :collapse="!collapse" :collapse-transition="false">
        <SidebarItem v-for="menu in menuList" :key="menu.id" :item="menu"></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLayoutStore } from '@/layout/layout';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

let menuList = ref([
  {
    id: '001',
    name: '首页导航',
    url: '/dashboard',
    icon: 'icon-menu1',
  },
  {
    id: '002',
    name: '测试页',
    icon: 'icon-menu1',
    children: [
      {
        id: '003',
        name: '首页导航',
        url: '/layoutExamplesExample1',
        icon: 'icon-menu1',
      },
    ],
  },
  {
    id: '004',
    name: '测试页1',
    icon: 'icon-menu1',
    children: [
      {
        id: '0031',
        name: '首页导航1',
        url: '/tableExample1',
      },
    ],
  },
  {
    id: '005',
    name: '测试页2',
    icon: 'icon-menu1',
    children: [
      {
        id: '0051',
        name: '首页导航11',
        url: '/tableExample2',
      },
    ],
  }
] as any);

const router = useRouter();
const showLogo = ref(true);
const defaultSelectTab = computed(() => {
  return router.currentRoute.value.path;
});

</script>


<style lang="scss" scoped>
.has-logo {
  .scrollbar {
    height: calc(100vh - 45px);

    &:deep(.el-scrollbar__view) {
      height: 100%;
    }

    .el-menu-vertical {
      height: 100%;
      border-right: 0px;
      // background: linear-gradient(to bottom, #7234c3, #496be7);
      background: #fff;
    }
  }
}

.menu.el-menu-vertical {
  background-color: rgb(12,33,53) !important;
  --el-menu-text-color: rgb(255, 255, 255, 0.8) !important;
  --el-menu-hover-text-color: red !important;
  --el-menu-bg-color: rgb(12,33,53);
  --el-menu-hover-bg-color: rgba(9,96,189, 0.8) !important;
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
</style>
