<!--
 * @Author: zzh
 * @Date: 2022-02-25 16:48:39
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-04 09:22:49
 * @Description: 导航组件
 * @FilePath: \hwason-laboratory-systems\src\layout\horizontalLayout\components\navigationBar\SidebarItem.vue
-->
<template>
  <el-sub-menu :index="item?.id">
    <template #title>
      <span class="tab">{{ item?.permsionName }}</span>
    </template>

    <div v-for="(child, index) in item?.children" :key="index">
      <template v-if="child.children && child.children.length > 0">
        <sidebar-item :key="child.id" :item="child" />
      </template>
      <el-menu-item v-else :index="child.url">
        <!-- <i :class="child?.icon" /> -->
        <span class="tab sub">{{ child.permsionName }}</span>
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, PropType, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { useLayoutStore } from '../../../../stores';
import { get } from '../../../../utils/request';
import api from '../../../../api/layout';
import { storeToRefs } from 'pinia';
import { menuListData } from '.././../mockData';
import { convertMenuArrToTree, MenuNode } from '../../../../utils/dataConvert';

const store = useLayoutStore();

const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  },
  item: {
    type: Object as PropType<MenuNode>,
  },
});

const { item, collapse } = toRefs(props);

const router = useRouter();

// let menuList = ref({});

// 获取菜单列表
// const params = {
//   token: '9baf50bf7efb46ebbd8145b9d3eb9db4',
//   callbackName: ''
// };

// const getMenuData = async () => {
//   // const result = await get(api.getMenuList, params, '', '', 10000);
//   // menuList.value = result.data;
//   menuList.value = convertMenuArrToTree(menuListData as MenuNode[]);
// };

// getMenuData();
// console.log(menuList.value);



</script>

<style lang="scss">
// .el-menu-vertical {
//   width: 100%;
//   border-right: none !important;

//   .tab {
//     font-size: 16px;
//   }
// }

// .el-menu-vertical:not(.el-menu--collapse) {
//   min-height: 400px;
// }

// .iconfont {
//   margin-right: 5px;
// }
</style>