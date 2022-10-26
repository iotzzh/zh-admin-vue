<!-- 
    布局3
    .........................
    .       .       .       .
    .       .       .       .
    .........................
 -->
<template>
    <ZHLayout :use-scroll-content-box="false">
        <el-row style="height: 100%;">
            <el-col :span="8" style="height: 100%; background-color: #909090;"></el-col>
            <el-col :span="8" style="height: 100%; background-color: #808080;"></el-col>
            <el-col :span="8" style="height: 100%; background-color: #707070;"></el-col>
        </el-row>
    </ZHLayout>
</template>

<script lang="ts" setup>
import ZHLayout from '@/components/zh-layout/index.vue';

</script>

<style lang="scss" scoped>
</style>