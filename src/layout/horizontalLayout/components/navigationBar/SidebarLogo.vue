<template>
  <div class="logo">后台管理系统</div>
  <!-- <router-link key="expand" :to="allMenuList && allMenuList.length > 1 ? '/dashboard' : ''" class="root-link">
    <img src="@/assets/img/logo1.png" class="logo">
  </router-link> -->
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/layout/store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store = useLayoutStore();

const { allMenuList } = storeToRefs(store);

onMounted(() => {
  console.log();
});
</script>

<style lang="scss" scoped>
.root-link {
  height: 60px;
  line-height: 60px;
  vertical-align: middle;

  .logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
  }
}

.logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    text-align: center;
  }
</style>
