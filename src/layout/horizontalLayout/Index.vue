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
  </div>
</template>

<script setup lang="ts">
import { NavigationBar, AppMain } from './components';
</script>


<style lang="scss" scoped>
</style>
