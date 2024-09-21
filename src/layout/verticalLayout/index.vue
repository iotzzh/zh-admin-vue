<template>
  <div class="layout" v-loading="loading">
    <div v-if="!isMobile" :class="collapse ? 'left' : 'left-fold'">
      <div style="display: flex; flex-direction: column; height: 100%">
        <Title></Title>
        <Menu :mode="ModeType.vertical"></Menu>
      </div>
    </div>

    <div class="right">
      <div class="navbar">
        <Folder></Folder>
        <User></User>
      </div>
      <div class="right-content">
        <Tag @reload="reload" />
        <Main v-if="isRouterAlive" />
      </div>
    </div>

    <el-drawer
      v-model="isOpenDrawerMenu"
      direction="ltr"
      :with-header="false"
      size="70%"
      modal-class="layout-menu-drawer"
    >
      <Title></Title>
      <Menu :mode="ModeType.vertical"></Menu>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ModeType } from '../type';
  import { onMounted, ref, nextTick } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useLayoutStore } from '../store';
  import storage from '@/utils/storage';
  import Tag from '@/layout/components/Tag.vue';
  import Title from '@/layout/components/Title.vue';
  import Menu from '@/layout/components/Menu.vue';
  import User from '@/layout/components/User.vue';
  import Folder from '@/layout/components/Folder.vue';
  import Main from '@/layout/components/Main.vue';

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
  @import './index.scss';
</style>

<style lang="scss">
  .layout-menu-drawer {
    .el-drawer__body {
      padding: 0px;
      background-color: rgb(12, 33, 53) !important;
      height: 100%;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
    }
  }
</style>
