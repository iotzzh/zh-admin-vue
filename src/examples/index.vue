<template>
    <div class="box">
        <div class="left">导航</div>
        <div class="center">
            <!-- <component :is="ZHTableExample"></component> -->
        </div>
        <div class="right">设置</div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
// import ZHTableExample from '@/examples/ZHTableExample.vue';

const list = ref([
    { title: '表格', desc: '集成form，表格，分页，弹窗新增/编辑，行内/单元格编辑功能与一身的超级表格' },
    { title: '表格', desc: '集成form，表格，分页，弹窗新增/编辑，行内/单元格编辑功能与一身的超级表格' },
    { title: '表格', desc: '集成form，表格，分页，弹窗新增/编辑，行内/单元格编辑功能与一身的超级表格' },
] as any);

</script>

<style lang="scss" scoped>

.box {
    width: 100%;
    height: 100%;
}

</style>
