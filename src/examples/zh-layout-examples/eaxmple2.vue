<!-- 
    布局2
    .................
    .       .       .
    .       .       .
    .................
 -->
<template>
    <ZHLayout :use-scroll-content-box="false">
        <el-row style="height: 100%;">
            <el-col :span="12" style="height: 100%; background-color: #909090;"></el-col>
            <el-col :span="12" style="height: 100%; background-color: #151515;"></el-col>
        </el-row>
    </ZHLayout>
</template>

<script lang="ts" setup>
import ZHLayout from '@/components/zh-layout/index.vue';

</script>

<style lang="scss" scoped>
</style>