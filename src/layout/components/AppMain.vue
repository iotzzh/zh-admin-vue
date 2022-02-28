<template>
  <el-scrollbar class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
    </transition> -->
    <router-view />
  </el-scrollbar>
</template>

<script lang="ts" setup>
// import { useStore } from '@/store'
// import { defineComponent } from 'vue'
// import { useRoute } from 'vue-router'

// export default defineComponent({
//   setup() {
//     const store = useStore()
//     const route = useRoute()
//     const cachedViews = () => {
//       return store.state.tagViews.cachedViews
//     }
//     const key = () => {
//       return route.path
//     }
//     return {
//       cachedViews,
//       key
//     }
//   }
// })
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  height: 100%;
  overflow: auto;
  width: 100%;
  position: relative;
  padding: 5px;
}
</style>
