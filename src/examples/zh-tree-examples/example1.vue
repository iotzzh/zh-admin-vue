<template>
    <ZHTree :treeSettings="treeSettings" :defaultProps="defaultProps" :request="request">

    </ZHTree>
</template>

<script lang="ts" setup>
import ZHTree from '@/components/zh-tree/index.vue';
import { TZHTreeRequest, TZHTreeSetting } from '@/components/zh-tree/type';
import { reactive, ref } from 'vue';
import api from '../api/tree/index';

const treeSettings = ref({
    formSettings: {
        formLabelWidth: '50px',
        fields: [
            { label: '父级', prop: 'parent', type: 'input', span: 12, },
            { label: '禁用', prop: 'parent1', type: 'input', span: 12, disabled: true, defaultValue: 'Test' },
            { label: '名称', prop: 'name', type: 'select', span: 12, options: [{ label: 'zzh', value: 'zzh' }, { label: 'lff', value: 'lff' }] },
        ],
    },

} as TZHTreeSetting);

const defaultProps = ref({
    label: 'label',
});
const request = ref({
    urlGet: api.getOrgList,
    urlAdd: api.addOrg,
    urlEdit: api.updateOrg,
    urlDelete: api.deleteOrg,
} as TZHTreeRequest);
</script>

<style lang="scss" scoped>

</style>