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
import { useLayoutStore } from '@/layout/store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store = useLayoutStore();

const { cachedViews } = storeToRefs(store);

onMounted(() => {
  console.log();
});
</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px;
  height: calc(100vh - 90px);
  width: 100%;
}
</style>
