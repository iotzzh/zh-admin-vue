<<<<<<< HEAD
<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-03 13:32:49
 * @Description: 侧边栏logo(需要跟随侧边栏折叠)
 * @FilePath: \hwason-laboratory-systems\src\layout\horizontalLayout\components\navigationBar\SidebarLogo.vue
-->
<template>
  <router-link key="expand" to="/dashboard" class="root-link">
    <h2 class="title">实验室管理系统</h2>
=======
<template>
  <router-link key="expand" to="/dashboard" class="root-link">
    <img src="@/assets/images/logo.png"  class="logo">
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
  </router-link>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { defineProps } from 'vue';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
});

=======
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
</script>

<style lang="scss" scoped>
.root-link {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
<<<<<<< HEAD
.title {
  display: inline;
}

}

=======

  .logo {
    width: 100%;
    height: 100%;
  }
}
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
</style>
