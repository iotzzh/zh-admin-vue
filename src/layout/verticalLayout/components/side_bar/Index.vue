<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-03 11:27:23
 * @Description: 侧边栏
 * @FilePath: \hwason-laboratory-systems\src\layout\verticalLayout\components\side_bar\Index.vue
-->
<template>
  <div :class="{'has-logo': showLogo}" class="sideWrap">
    <SidebarLogo v-if="showLogo" :collapse="collapse" />
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
import { useLayoutStore } from '../../../../stores';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { get } from '../../../../utils/request';
import api from '../../../../api/layout';
import { menuListData } from '.././../mockData';
import { convertMenuArrToTree, MenuNode } from '../../../../utils/dataConvert';

// const store = useLayoutStore();
// const { collapse } = storeToRefs(store);

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

let menuList: MenuNode[] = reactive([]);

// 获取菜单列表
// const params = {
//   token: '9baf50bf7efb46ebbd8145b9d3eb9db4',
//   callbackName: ''
// };

const getMenuData = async() => {
  // const result = await get(api.getMenuList, params, '', '', 10000);
  // menuList.value = result.data;
  menuList = convertMenuArrToTree(menuListData as MenuNode[]);
};

getMenuData();
console.log(menuList);


const router = useRouter();
const showLogo = ref(true);
const defaultSelectTab = computed(() => { return router.currentRoute.value.path; });

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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
