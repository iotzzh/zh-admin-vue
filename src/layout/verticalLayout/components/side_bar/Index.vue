<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 17:09:21
 * @Description: 侧边栏
 * @FilePath: \zh-admin\src\layout\verticalLayout\components\side_bar\Index.vue
-->
<template>
  <div :class="{'has-logo': showLogo}" class="sideWrap">
    <SidebarLogo v-if="showLogo" :collapse="collapse" />
    <!-- <TagsView></TagsView> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical"
        :default-active="defaultSelectTab"
        :collapse="!collapse"
        @open="handleOpen"
        @close="handleClose"
        :collapse-transition="false"
        router
      >
        <SidebarItem v-for="route in menuList" :key="route.id" :item="route"></SidebarItem>
      </el-menu>
    </el-scrollbar>
    
  </div>
  
</template>

<script setup lang="ts">
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import TagsView from '../tags_view/Index.vue'
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLayoutStore } from '../../../../stores/layout';
import { convertMenuArrToTree } from '../../../../utils/dataConvert';
import { MenuNode } from '../../../../model/menuNode';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

let menuList: MenuNode[] = reactive([]);

const getMenuData = async() => {
   menuList = convertMenuArrToTree(store.menuList);
};

getMenuData();
console.log(menuList);


const router = useRouter();
const showLogo = ref(true);
const defaultSelectTab = computed(() => { return router.currentRoute.value.path; });

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath,'open');
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script>


<style lang="scss">
</style>

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
