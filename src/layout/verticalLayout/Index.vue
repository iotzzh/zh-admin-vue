<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:07:01
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-03 13:04:25
 * @Description: 布局入口
 * @FilePath: \hwason-laboratory-systems\src\layout\verticalLayout\Index.vue
-->
<template>
  <div class="layout">
    <div :class="collapse ? 'left' : 'left-fold'">
      <Sidebar />
    </div>

    <div class="right">
      <div class="right-header">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sidebar, Navbar, AppMain, TagsView } from './components';
import { useLayoutStore } from '../../stores';
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
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .right-header {
      height: 90px;
    }
  }
}
</style>
