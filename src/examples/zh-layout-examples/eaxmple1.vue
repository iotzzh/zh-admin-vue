<template>
    <layout :use-scroll-content-box="false">
        <el-row style="height: 1200px;">
            <el-col :span="12" style="height: 100%; background-color: rebeccapurple;"></el-col>
            <el-col :span="12" style="height: 100%; background-color: olive"></el-col>
        </el-row>
        <el-row style="height: 1200px;">
            <el-col :span="12" style="height: 100%; background-color: blue"></el-col>
            <el-col :span="12" style="height: 100%; background-color: blueviolet"></el-col>
        </el-row>
    </layout>
</template>

<script lang="ts" setup>
import layout from '@/components/zh-layout/index.vue';

</script>

<style lang="scss" scoped>
</style>