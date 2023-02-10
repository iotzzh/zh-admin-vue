<template>
  <div class="layout" v-loading="loading">
    <div v-if="!isMobile" :class="collapse ? 'left' : 'left-fold'">
      <Sidebar />
    </div>

    <div class="right">
      <Navbar />
      <div class="right-content">
        <TagsView />
        <AppMain />
      </div>
    </div>

    <el-drawer v-model="isOpenDrawerMenu" direction="ltr" :with-header="false" size="70%"
      modal-class="layout-menu-drawer">
      <Sidebar />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Sidebar, Navbar, AppMain, TagsView } from './components';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '../store';
import { onMounted, ref } from 'vue';
import storage from '@/utils/storage';

const store = useLayoutStore();
const { collapse, isOpenDrawerMenu } = storeToRefs(store);

const isMobile = ref(storage.getIsMobile());

const loading = ref(true);


onMounted(() => {
  loading.value = false;
  if (document.body.offsetWidth <= 820 && !isMobile.value) {
    store.toggleCollapse(false);
  }
});

// const drawer = ref(false);
let activeIndex = ref('');

// const openMenu = () => {
//   drawer.value = true;
// };
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

<style lang="scss">
.layout-menu-drawer {
  .el-drawer__body {
    padding: 0px;
  }
}
</style>
