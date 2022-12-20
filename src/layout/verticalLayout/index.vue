<template>
  <div class="layout">
    <div :class="collapse ? 'left' : 'left-fold'">
      <Sidebar />
    </div>

    <div class="right">
      <Navbar />
      <div class="right-content">
        <TagsView />
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sidebar, Navbar, AppMain, TagsView } from './components';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '../store';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);
</script>


<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    min-width: 220px;
  }

  .left-fold {
    width: 70px;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    .right-header {
      height: 90px;
    }

    .right-content {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: rgba(90, 90, 90, 0.1);
    }
  }

  // &:deep(.el-menu-item.is-active) {
  //   color: #409eff;
  // } 
}
</style>
