<template>
  <router-link key="expand" to="/dashboard" class="root-link">
    <img src="@/assets/images/logo.png"  class="logo">
  </router-link>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.root-link {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;

  .logo {
    width: 100%;
    height: 100%;
  }
}
</style>
