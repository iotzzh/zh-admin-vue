<template>
    <div class="box">
        <div class="buttons" style="position: absolute; z-index: 999; left: 10px; top: 10px;">
            <el-button v-for="(item, index) in [1, 2]" :key="index" @click="() => loginT = item"> 模板 {{ item }}</el-button>
        </div>
        <Index1 v-if="loginT === 1"></Index1>
        <Index2 v-if="loginT === 2"></Index2>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Index1 from './index1.vue';
import Index2 from './index2.vue';

const loginT = ref(2);
</script>

<style lang="scss" scoped></style>