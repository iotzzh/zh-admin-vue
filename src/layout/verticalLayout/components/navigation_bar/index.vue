<template>
  <div class="navbar">
    <div class="left">
      <span class="icon" @click="toggleSideBar">
        <i v-if="collapse" class="iconfont icon-zhedie1" />
        <i v-else class="iconfont icon-zhedie2" />
      </span>

      <span class="menu">
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            菜单
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>子菜单1</el-dropdown-item>
              <el-dropdown-item>子菜单2</el-dropdown-item>
              <el-dropdown-item>子菜单3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>/子菜单
      </span>
    </div>

    <!-- info -->
    <div class="info">
      <!-- <span>搜索</span> -->
      <span><el-badge is-dot class="item"><el-icon>
            <Bell />
          </el-icon></el-badge></span>
      <span class="fullscreen">全屏</span>
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <i :size="50" class="iconfont icon-language-outline" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">中文</el-dropdown-item>
            <el-dropdown-item command="logout">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown :hide-on-click="false" @command="handleCommand" class="name">
        <span>个人信息（头像 + Name）</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="setting-icon"><el-icon>
          <Setting />
        </el-icon></span>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/layout/layout';

const store = useLayoutStore();
const { collapse } = storeToRefs(store);
const toggleSideBar = () => { store.toggleCollapse(); };

const userInfo = ref({} as any);

onMounted(() => {
  // userInfo.value = storage.getUserInfo();
});

// 退出登录事件
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    // logout();
  }
};

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
