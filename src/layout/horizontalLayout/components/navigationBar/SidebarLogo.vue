<template>
  <div class="logo-box">
    <img class="logo" :src="logo" />
    <span>后台管理系统</span>
  </div>
</template>

<script setup lang="ts">
  import logo from '@/assets/img/logo.png';
</script>

<style lang="scss" scoped>
  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bolder;
    height: 100%;
  }

  .logo {
    width: auto;
    height: 40px;
    padding-right: 10px;
  }
</style>
