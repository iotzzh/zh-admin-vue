<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-11 21:00:32
 * @Description: tags栏
 * @FilePath: \zh-admin\src\layout\verticalLayout\components\tags_view\Index.vue
-->
<template>
  <div class="tags-box">
    <el-scrollbar class="tags-scrollbar">
        <el-tag
          class="tag"
          v-for="cachedView in cachedViews"
          :key="cachedView.fullPath"
          closable
          :type="isActive(cachedView) ? '' : 'info'"
          @click="clickTab(cachedView.fullPath)"
          @close="closeSingleTag(cachedView)"
        >{{ cachedView.meta?.title }}</el-tag>
    </el-scrollbar>

    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, ref, reactive } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useLayoutStore } from '../../../../stores';
import { storeToRefs } from 'pinia';
import { RouteType } from '../../../../model/layout';

const store = useLayoutStore();
const { cachedViews } = storeToRefs(store);

const router = useRouter();

// router监听事件, 将路由信息进行缓存
onBeforeRouteUpdate((to) => {
  store.addCachedViews(to);
});

const handleTags = (command: string) => {
  console.log(command);
  if (command === 'other') {
    const activeViewPath: any = router.currentRoute.value.meta.fatherPath ? router.currentRoute.value.meta.fatherPath : router.currentRoute.value.fullPath;
    const activeView: any = cachedViews.value.find(x => x.fullPath === activeViewPath);
    store.updateCachedViews([ activeView ]);
    router.push(activeViewPath);
  }
};

// 关闭单个标签
const closeSingleTag = (cachedView: RouteType) => {
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
  console.log(path);
  router.push(path);
};
</script>

<style lang="scss" scoped>
.tags-box {
  padding-top: 5px;
  display: flex;

  .tags-scrollbar {
    flex: 1;
  }

  .tags-close-box {
    width: 100px;
  }
  .tag:not(:first-child) {
    margin: 0px 5px;
  }
}
</style>
