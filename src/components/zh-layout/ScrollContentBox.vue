<template>
    <el-scrollbar class="zh-scroll-layout" v-bind="$attrs" height="100%">
        <slot></slot>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
.zh-scroll-layout {
    // height: 100%;
    width: 100%;
}
</style>