<template>
  <div class="navbar">
    <!-- toggle icon -->
    <el-icon :size="30" @click="toggleSideBar">
      <fold v-if="collapse" />
      <expand v-else />
    </el-icon>

    <!-- info -->
    <div class="info">
      <!-- fullscreen -->
      <!-- <div @click="clickFullscreen" class="fullScreen">
        <el-tooltip class="box-item" effect="dark" :content="isFullscreen ? `退出全屏` : `全屏`" placement="bottom">
          <el-icon class="fullScreen-icon" color="#fff"> <full-screen /> </el-icon>
        </el-tooltip>
      </div> -->
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <!-- <span class="el-dropdown-link">{{ userInfo.orgstaFullName }}</span> -->
        <span>个人信息</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
  width: 200px;
  line-height: 59px;
  height: 59px;
  text-align: center;
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
