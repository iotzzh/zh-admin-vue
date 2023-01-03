<template>
  <div class="layout">
    <NavigationBar />
    <div class="tags-content">
      <TagsView />
    <AppMain />
    </div>
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
.layout {
  background-color: white;
}

.tags-content {
  background-color: white;
}

</style>
