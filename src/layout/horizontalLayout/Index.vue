<template>
  <div class="layout">
    <NavigationBar />
    <TagsView />
    <AppMain />
    <RightPanel />
  </div>
</template>

<script setup lang="ts">
import { NavigationBar, AppMain, TagsView } from './components';
import RightPanel from '@/components/right_panel/Index.vue';
</script>
<style lang="scss" scoped>
</style>
