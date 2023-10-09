<template>
  <div class="navbar">
    <Folder></Folder>
    <User></User>
  </div>
</template>

<script lang="ts" setup>
  import User from '@/layout/components/User.vue';
  import Folder from '@/layout/components/Folder.vue';
</script>

<style lang="scss" scoped>
  @import '../../index.scss';
  .navbar {
    height: $topBarHeight;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding-left: 7px;
  }
</style>
