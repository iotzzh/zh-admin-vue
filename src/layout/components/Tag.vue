<template>
    <div class="tags-box">
        <el-scrollbar class="tags-scrollbar tags">
            <el-tag class="tag" v-for="cachedView in cachedViews" :key="cachedView?.path" closable
                :type="isActive(cachedView) ? '' : 'info'" @click="clickTab(cachedView.fullPath)"
                @close="closeSingleTag(cachedView)" effect="dark">{{ cachedView.meta?.title }}</el-tag>
        </el-scrollbar>

        <div class="options-box">
            <div @click="refresh">
                <el-icon :class="{ refresh: isRefresh }">
                    <Refresh />
                </el-icon>
            </div>
            <div>
                <el-dropdown :hide-on-click="false" class="name" style="border: none" @command="changeDropdownCloseTag">
                    <span><i class="iconfont icon-xiala"></i></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="closeother">关闭其他</el-dropdown-item>
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
import { useLayoutStore } from '@/layout/store';
import { RouteType } from '@/layout/type';
import UIHelper from '@/utils/uiHelper';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
const store = useLayoutStore();
const { cachedViews } = storeToRefs(store);

const emit = defineEmits(['reload']);

const router = useRouter();

// router监听事件, 将路由信息进行缓存
onBeforeRouteUpdate((to) => {
    store.addCachedViews(to);
});

const changeDropdownCloseTag = (command: string) => {
    // console.log(command);
    if (command === 'closeother') {
        const activeViewPath: any = router.currentRoute.value.meta.fatherPath
            ? router.currentRoute.value.meta.fatherPath
            : router.currentRoute.value.fullPath;
        const activeView: any = cachedViews.value.find((x) => x.fullPath === activeViewPath);
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
    return (
        route.fullPath ===
        (router.currentRoute.value.meta.fatherPath
            ? router.currentRoute.value.meta.fatherPath
            : router.currentRoute.value.fullPath)
    );
};

const clickTab = (path: any) => {
    router.push(path);
};

const fullScreen = ref(false);
const toggleFullScreen = () => {
    UIHelper.toggleFullScreen(
        document.querySelector('.app-main div'),
        !fullScreen.value,
    );
    fullScreen.value = !fullScreen.value;
};

const isRefresh = ref(false);
const refresh = async () => {
    emit('reload');
    isRefresh.value = true;
    setTimeout(() => {
        isRefresh.value = false;
    }, 2000);
};
</script>
  
<style lang="scss" scoped>
.options-box {
    display: flex;

    div {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        width: 30px;
        line-height: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.tags-box {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
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
        // display: inline-block;
        cursor: pointer;
        line-height: 21px;
        margin-top: 2px;
    }

    .tags-close-box {
        width: 100px;
    }

    .tag:not(:first-child) {
        margin-left: 7.5px;
        // margin-right: 5px;
    }
}

.iconfont {
    margin: 0px;
    padding: 0px;
}

@keyframes rotate1 {
    0% {
        transform: rotateZ(0deg);
        /*从0度开始*/
    }

    100% {
        transform: rotateZ(360deg);
        /*360度结束*/
    }
}

.refresh {
    animation: rotate1 2s infinite;
}
</style>
  