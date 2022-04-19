<template>
  <div :class="{ 'has-logo': showLogo }" class="sideWrap">
    <SidebarLogo v-if="showLogo" :collapse="collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical"
        :collapse="!collapse"
        @open="handleOpen"
        @close="handleClose"
        :collapse-transition="false"
        router
      >
        <SidebarItem
          v-for="route in menuList"
          :key="route.id"
          :item="route"
        ></SidebarItem>
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
import { useLayoutStore } from '../../../../stores/layout';
import { convertMenuArrToTree } from '../../../../utils/dataConvert';
import { MenuNode } from '../../../../model/menuNode';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

let menuList: MenuNode[] = reactive([]);

const getMenuData = async () => {
  menuList = convertMenuArrToTree(store.menuList);
};

getMenuData();
console.log(menuList);

const showLogo = ref(true);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'open');
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
}
</style>
