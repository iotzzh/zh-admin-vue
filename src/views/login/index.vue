<template>
  <div class="main-content">
    <div class="login-box" v-on:keypress.enter="login" v-if="showLoginForm">
      <div class="user-box">
        <div class="login-title">{{ sysName }}</div>
        <form class="login-form" v-if="showLoginForm">
          <el-input v-model="inputAccount" class="w-50 m-2 input-box" size="large" placeholder="工号"
            :prefix-icon="Avatar" clearable></el-input>
          <el-input v-model="inputPassword" class="w-50 m-2 input-box" size="large" placeholder="密码" type="password"
            :prefix-icon="Lock" clearable show-password></el-input>
          <el-button type="primary" class="login-button button" @click="login()">登录</el-button>
        </form>
      </div>
    </div>

    <div class="login-select-org" v-else>
      <el-button type="primary" class="button" v-for="(item, index) in orgList" :key="index"
        @click="goTo(item)">{{ item.calName }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import api from '@/api/login';
import storage from '@/utils/storage';
import { popErrorMessage } from '@/components/zh-message';
import { useLayoutStore } from '@/layout/store';
import { TZHRequestParams } from '@/components/zh-request/type';
import ZHRequest from '@/components/zh-request';
import { convertMenuArrToTree } from '@/utils/dataConvert';
import { setLayout } from '@/router/routes';


const router = useRouter();
const store = useLayoutStore();
const orgList = ref([]) as any; // 机构列表

const sysName = ref('后台管理系统');
const inputAccount = ref('') as any;
const inputPassword = ref('') as any;
const showLoginForm = ref(true);
const rememberPassword = ref(false);

const setFormInfo = () => {
  storage.setLoginFormInfo({
    accout: inputAccount.value,
    pass: inputPassword.value,
    rememberPass: rememberPassword.value,
  });
};
const setToken = (token: string) => storage.setToken(token);
const setUserInfo = (params: any) => storage.setUserInfo(params);
const setCommoParams = (params: any) => storage.setCommonParams(params);
const setRootId = (id:string) => storage.setRootId(id);

// 登录
const login = async () => {
  const params: TZHRequestParams = {
    url: api.login,
    conditions: {
      loginType: 'account',
      loginChannel: 'admin',
      loginId: inputAccount.value,
      loginPass: inputPassword.value,
    },
    errorMessage: '登录失败',
    successMessage: '登录成功',
  };

  const result = await ZHRequest.get(params);
  if (!result.success) return;

  setFormInfo();
  setUserInfo(result.data);
  setToken(result.data.token);

  if (result.data.userCalList.length > 1) {
    showLoginForm.value = false;
    orgList.value = result.data.userCalList;
  } else if (result.data.userCalList.length === 1) {
    showLoginForm.value = false;
    orgList.value = result.data.userCalList;
  } else {
    popErrorMessage(result.errorMsg);
  }



  // await getMenus();
  // router.push('/dashboard');

  // if (result.data.userLabList.length > 1) {
  //   showLoginForm.value = false;
  //   userLabListHs.value = result.data.userLabList;
  // } else if (result.data.userLabList.length === 1) {
  //   const params = { labCode: result.data.userLabList[0].labCode, labName: result.data.userLabList[0].labName, };
  //   goTo(params, 1); //只有一个实验室
  // } else {
  //   popErrorMessage(result.errorMsg);
  // }
};
// 查询用户菜单接口
const getMenus = async () => {
  const allMenuList: any = await getMenusList();
  store.setSystemMenuList(allMenuList);
  setLayout(allMenuList);
};

// 查询用户菜单接口
const getMenusList = async () => {
  const params: TZHRequestParams = {
    url: api.getMenus,
    conditions: {},
  };

  const result = await ZHRequest.get(params);
  if (!result.success) return;
  const sortedData = result.data.sort((x:any, y:any) => (Number(x.sortNo) - Number(y.sortNo) > 0) ? 0 : -1);
  const list = convertMenuArrToTree(sortedData);
  return list;
};


const goTo = async (value: any) => {
  const params: TZHRequestParams = {
    url: api.changeCal,
    conditions: {
      calCode: value.calCode,
      calName: value.calName,
    },
  };

  const result = await ZHRequest.post(params);
  if (result.success) {
    setCommoParams({ defaultCalCode: result.data.defaultCalCode, defaultCalName: result.data.defaultCalName });
    await getCalRootPermissionId();
    await getMenus();
    router.push('/dashboard');
  }
};

const getCalRootPermissionId = async () => {
    const apiParams: TZHRequestParams = {
        url: api.getCalRootPermissionId,
        conditions: {},
        errorMessage: '获取根目录数据失败',
    };
    const result = await ZHRequest.post(apiParams);
    if (result.success) setRootId(result.data.id);
};

</script>

<script lang="ts">
export default { name: 'login' };
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
