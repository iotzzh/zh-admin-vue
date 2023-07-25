<template>
  <div class="main-content">
    <div class="login-box" v-on:keypress.enter="login" v-if="showLoginForm">
      <div class="user-box">
        <div class="login-title">{{ sysName }}</div>
        <form class="login-form" v-if="showLoginForm">
          <el-input v-model="inputAccount" class="w-50 m-2 input-box" size="large" placeholder="随便输入"
            :prefix-icon="Avatar" clearable></el-input>
          <el-input v-model="inputPassword" class="w-50 m-2 input-box" size="large" placeholder="随便输入" type="password"
            :prefix-icon="Lock" clearable show-password></el-input>
          <el-button type="primary" class="login-button button" @click="login()">登录</el-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
// import api from '@/api/login';
import storage from '@/utils/storage';
import { popErrorMessage } from '@/components/zh-message';
import { useLayoutStore } from '@/layout/store';
import { TZHRequestParams } from '@/components/zh-request/type';
import ZHRequest from '@/components/zh-request';
import { convertMenuArrToTree, updateMenuToRouter } from '@/utils/dataConvert';
import { setLayout } from '@/router/routes';
import api from '@/api';

const router = useRouter();
const store = useLayoutStore();

const sysName = ref('后台管理系统');
const inputAccount = ref('') as any;
const inputPassword = ref('') as any;
const showLoginForm = ref(true);

const setToken = (token: string) => storage.setToken(token);


// 登录
const login = async () => {
  const params: TZHRequestParams = {
    url: api.login,
    conditions: {
      loginId: inputAccount.value,
      loginPass: inputPassword.value,
    },
    errorMessage: '登录失败',
    successMessage: '登录成功',
  };

  const result = await ZHRequest.get(params);
  if (!result.success) return;
  setToken(result.data.token);

  // 获取路由

  // 跳转路由
  router.push({ path: '/dashboard' });
  // goTo('/root/dashboard');

};

// // 查询用户菜单接口
// const getMenus = async () => {
//   const allMenuList: any = await getMenusList();
//   store.setSystemMenuList(allMenuList);
//   setLayout(allMenuList);
// };

// // 查询用户菜单接口
// const getMenusList = async () => {
//   const params: TZHRequestParams = {
//     url: api.getMenus,
//     conditions: {},
//   };

//   const result = await ZHRequest.get(params);
//   if (!result.success) return;
//   const sortedData = result.data.sort((x: any, y: any) => (Number(x.sortNo) - Number(y.sortNo) > 0) ? 0 : -1);
//   const list = convertMenuArrToTree(sortedData);
//   return list;
// };

// // 设置路由
// const setRoutes = async () => {
//   const roots = router!.getRoutes();
//   // const rootName = roots[roots.length - 1].name || '';
//   // router!.removeRoute(rootName);

//   const params = {
//     url: api.getMenus,
//     conditions: {},
//   };
//   const result = await ZHRequest.get(params);
//   // console.log(result);
//   // RouteRecordRaw[]
//   const routes:RouteRecordRaw[] = result.data;
//   const list:RouteRecordRaw[] = convertMenuArrToTree(routes);
//   updateMenuToRouter(list);
//   const rou: RouteRecordRaw =  {
//     path: '/',
//     component: () => import('@/layout/verticalLayout/index.vue'),
//     name: 'root',
//     children: [
//     {
//       path: '/dashboard',
//       component: () => import('@/views/dashboard/index.vue'),
//       name: '首页',
//       meta: {
//         title: 'dashboard',
//       }
//     },
//       ...list,
//     ],
//   };
//   router!.addRoute(rou);
// };

// const goTo = async (value: any) => {
//   const params: TZHRequestParams = {
//     url: api.changeCal,
//     conditions: {
//       calCode: value.calCode,
//       calName: value.calName,
//     },
//   };

//   const result = await ZHRequest.post(params);
//   if (result.success) {
//     await getMenus();
//     await setRoutes();
//     router.push('/dashboard');
//     // router.push('/userManagement');
//   }
// };

</script>

<script lang="ts">
export default { name: 'login' };
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
