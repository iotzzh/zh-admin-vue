<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:07:01
 * @LastEditors: zzh
<<<<<<< HEAD
 * @LastEditTime: 2022-03-03 13:04:25
 * @Description: 布局入口
 * @FilePath: \hwason-laboratory-systems\src\layout\verticalLayout\Index.vue
=======
 * @LastEditTime: 2022-04-19 23:12:23
 * @Description: 布局入口
 * @FilePath: \zh-admin\src\layout\verticalLayout\Index.vue
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
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
<<<<<<< HEAD
    width: 300px;
  }
  .left-fold {
    width: 70px;
=======
    min-width: 300px;
  }
  .left-fold {
    min-width: 70px;
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
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
