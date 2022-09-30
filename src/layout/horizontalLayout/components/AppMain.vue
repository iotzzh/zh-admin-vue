<template>
  <el-scrollbar class="app-main">
    <router-view :key="key"/>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const key = () => { return route.path; };
</script>

<style lang="scss" scoped>
// .app-main {
//   flex: 1;
//   height: 100%;
//   overflow: auto;
//   width: 100%;
//   position: relative;
//   padding: 5px;
// }
</style>
