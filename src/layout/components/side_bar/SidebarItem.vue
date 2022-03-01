<!--
 * @Author: zzh
 * @Date: 2022-02-25 16:48:39
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-28 17:23:45
 * @Description: 导航组件
 * @FilePath: \zh-admin\src\layout\components\side_bar\SidebarItem.vue
-->
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
  <el-menu
    class="el-menu-vertical"
    :default-active="defaultSelectTab"
    :collapse="!props.collapse"
    @open="handleOpen"
    @close="handleClose"
    :collapse-transition="false"
    router
  >
    <el-sub-menu index="1">
      <template #title>
        <i class="iconfont iconquanxian"></i>
        <span class="tab">权限管理</span>
      </template>
        <el-menu-item index="/authorityManagement/userManagement" @click="goto('/authorityManagement/userManagement', '用户管理')">
          <i class="iconfont icondingdan" /> <span class="tab sub">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/authorityManagement/roleManagement" @click="goto('/authorityManagement/roleManagement', '角色管理')">
          <i class="iconfont icondingdan" /> <span class="tab sub">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/authorityManagement/organizationalStructure" @click="goto('/authorityManagement/organizationalStructure', '组织架构')">
          <i class="iconfont icondingdan" /> <span class="tab sub">组织架构</span>
        </el-menu-item>
        <el-menu-item index="/authorityManagement/menuManagement" @click="goto('/authorityManagement/menuManagement', '菜单管理')">
          <i class="iconfont icondingdan" /> <span class="tab sub">菜单管理</span>
        </el-menu-item>
        <!-- <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
    
    <!-- <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item> -->
  </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps} from 'vue';
import { useLayoutStore } from '../../../stores';
import { storeToRefs } from 'pinia';


const store = useLayoutStore();

const props = defineProps({
  collapse: {
      type: Boolean,
      default: true
  }
});


const router = useRouter();

// const onRoutes = () => { return router.meta.fatherPath ? router.meta.fatherPath + '' : router.path + ''; };

const defaultSelectTab = computed(() => { return router.currentRoute.value.path; });


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const goto = (path:string, tagName: string) => {
    router.push({
        path,
    });
store.addCachedViews(tagName);
};
</script>

<style lang="scss">
.el-menu-vertical {
  width: 100%;
  border-right: none !important;

  .tab {
    font-size: 16px;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  min-height: 400px;
}

.iconfont {
    margin-right: 5px;
}
</style>