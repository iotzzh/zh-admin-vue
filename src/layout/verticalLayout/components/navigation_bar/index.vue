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
    <!-- right: info -->
    <!-- <div class="info">
      <span class="bell item"
        ><el-badge
          ><el-icon :size="20"> <Bell /> </el-icon
        ></el-badge>
      </span>

      <span class="fullscreen item" @click="toggleFullScreen">
        <i v-if="fullscreen" class="iconfont icon-fullscreen-shrink"></i>
        <i v-else class="iconfont icon-fullscreen-expand"></i>
      </span>

      <el-dropdown :hide-on-click="true" @command="changeLanguage" class="lang item">
        <i class="iconfont icon-language-outline" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="setting-icon item" @click="clickChangeLayout">
        <i class="iconfont icon-ai216"></i>
      </span>
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <span>
          <el-avatar :size="20" class="avatar">{{
            userInfo?.name ? pinyin.getCamelChars(userInfo.name)[0] : 'N'
          }}</el-avatar>
          <span>{{ userInfo?.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div> -->
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
