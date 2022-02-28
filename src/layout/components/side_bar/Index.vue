<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-28 15:10:22
 * @Description: 侧边栏
 * @FilePath: \zh-admin\src\layout\components\side_bar\Index.vue
-->
<template>
  <div
    :class="{'has-logo': showLogo}"
    class="sideWrap"
  >
    <SidebarLogo
      v-if="showLogo"
      :collapse="collapse"
    />

    <SidebarItem :collapse="collapse"></SidebarItem>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import { useLayoutStore } from '../../../stores';
import { storeToRefs } from 'pinia';


const store = useLayoutStore();
const { collapse } = storeToRefs(store);

const showLogo = ref(true);

</script>


<style lang="scss">

</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
}

</style>
