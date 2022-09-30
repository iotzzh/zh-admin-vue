<template>
<<<<<<< HEAD
  <el-scrollbar class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition> -->
    <router-view :key="key"/>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const key = () => { return route.path; };
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
=======
  <div class="app-main">
    <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews && cachedViews.map((x:any) => x.name)">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../../stores';
import { storeToRefs } from 'pinia';
const store = useLayoutStore();
const { cachedViews } = storeToRefs(store);
</script>

<style lang="scss" scoped>
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
</style>
