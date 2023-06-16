<template>
    <div class="box">
        <ZHSelect v-model="sValue" :options="options" :api="apiUrl" value-key="id" label-field="permsionName"
            value-field="id"></ZHSelect>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ZHSelect from '@/components/zh-select/index.vue';
import api from '@/api/authorityManagement';

const sValue = ref();
const options = ref([]);

const apiUrl = ref(api.getMenuList);
</script>

<script lang="ts">export default { name: 'select-example' }; </script>