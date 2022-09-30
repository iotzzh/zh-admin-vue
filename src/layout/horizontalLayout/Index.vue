<<<<<<< HEAD
<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:07:01
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-03 15:05:58
 * @Description: 布局入口
 * @FilePath: \hwason-laboratory-systems\src\layout\horizontalLayout\Index.vue
-->
<template>
  <div class="layout">
    <NavigationBar />
    <AppMain />
=======
<template>
  <div class="layout">
    <NavigationBar />
    <TagsView />
    <AppMain />
    <RightPanel />
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { NavigationBar, AppMain } from './components';
</script>


=======
import { NavigationBar, AppMain, TagsView } from './components';
import RightPanel from '@/components/right_panel/Index.vue';
</script>
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
<style lang="scss" scoped>
</style>
