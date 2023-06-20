<template>
    <el-scrollbar class="zh-scroll-layout" v-bind="$attrs" height="100%" @scroll="scroll">
        <slot></slot>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import _ from 'lodash';

const emit = defineEmits(['scroll']);

const scroll = (e: any) => { emit('scroll', e); };

</script>


<style lang="scss" scoped>
.zh-scroll-layout {
    // height: 100%;
    width: 100%;
}
</style>