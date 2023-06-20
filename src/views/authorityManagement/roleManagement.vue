<!-- 角色管理 -->
<template>
    <div style="height: 100%; width: 100%;">
        <Table ref="refTable" :formSettings="formSettings" :tableSettings="tableSettings"
            :usePage="false" :request="request">
        </Table>
        <Modal ref="refModal" :modal="modal" @opened="openedMenuModal" @cancel="closeModal" @close="closeModal"
            @submit="submit">
            <Table ref="refMenuTable" :tableSettings="menuTableSettings" :usePage="false">
                <template v-slot:zh-table-module="scope">
                    <el-checkbox-group v-model="allCheckedList" style="display: inline">
                        <el-checkbox :label="scope.row.id" :disabled="!isMenuEnabled(scope.row)" size="small"
                            @change="(checked) => menuChange(checked, scope.row)">{{
                                scope.row.permsionName
                            }}</el-checkbox>
                    </el-checkbox-group>
                </template>

                <template v-slot:zh-table-action="scope">
                    <el-checkbox-group v-model="allCheckedList">
                        <el-checkbox v-for="item in scope.row.actions" :label="item.id" :key="item.id" :border="true"
                            size="small" :disabled="!isButtonEnabled(scope.row)">{{ item.permsionName }}</el-checkbox>
                    </el-checkbox-group>
                </template>
            </Table>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import Table from '@/components/zh-table/index.vue';
import { TZHTableRequest, TZHTableFormSettings, TZHTableSetting } from '@/components/zh-table/type';
import { onMounted, reactive, Ref, ref } from 'vue';
import api from '@/api/authorityManagement';
import storage from '@/utils/storage';
import { TZHModal } from '@/components/zh-modal/type';
import Modal from '@/components/zh-modal/index.vue';
import ZHRequest from '@/components/zh-request';
import { TZHRequestParams } from '@/components/zh-request/type';
import { popSuccessMessage } from '@/components/zh-message';

const refTable = ref();
const refModal = ref();
const refMenuTable = ref();

//#region 基础表格
const formSettings = ref({
    hasAddButton: true,
    hasSearchButton: true,
    hasExportButton: false,
    hasResetButton: false,
    formLabelWidth: '100px',
    customModel: {
        // isAppoint: true,
        // userId: storage.getUserId(),
    },
    fields: [
        { label: '角色', type: 'input', prop: 'roleName', width: '200px', },
    ],
} as TZHTableFormSettings);

const tableSettings = reactive({
    hasIndex: true,
    hasSelection: false,
    modal: {
        mainTitle: '角色',
        width: '500px',
        footer: {},
        formSettings: {
            formLabelWidth: '120px',
            customModel: { userId: storage.getUserId() }
        },
    },
    columns: [
        {
            label: '角色名称', prop: 'roleName', minWidth: '120px', addEditInfo: {
                type: 'input',
                addSort: 1,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: true,
            }
        },
        {
            label: '是否启用', prop: 'isEbl', minWidth: '120px', convert: (row: any) => { return row.isEbl ? '是' : '否'; },
            addEditInfo: {
                type: 'switch',
                addSort: 5,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
                required: true,
                options: [
                    { label: '启用', value: 1 },
                    { label: '不启用', value: 0 },
                ],
                defaultValue: 1,
                activeValue: 1,
                inactiveValue: 0,
            }
        },
        {
            label: '角色描述', prop: 'description', minWidth: '120px',
            addEditInfo: {
                type: 'input',
                addSort: 4,
                placeholder: '请输入',
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24,
            }
        },
        // {
        //     label: '所属机构', prop: 'test', minWidth: '120px',
        //     addEditInfo: {
        //         addSort: 2,
        //         xs: 24,
        //         sm: 24,
        //         md: 24,
        //         lg: 24,
        //         xl: 24,
        //         type: 'select',
        //         multiple: true,
        //         placeholder: '请输入',
        //         disabled: true,
        //     }
        // },
        // {
        //     label: '所属部门', prop: 'test1', minWidth: '120px',
        //     addEditInfo: {
        //         type: 'input',
        //         addSort: 3,
        //         placeholder: '请输入',
        //         xs: 24,
        //         sm: 24,
        //         md: 24,
        //         lg: 24,
        //         xl: 24,
        //         disabled: true,
        //     }
        // },
    ],
    actionColumn: {
        label: '操作',
        width: '180px',
        hasRowDeleteAction: true,
        hasRowEditAction: true,
        fixed: 'right',
        buttons: [
            { label: '授权', type: 'success', icon: 'Plus', onClick: (row: any, index: any) => { openModal(row); } },
        ],
    },
} as TZHTableSetting);

