<template>
  <div class="tags-box">
    <el-scrollbar class="tags-scrollbar tags">
      <el-tag class="tag" v-for="cachedView in cachedViews" :key="cachedView.path" closable
        :type="isActive(cachedView) ? '' : 'info'" @click="clickTab(cachedView.fullPath)"
        @close="closeSingleTag(cachedView)">{{ cachedView.meta?.title }}</el-tag>
    </el-scrollbar>

    <div class="options-box">
      <div>刷</div>
      <div>
        <el-dropdown :hide-on-click="false" class="name" @command="changeDropdownCloseTag">
        <span><i class="iconfont icon-xiala"></i></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeother">关闭其他</el-dropdown-item>
            <!-- <el-dropdown-item command="closeall">关闭全部</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </div>
      <div @click="toggleFullScreen">
        <i v-if="fullScreen" class="iconfont icon-fullscreen-shrink"></i>
        <i v-else class="iconfont icon-fullscreen-expand"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, ref, reactive, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/layout/store';
import { RouteType } from '@/layout/type';
import UIHelper from '@/utils/uiHelper';

const store = useLayoutStore();
const { cachedViews } = storeToRefs(store);

const router = useRouter();

// router监听事件, 将路由信息进行缓存
onBeforeRouteUpdate((to) => {
  store.addCachedViews(to);
});

const changeDropdownCloseTag = (command: string) => {
  // console.log(command);
  if (command === 'closeother') {
    const activeViewPath: any = router.currentRoute.value.meta.fatherPath ? router.currentRoute.value.meta.fatherPath : router.currentRoute.value.fullPath;
    const activeView: any = cachedViews.value.find(x => x.fullPath === activeViewPath);
    store.updateCachedViews([activeView]);
    router.push(activeViewPath);
  }
};

// 关闭单个标签
const closeSingleTag = (cachedView: RouteType) => {
  if (cachedViews.value.length < 2) return;
  // 关闭标签
  store.removeCachedView(cachedView);
  // 路由跳转
  if (cachedViews.value.length > 0) {
    const path = cachedViews.value[cachedViews.value.length - 1].fullPath as string;
    router.push(path);
  }
};

// 标签高亮
const isActive = (route: RouteType) => {
  return route.fullPath === (router.currentRoute.value.meta.fatherPath ? router.currentRoute.value.meta.fatherPath : router.currentRoute.value.fullPath);
};

const clickTab = (path: any) => {
  // console.log(path);
  router.push(path);
};

onMounted(() => {
  console.log();
});

const fullScreen = ref(false);
const toggleFullScreen = () => {
  UIHelper.toggleFullScreen(document.body.getElementsByClassName('tags-content')[0], !fullScreen.value);
  fullScreen.value = !fullScreen.value;
};
</script>

<style lang="scss" scoped>
.tags-box {
  // padding-top: 2px;
  // display: flex;

  .tags-scrollbar {
    flex: 1;
    width: 100%;
    padding: 0px 15px;
    height: 30px;
  }

  .tags {
    display: flex;

    &:deep(.el-scrollbar__view) {
      display: flex;
    }
  }

  .tag {
    display: inline-block;
    cursor: pointer;
    line-height: 21px;
  }

  .tags-close-box {
    width: 100px;
  }

  .tag:not(:first-child) {
    margin: 0px 5px;
    margin-top: 2px;
  }
}

.options-box {
  div {
    display: inline-block;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 30px;
    line-height: 30px;
    height: 30px;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    // background-color: red;
  }
}

.tags-box {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-top: 1px solid rgba(0,0,0,0.1);
  background-color: white;
  box-sizing: border-box;
  // padding-top: 5px;
  display: flex;
  height: 30px;

  .tags-scrollbar {
    flex: 1;
    width: 100%;
    padding: 0px 5px;
    height: 30px;
  }

  .tags {
    display: flex;

    &:deep(.el-scrollbar__view) {
      display: flex;
    }
  }

  .tag {
    display: inline-block;
    cursor: pointer;
    line-height: 21px;
    margin-top: 2px;
  }

  .tags-close-box {
    width: 100px;
  }

  .tag:not(:first-child) {
    margin-left: 5px;
    // margin-right: 5px;
  }
}
</style>
