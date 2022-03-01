<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:07:01
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-28 17:05:36
 * @Description: 布局入口
 * @FilePath: \zh-admin\src\layout\Index.vue
-->
<template>
<div class="layout">
  <div :class="collapse ? 'left' : 'left-fold'">
   <Sidebar class="sidebar-container" />
  </div>
  <div class="right">
      <div class="right-header">
        <Navbar />
        <TagsView />
      </div>

      <AppMain />
  </div>
</div>


  <!-- <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <!-- <div
      :class="{hasTagsView: showTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header': fixedHeader}">
        <Navbar />
        <TagsView v-if="showTagsView" />
      </div> -->
      
    <!-- </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { Sidebar, Navbar, AppMain, TagsView  } from './components';
import { useLayoutStore } from '../stores';
import { storeToRefs } from 'pinia';


const store = useLayoutStore();
const { collapse } = storeToRefs(store);

</script>


<style lang="scss" scoped>

.layout {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 300px;
  }
  .left-fold {
    width: 70px;
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;

    .right-header {
      height: 90px;
    }
  }
}

.app-wrapper {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  // transition: width 0.28s;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 300px);
  // transition: width 0.28s;
}


</style>
