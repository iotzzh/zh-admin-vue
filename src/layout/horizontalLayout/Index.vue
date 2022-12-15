<template>
  <div class="layout">
    <NavigationBar />
    <TagsView />
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { NavigationBar, AppMain, TagsView } from './components';

onMounted(() => {
  console.log();
});
</script>


<style lang="scss" scoped>

</style>
