<template>
    <div class="info">
        <span class="bell item">
            <el-badge is-dot class="item">
                <el-icon>
                    <bell />
                </el-icon>
            </el-badge>
        </span>

        <span class="fullscreen item" @click="toggleFullScreen">
            <i v-if="fullscreen" class="iconfont icon-fullscreen-shrink"></i>
            <i v-else class="iconfont icon-fullscreen-expand"></i>
        </span>

        <span class="item">
            <i v-if="layout === 'horizontal'" class="iconfont icon-charts-buju" @click="clickChangeLayout"></i>
            <i v-else class="iconfont icon-buju9" @click="clickChangeLayout"></i>
        </span>

        <el-icon class="item" @click="refreshBody">
            <refresh />
        </el-icon>

        <el-dropdown class="name item" @command="changeLanguage">
            <el-icon>
                <i class="iconfont icon-language-outline"></i>
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
                    <el-dropdown-item command="en">English</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown :hide-on-click="false" class="name" @command="handleCommand">
            <span>
                <el-avatar :size="23" style="margin-right: 5px; margin-left: 10px;">{{ pinyinFL }}
                </el-avatar>{{ userName }}
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useLayoutStore } from '@/layout/store';
import UIHelper from '@/utils/uiHelper';
import { useRouter } from 'vue-router';
import { useLocale } from '@/locales/useLocale';
import { LocaleType } from '@/locales/type';
import pinyin from 'js-pinyin';
import { storeToRefs } from 'pinia';

const store = useLayoutStore();
const router = useRouter();

const refreshBody = () => {
    location.reload();
};

const userName = ref('暂无');

onMounted(() => {
    userName.value = '全栈道';
});

const pinyinFL = computed(() => pinyin.getFullChars(userName.value || "#")[0].toUpperCase());

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

const { layout } = storeToRefs(store);

const clickChangeLayout = () => {
    if (layout.value === 'vertical') store.setLayout('horizontal');
    else store.setLayout('vertical');
};
</script>

<style lang="scss" scoped>
@import '../index.scss';

.info {
    line-height: $topBarHeight;
    height: $topBarHeight;
    text-align: right;
    vertical-align: middle;
    padding: 0px 25px;
    align-items: center;
    display: flex;
}

.info .bell {
    cursor: pointer;
    width: 50px !important;
}

.info .item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    width: 34px;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    line-height: 26px;
}

.info .bell .item {
    height: 21px;
    position: relative;
    width: 25px;
}

.info span {
    display: flex;
    align-items: center;
    justify-content: center;
}

.info .name {
    height: 18px;
    cursor: pointer;
}

.info .fullscreen {
    cursor: pointer;
}
</style>