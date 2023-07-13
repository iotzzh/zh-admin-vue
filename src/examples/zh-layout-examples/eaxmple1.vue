<!-- 
    布局1
    .........
    .       .
    .       .
    .........
 -->
<template>
    <ZHLayout :use-scroll-content-box="false">
        <el-row style="height: 100%;">
            <el-col :span="24" style="height: 100%; background-color: rebeccapurple;"></el-col>
        </el-row>
    </ZHLayout>
</template>

<script lang="ts" setup>
import ZHLayout from '@/components/zh-box/index.vue';

</script>

<style lang="scss" scoped>
</style>