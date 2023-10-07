<template>
  <div class="layout" v-loading="loading">
    <NavigationBar />
    <div class="tags-content">
      <Tag @reload="reload" />
    </div>
    <AppMain v-if="isRouterAlive" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { NavigationBar, AppMain } from './components';
import Tag from "@/layout/components/Tag.vue";

const loading = ref(true);
onMounted(() => {
  loading.value = false;
});

const isRouterAlive = ref(true);
const reload = async () => {
  isRouterAlive.value = false;
  await nextTick();
  isRouterAlive.value = true;
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tags-content {
  background-color: white;
}
</style>
