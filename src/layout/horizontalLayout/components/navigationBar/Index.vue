<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-03 15:11:21
 * @Description: 导航栏
 * @FilePath: \hwason-laboratory-systems\src\layout\horizontalLayout\components\navigationBar\Index.vue
-->
<template>
  <div class="nav-bar">
    <div class="logo">
      <SidebarLogo />
    </div>

    <div class="nav">
      <el-scrollbar class="scrollbar">
        <el-menu class="menu" @open="handleOpen" @close="handleClose" mode="horizontal" router>
          <SidebarItem v-for="route in menuList" :key="route.id" :item="route"></SidebarItem>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="info">个人信息</div>
  </div>
</template>

<script setup lang="ts">
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import { useLayoutStore } from '../../../../stores';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import { defineProps } from 'vue';
// import { get } from '../../../../utils/request';
// import api from '../../../../api/layout';
import { menuListData } from '.././../mockData';
import { convertMenuArrToTree, MenuNode } from '../../../../utils/dataConvert';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);

// const store = useLayoutStore();
// const { collapse } = storeToRefs(store);

let menuList: MenuNode[] = reactive([]);

// 获取菜单列表
// const params = {
//   token: '9baf50bf7efb46ebbd8145b9d3eb9db4',
//   callbackName: ''
// };

const getMenuData = async () => {
  // const result = await get(api.getMenuList, params, '', '', 10000);
  // menuList.value = result.data;
  menuList = convertMenuArrToTree(menuListData as MenuNode[]);
};

getMenuData();
console.log(menuList);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script>


<style lang="scss">
.nav-bar {
  background-color: red;
  height: 59px;
  width: 100%;
  display: flex;
  .logo {
    width: 200px;
  }
  .nav {
    flex: 1;
    background-color: blue;
    .scrollbar {
      text-align: right;
      background-color: yellow;
      .menu {
        background-color: pink;
        height: 100%;
        justify-content: right;
      }
    }
  }

  .info {
    width: 200px;
    line-height: 59px;
    text-align: center;
    vertical-align: middle;
  }
}
</style>

