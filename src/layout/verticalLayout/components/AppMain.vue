<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews && cachedViews.map((x: any) => x.name)">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '@/layout/layout';
import { storeToRefs } from 'pinia';
const store = useLayoutStore();

const { cachedViews } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px;
  flex: 1;
  height: 100%;
  // height: calc(100% - 50px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  overflow: hidden;

  &:deep(.el-scrollbar__view) {
    height: 100%;
  }
}
</style>
