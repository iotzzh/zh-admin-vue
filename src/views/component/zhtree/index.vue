<template>
    <ZHBox :use-scroll-content-box="false">
        <div class="box" style="display: felx;height: 100%;">
        <div style="max-width: 500px;height: 100%;">
            <ZHTree :config="config" ref="refWorkspaceTree">
            </ZHTree>
        </div>
    </div>
    </ZHBox>

</template>

<script setup>
import { ref } from 'vue';
import ZHTree from '@/components/zh-tree/index.vue';
import ZHBox from '@/components/zh-box/index.vue';
import api from '@/api';

const config = ref({
    treeConfig: {
        hasAdd: true,
        hasEdit: true,
        hasDelete: true,
        hasEmptyAdd: true,
        hasRootAdd: true,
        labelDisplayMaxLength: 50,
        initialData: true,
        checkStrictly: true,
        showCheckbox: true,
        defaultProps: {
            label: 'name',
        },

        nodeClick: (params) => {
            // this.dashboardProject.tableConfig.value.requestConfig.list.conditions = { workspaceId: params.data.id };
            // this.dashboardProject.refTable.value.initData();
        },
    },
    requestConfig: {
        urlGet: api.getUserList,
        urlAdd: api.addUser,
        urlDelete: api.deleteUser,
        urlEdit: api.updateUser,
    },
    formModalConfig: {
        modalConfig: {
            show: false,
            width: '500px',
            mainTitle: '工作区',
            closeInModal: true,
            footer: {
                hasCancelButton: true,
                hasSubmitButton: true,
            },
        },
        formConfig: {
            formLabelWidth: '100px',
            fields: [
                { prop: 'name', label: '工作区名称', type: 'input', span: 24, required: true, },
                { prop: 'sex', label: '英文名称', type: 'input', span: 24, required: true, }
            ]
        },
        model: {},
        convertedModel: {},
    },
});
</script>