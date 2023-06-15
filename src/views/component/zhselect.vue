<template>
    <div class="box">
        <ZHSelect v-model="sValue" :options="options" :api="apiGetList" value-key="id" label-field="permsionName" value-field="id" ></ZHSelect>
    </div>
</template>

<script lang="ts" setup>
import ZHSelect from '@/components/zh-select/index.vue';
import { ref } from 'vue';
import api from '@/api/authorityManagement';

const sValue = ref();
const options = ref([]);

const apiGetList = ref(api.getMenuList);
</script>