<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" v-if="cachedViews.find(x => x.path === route.path)" />
      </keep-alive>
      <component :is="Component" :key="route.path" v-if="!cachedViews.find(x => x.path === route.path)" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../../stores';
import { storeToRefs } from 'pinia';
const store = useLayoutStore();

const { cachedViews } = storeToRefs(store);

</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px;
  height: calc(100vh - 90px);
  width: 100%;
}
</style>
