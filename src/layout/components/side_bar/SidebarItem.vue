<!--
 * @Author: zzh
 * @Date: 2022-02-25 16:48:39
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-01 17:52:50
 * @Description: 导航组件
 * @FilePath: \zh-admin\src\layout\components\side_bar\SidebarItem.vue
-->
<template>
  <el-sub-menu :index="item?.id">
    <template #title>
      <i class="iconfont iconquanxian"></i>
      <span class="tab">{{ item?.permsionName }}</span>
    </template>

    <div v-for="(child, index) in item?.children" :key="index">
      <template v-if="child.children && child.children.length > 0">
        <sidebar-item
          :key="child.id"
          :item="child"
          :collapse="collapse"
        />
      </template>
    <el-menu-item v-else  :index="child.url">
      <i class="iconfont icondingdan" />
      <span class="tab sub">{{ child.permsionName }}</span>
    </el-menu-item>
    </div>
    <!-- <el-menu-item v-for="(child, index) in item?.children" :key="index" :index="child.url">
      <i class="iconfont icondingdan" />
      <span class="tab sub">{{ child.permsionName }}</span>
    </el-menu-item> -->
              <!-- <template v-if="child.children && child.children.length > 0">
        <sidebar-item
          v-for="child1 in child.children"
          :key="child1.id"
          :item="child1"
          :collapse="collapse"
        />
      </template> -->
  </el-sub-menu>
  <!-- <el-sub-menu index="1">
        <template #title>
          <i class="iconfont iconquanxian"></i>
          <span class="tab">权限管理</span>
        </template>
        <el-menu-item
          index="/authorityManagement/userManagement"
          @click="goto('/authorityManagement/userManagement', '用户管理')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">用户管理</span>
        </el-menu-item>
        <el-menu-item
          index="/authorityManagement/roleManagement"
          @click="goto('/authorityManagement/roleManagement', '角色管理')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">角色管理</span>
        </el-menu-item>
        <el-menu-item
          index="/authorityManagement/organizationalStructure"
          @click="goto('/authorityManagement/organizationalStructure', '组织架构')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">组织架构</span>
        </el-menu-item>
        <el-menu-item
          index="/authorityManagement/menuManagement"
          @click="goto('/authorityManagement/menuManagement', '菜单管理')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">菜单管理</span>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <i class="iconfont iconquanxian"></i>
          <span class="tab">前处理</span>
        </template>
        <el-menu-item
          index="/preProcessing/departmentManagement"
          @click="goto('/preProcessing/departmentManagement', '部门管理')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">部门管理</span>
        </el-menu-item>
        <el-menu-item
          index="/preProcessing/abnormalHandoff"
          @click="goto('/preProcessing/abnormalHandoff', '异常交接')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">异常交接</span>
        </el-menu-item>
        <el-menu-item
          index="/preProcessing/barcodeManagement"
          @click="goto('/preProcessing/barcodeManagement', '条码管理')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">条码管理</span>
        </el-menu-item>
        <el-menu-item
          index="/preProcessing/dataDictionary"
          @click="goto('/preProcessing/dataDictionary', '数据字典')"
        >
          <i class="iconfont icondingdan" />
          <span class="tab sub">数据字典</span>
        </el-menu-item>
  </el-sub-menu>-->
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, PropType, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { useLayoutStore } from '../../../stores';
import { get } from '../../../utils/request';
import api from '../../../api/layout';
import { storeToRefs } from 'pinia';
import { menuListData } from '.././../mockData';
import { convertMenuArrToTree, MenuNode } from '../../../utils/dataConvert';

const store = useLayoutStore();

const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  },
  item: {
    type: Object as PropType<MenuNode>,
  },
});

const { item, collapse } = toRefs(props);

const router = useRouter();

let menuList = ref({});

// 获取菜单列表
const params = {
  token: '9baf50bf7efb46ebbd8145b9d3eb9db4',
  callbackName: ''
};

const getMenuData = async() => {
  // const result = await get(api.getMenuList, params, '', '', 10000);
  // menuList.value = result.data;
  menuList.value = convertMenuArrToTree(menuListData as MenuNode[]);
};

getMenuData();
console.log(menuList.value);



</script>

<style lang="scss">
.el-menu-vertical {
  width: 100%;
  border-right: none !important;

  .tab {
    font-size: 16px;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  min-height: 400px;
}

.iconfont {
  margin-right: 5px;
}
</style>