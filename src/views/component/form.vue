<template>
    <zh-box>
        <el-row class="row">
            <el-col class="column" :span="16">左侧</el-col>
            <el-col class="column" :span="8">
                <!-- <ZHMonacoEditor v-model="model" language="json" height="100%"
            @editorMounted="editorMounted">
          </ZHMonacoEditor> -->
            </el-col>
        </el-row>
    </zh-box>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ZHForm from '@/components/zh-form/index.vue';
import ZHBox from '@/components/zh-box/index.vue';
import ZHMonacoEditor from '@/components/zh-monaco-editor/index.vue';

const model = ref({} as any);

const  editorMounted = () => {};

</script>

<style lang="scss" scoped>
.row, .column {
    height: 100%;
}
</style>