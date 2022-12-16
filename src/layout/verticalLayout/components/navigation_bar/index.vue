<template>
  <div class="navbar">
    <div class="left">
      <span>
        <el-icon :size="30" @click="toggleSideBar">
          <fold v-if="collapse" />
          <expand v-else />
        </el-icon>
      </span>

      <span>
        <el-dropdown>
          <span class="el-dropdown-link">
            菜单
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>/Current
      </span>
    </div>

    <!-- info -->
    <div class="info">
      <span>搜索</span>
      <span><el-badge is-dot class="item"><el-icon><Bell /></el-icon></el-badge></span>
      <span>全屏</span>
      <span>中/英</span>
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span>个人信息（头像 + Name）</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span><el-icon><Setting /></el-icon></span>
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

// 点击全屏
let isFullscreen = ref(false);
const clickFullscreen = () => {
  const element: any = document.documentElement;
  const documentE: any = document;
  if (isFullscreen.value) {
    if (documentE.exitFullscreen) {
      documentE.exitFullscreen();
    } else if (documentE.webkitCancelFullScreen) {
      documentE.webkitCancelFullScreen();
    } else if (documentE.mozCancelFullScreen) {
      documentE.mozCancelFullScreen();
    } else if (documentE.msExitFullscreen) {
      documentE.msExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  }
  isFullscreen.value = !isFullscreen.value;
};

</script>

<style lang="scss" scoped>
.navbar {
  height: 45px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  // background: linear-gradient(to right, #7234c3, #496be7);
  // background: #6196ea;
  // color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 20px 0 5px;

  .left {
    height: 45px;
    line-height: 45px;
    vertical-align: middle;
  }

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      // color: #5a5e66;
      vertical-align: text-bottom;
    }
  }
}

.info {
  width: 350px;
  line-height: 59px;
  height: 59px;
  text-align: right;
  vertical-align: middle;

  .camera-icon {
    position: relative;
    top: 10px;
    margin-right: 80px;
    cursor: pointer;
  }

  .el-dropdown {
    vertical-align: middle !important;
    cursor: pointer;
    font-size: 14px;
    // color: $menu-text-color;
    font-weight: bolder;
  }
}

.fullScreen {
  display: inline;
  line-height: 59px;
  margin-right: 8px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