const request = ref({
    list: { url: api.getRoleList, successMessage: '查询成功', errorMessage: '查询失败' },
    add: { url: api.addRole, successMessage: '新增成功', errorMessage: '新增失败' },
    update: { url: api.updateRole, successMessage: '更新成功', errorMessage: '更新失败' },
    delete: { url: api.deleteRole, successMessage: '删除成功', errorMessage: '删除失败' },
    batchDelete: { url: api.batchDeleteRole, successMessage: '批量删除成功', errorMessage: '批量删除失败' },
} as TZHTableRequest);

const rootPermision = ref({id:'001'});
const getCalRootPermissionId = async () => {
    rootPermision.value = { id: '001' };
    // const apiParams: TZHRequestParams = {
    //     url: api.getCalRootPermissionId,
    //     conditions: {},
    //     errorMessage: '获取根目录数据失败',
    // };
    // const result = await ZHRequest.post(apiParams);
    // if (result.success) rootPermision.value = result.data;
};

onMounted(async () => {
    // getCalRootPermissionId();
});
//#endregion

//#region 授权界面
const allCheckedList = ref([] as any);
const modal: Ref<TZHModal> = ref({
    show: false,
    title: '角色授权',
    footer: {},
});

const openModal = (row: any) => {
    modal.value.show = true;
    modal.value.data = row;
    modal.value.loadingPage = true;
};

const closeModal = () => {
    modal.value.show = false;
    allCheckedList.value = [];
};

const menuTableSettings = reactive({
    hasIndex: false,
    hasSelection: false,
    defaultExpandAll: true,
    columns: [
        { label: '菜单模块', prop: 'module', width: '300px', align: 'left', useSlot: true, },
        { label: '操作按钮', prop: 'action', useSlot: true, },
    ],
} as TZHTableSetting);

// 根据角色，获取角色拥有的权限接口
const getOperatePermissionByRoleId = async () => {
    // const apiParams: TZHRequestParams = {
    //     url: api.getPermisionByRoleId,
    //     conditions: {
    //         roleId: modal.value.data?.id,
    //     },
    // };
    // const result = await ZHRequest.post(apiParams);
    // if (result.success) {
    //     allCheckedList.value = result.data;
    //     // allCheckedList.value = ['277907634932190720'];
    // }

    allCheckedList.value = [];
};

const openedMenuModal = async (params: any) => {
    // const apiParams: TZHRequestParams = {
    //     url: api.getUserCreatePermision,
    //     conditions: {},
    // };
    // const result = await ZHRequest.post(apiParams);
    // if (result.success) {
    //     const newTree = convertChildToActions(result.data);
    //     setTimeout(async () => {
    //         await getOperatePermissionByRoleId();
    //         refMenuTable.value.setData(newTree);
    //         modal.value.loadingPage = false;
    //     }, 400);
    // }

    const apiParams: TZHRequestParams = {
        url: api.getMenuList,
        conditions: {},
    };
    const result = await ZHRequest.post(apiParams);
    if (result.success) {
        // const newTree = convertChildToActions(result.data);
        setTimeout(async () => {
            // await getOperatePermissionByRoleId();
            // refMenuTable.value.setData(newTree);
            refMenuTable.value.setData(result.data.records);
            modal.value.loadingPage = false;
        }, 400);
    }

};

