<template>
  <div class="navbar">
    <!-- left -->
    <div class="left">
      <span class="icon" @click="toggleSideBar">
        <i v-if="collapse" class="iconfont icon-zhedie1" />
        <i v-else class="iconfont icon-zhedie2" />
      </span>
    </div>

    <User></User>
  </div>
</template>

<script lang="ts" setup>
import User from '@/layout/components/User.vue';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/layout/store';
import UIHelper from '@/utils/uiHelper';

import { useRouter } from 'vue-router';
import storage from '@/utils/storage';
import { useLocale } from '@/locales/useLocale';
import { LocaleType } from '@/locales/type';
import pinyin from 'js-pinyin';

const store = useLayoutStore();
const router = useRouter();
const { collapse } = storeToRefs(store);

const isMobile = storage.getIsMobile();

const toggleSideBar = () => {
  if (isMobile) {
    store.changeIsOpenDrawerMenu(true);
  } else {
    store.toggleCollapse();
  }
};

const userInfo = ref({} as any);

onMounted(() => {
  userInfo.value = {
    name: '李太白',
  };
  // userInfo.value = storage?.getUserInfo();
});

// 退出登录事件
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    sessionStorage.clear();
    localStorage.clear();
    router && router.push('/');
    location.reload();
  }
};

const locale = useLocale();
const changeLanguage = async (command: string | number | object) => {
  await locale.changeLocale(command as LocaleType);
};

const fullscreen = ref(false);
const toggleFullScreen = () => {
  UIHelper.toggleFullScreen(document.body, !fullscreen.value);
  fullscreen.value = !fullscreen.value;
};

const clickChangeLayout = () => store.setLayout('horizontal');
</script>

<style lang="scss" scoped>
@import '../../index.scss';
@import './index.scss';
</style>
