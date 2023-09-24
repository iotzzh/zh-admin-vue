<template>
  <div class="layout" v-loading="loading">
    <div v-if="!isMobile" :class="collapse ? 'left' : 'left-fold'">
      <Sidebar />
    </div>

    <div class="right">
      <Navbar />
      <div class="right-content">
        <Tag @reload="reload" />
        <AppMain v-if="isRouterAlive" />
      </div>
    </div>

    <el-drawer v-model="isOpenDrawerMenu" direction="ltr" :with-header="false" size="70%"
      modal-class="layout-menu-drawer">
      <Sidebar />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Sidebar, Navbar, AppMain } from './components';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '../store';
import { onMounted, ref, nextTick } from 'vue';
import storage from '@/utils/storage';

import Tag from "@/layout/components/Tag.vue";

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

const isRouterAlive = ref(true);
const reload = async () => {
  isRouterAlive.value = false;
  await nextTick();
  isRouterAlive.value = true;
};
</script>

<style lang="scss" scoped>
@keyframes fold {
  from {
    width: 220px;
  }

  to {
    width: 70px;
  }
}

@keyframes expand {
  from {
    width: 70px;
  }

  to {
    width: 220px;
  }
}

.layout {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    min-width: 220px;
    animation: expand 0.2s ease-in-out;
  }

  .left-fold {
    width: 70px;
    animation: fold 0.2s ease-in-out;
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
}
</style>

<style lang="scss">
.layout-menu-drawer {
  .el-drawer__body {
    padding: 0px;
  }
}
</style>