const isMenuEnabled = (item: any) => {
    const enabled =
        item.parentId == rootPermision.value.id ||
        (allCheckedList.value && allCheckedList.value.length > 0 && allCheckedList.value.findIndex((x: any) => x == item.parentId) !== -1);
    return enabled;
};

const isButtonEnabled = (item: any) => {
    return allCheckedList.value && allCheckedList.value.length > 0 && allCheckedList.value.findIndex((x: any) => x == item.id) !== -1;
};

const getTreeActionIdsParent = (row: any) => {
    let ids = [];
    for (let i = 0; i < row.children.length; i++) {
        ids.push(row.children[i].id);
        for (let j = 0; j < row.children[i].actions.length; j++) {
            ids.push(row.children[i].actions[j].id);
        }
    }
    return ids;
};

const getTreeActionIds = (row: any) => {
    let ids = [];
    if (row.actions && row.actions.length > 0) {
        for (let i = 0; i < row.actions.length; i++) {
            ids.push(row.actions[i].id);
        }
    }
    return ids;
};


const menuChange = (value: any, row: any) => {
    if (!value) {
        if (row.parentId == rootPermision.value.id) {
            const allIds = getTreeActionIdsParent(row);
            for (let sId of allIds) {
                const index = allCheckedList.value.findIndex((x: any) => x == sId);
                if (index !== -1) {
                    allCheckedList.value.splice(index, 1);
                }
            }
        } else {
            const actionsIds = getTreeActionIds(row);
            for (let sId of actionsIds) {
                const index = allCheckedList.value.findIndex((x: any) => x == sId);
                if (index !== -1) {
                    allCheckedList.value.splice(index, 1);
                }
            }
        }
    } else {
        if (row.parentId == rootPermision.value.id) {
            for (let i = 0; i < row.children.length; i++) {
                allCheckedList.value.push(row.children[i].id);
                for (let j = 0; j < row.children[i].actions.length; j++) {
                    allCheckedList.value.push(row.children[i].actions[j].id);
                }
            }
        } else {
            const actionsIds = getTreeActionIds(row);
            for (let sId of actionsIds) {
                allCheckedList.value.push(sId);
            }
        }
    }
};

const convertChildToActions = (treeArr: any, checkedList = [] as any) => {
    let newTreeArr = treeArr;
    for (let i = 0; i < newTreeArr.length; i++) {
        if (!newTreeArr[i].children || newTreeArr[i].children.length == 0) continue;
        newTreeArr[i].actions = [];
        let willDelete: any = [];
        for (let j = 0; j < newTreeArr[i].children.length; j++) {
            if (newTreeArr[i].children[j].menuType == 3) {
                newTreeArr[i].actions.push(newTreeArr[i].children[j]);
                willDelete.push(newTreeArr[i].children[j]);
            }
        }
        newTreeArr[i].children = newTreeArr[i].children.filter((x: any) => !willDelete.find((y: any) => y.id == x.id));

        if (newTreeArr[i].children.length > 0) {
            convertChildToActions(newTreeArr[i].children);
        }
    }

    return newTreeArr;
};

const submit = async () => {
    popSuccessMessage('修改成功');
    modal.value.show = false;
    // const params: TZHRequestParams = {
    //     url: api.authorizeByRole,
    //     conditions: {
    //         roleId: modal.value.data.id,
    //         permissionIds: allCheckedList.value,
    //     },
    //     errorMessage: '修改失败',
    //     successMessage: '修改成功',
    // };
    // const result = await ZHRequest.post(params);
    // if (result.success) modal.value.show = false;
};
//#endregion
</script>

<script lang="ts">
export default { name: 'roleManagement' };
</script>

<style lang="scss" scoped>

</style>