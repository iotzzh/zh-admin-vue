<template>
  <div class="tags-box">
    <el-scrollbar class="tags-scrollbar">
      <div class="tags">
        <el-tag
          class="tag"
          v-for="cachedView in cachedViews"
          :key="cachedView.name"
          :closable="cachedView.fullPath !== '/index'"
          :type="isActive(cachedView) ? '' : 'info'"
          @click="clickTab(cachedView.fullPath)"
          @close="closeSingleTag(cachedView)"
        >{{ cachedView.meta?.title }}</el-tag>
      </div>
    </el-scrollbar>

    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary" plain>
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
import { useRouter } from 'vue-router';
import { useLayoutStore } from '../../../../stores';
import { storeToRefs } from 'pinia';
import { RouteType } from '../../../../model/layout';

const store = useLayoutStore();
const { cachedViews } = storeToRefs(store);

const router = useRouter();

const handleTags = (command: string) => {
  if (command === 'other') {
    const activeViewPath: any = router.currentRoute.value.meta.fatherPath ? router.currentRoute.value.meta.fatherPath : router.currentRoute.value.fullPath;
    const activeView: any = cachedViews.value.find(x => x.fullPath === activeViewPath);
    const indexView:any = cachedViews.value.find(x => x.fullPath === '/index');
    indexView.fullPath === activeView.fullPath ? 
      store.updateCachedViews([ indexView ]) :
      store.updateCachedViews([ indexView, activeView ]);
    router.push(activeViewPath);
  } else if (command === 'all') {
    const indexView:any = cachedViews.value.find(x => x.fullPath === '/index');
    store.updateCachedViews([ indexView ]);
    router.push(indexView);
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
    width: 100%;
    padding: 0px 15px;
  }

  .tags {
    display: flex;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
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
  }
}
</style>
