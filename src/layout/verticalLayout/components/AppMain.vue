<template>
  <div class="app-main" :style="{ padding: isMobile ? '7px 0px 0px 0px' : '10px 10px' }">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide">
        <keep-alive :include="cachedViews && cachedViews.map((x: any) => x.name)">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '@/layout/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import storage from '@/utils/storage';

const store = useLayoutStore();
const isMobile = ref(storage.getIsMobile());

const { cachedViews } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: rgb(223, 223, 223);
  box-sizing: border-box;
  overflow: hidden;

  &:deep(.el-scrollbar__view) {
    height: 100%;
  }
}

.fade-transition {

  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

// ///////////////////////////////////////////////
// Fade Bottom
// ///////////////////////////////////////////////

// Speed: 1x
.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition: opacity 0.25s, transform 0.3s;
}

.fade-bottom-enter-from {
  opacity: 0;
  transform: translateY(-10%);
}

.fade-bottom-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

// fade-scale
.fade-scale-leave-active,
.fade-scale-enter-active {
  transition: all 0.28s;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.2);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

// ///////////////////////////////////////////////
// Fade Top
// ///////////////////////////////////////////////

// Speed: 1x
.fade-top-enter-active,
.fade-top-leave-active {
  transition: opacity 0.2s, transform 0.25s;
}

.fade-top-enter-from {
  opacity: 0;
  transform: translateY(8%);
}

.fade-top-leave-to {
  opacity: 0;
  transform: translateY(-8%);
}
</style>
