<template>
  <div class="layout" v-loading="loading">
    <NavigationBar />
    <div class="tags-content">
      <TagsView />
    <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NavigationBar, AppMain, TagsView } from './components';

const loading = ref(true);
onMounted(() => { loading.value = false; });
</script>


<style lang="scss" scoped>
.layout {
  background-color: white;
}

.tags-content {
  background-color: white;
}

</style>
