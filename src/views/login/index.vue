<template>
  <div class="main-content">
    <div class="login-box" v-on:keypress.enter="login">
      <div class="user-box">
        <div class="login-title">{{ sysName }}</div>

        <div class="login-form" v-if="showLoginForm">
          <el-input v-model="inputAccount" class="w-50 m-2 input-box" size="large" placeholder="工号"
            :prefix-icon="Avatar" clearable></el-input>
          <el-input v-model="inputPassword" class="w-50 m-2 input-box" size="large" placeholder="密码" type="password"
            :prefix-icon="Lock" clearable></el-input>
          <el-button type="primary" class="login-button button" @click="login()">登录</el-button>
          <!-- <el-checkbox label="记住我" v-model="rememberPassword" size="large"></el-checkbox> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { api } from '../../api/login';
import storage from '@/utils/storage';
import { convertMenuArrToTree } from '@/utils/dataConvert';
import { popErrorMessage, popSuccessMessage } from '@/components/zh-message';
import { useLayoutStore } from '@/layout/store';
// import ImgLoginBg from '@/assets/img/loginBg.png';
 

const router = useRouter();
const store = useLayoutStore();

const sysName = ref();
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
const setCommoParams = (params: any) => storage.setCommonParams(params);
const setUserInfo = (params: any) => storage.setUserInfo(params);
const userLabListHs = ref([]) as any; //实验室

// 登录
const login = async () => {
  router.push('/dashboard');
  // const params = { url: api.login, conditions: { loginPass: inputPassword.value, loginId: inputAccount.value }, errorMessage: '登录失败' } as RequestParamsModel;
  // const result = await get(params);
  // if (!result.success) return;
  // popSuccessMessage('登录成功！');
  // setFormInfo();
  // setUserInfo(result.data);
  // setToken(result.data.token);
  // // console.log('登录返回值：：：', result);
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

// 添加监听enter事件
onMounted(() => {
  // const isCloud = storage.getIsCloud();
  // sysName.value = isCloud ? '云实验室LIS系统' : '实验室LIS系统';
  // const loginFormInfo: any = storage.getLoginFormInfo();
  // if (loginFormInfo && loginFormInfo.rememberPass) {
  //   rememberPassword.value = true;
  //   inputPassword.value = loginFormInfo.pass;
  //   inputAccount.value = loginFormInfo.account;
  // } else {
  //   rememberPassword.value = false;
  //   inputPassword.value = '';
  //   inputAccount.value = '';
  // }
});

const goTo = async (value: any, num: number) => {
  // //切换实验室
  // const params = { url: api.changeLab, conditions: { labCode: value.labCode, labName: value.labName, labLibraryName: value.labName, topicName: value.labCode }, } as RequestParamsModel;
  // const res = await postWithoutCommonParams(params);
  // if (res.success) {
  //   // 存取实验室code和name
  //   setCommoParams({ labCode: res.data.labCode, labName: res.data.labName, labLibraryName: res.data.labName, topicName: res.data.labCode });
  //   await getMenus();
  // } else {
  //   popErrorMessage(res.errorMsg);
  // }
  
};

// 查询用户菜单接口
const getMenus = async () => {
  const allMenuList: any = await getMenusList();
  store.setAllSystemMenuList(allMenuList);
  // 如果用户有多个系统的权限，由用户选择进入某个系统；如果用户只有一个系统的权限，直接进入该系统首页
  if (allMenuList.length > 1) {
    router.push('/dashboard');
  } else if (allMenuList.length === 1) {
    store.setSystemName(allMenuList[0].permsionName);
    router.push(allMenuList[0].url);
  } else {
    popErrorMessage('该用户暂未配置任何系统权限，请配置后重新登录');
  }

};

// 查询用户菜单接口
const getMenusList = async () => {
  // const params = { url: api.getMenus, conditions: {}, errorMessage: '获取菜单数据失败' } as RequestParamsModel;
  // const result = await post(params);
  // if (!result.success) return;
  // const menuList = convertMenuArrToTree(result.data);
  // return menuList;
};

</script>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/loginBg.png) no-repeat center center;
  background-size: cover;
  position: relative;
}

.login-box {
  width: 800px;
  min-height: 353px;
  // height: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px;
  background: url(../../assets/img/userBg.png) no-repeat center center;
  background-size: 100% 100%;

  .user-box {
    width: 338px;
    height: 100%;
    float: right;
  }

  .login-title {
    text-align: center;
    font-size: 22px;
    padding: 10px 0 20px 0px;
    color: #6196ea;
  }

  .input-box {
    margin: 15px 0px;
  }

  .button {
    width: 100%;
    height: 40px;
    margin: 15px 0px 0px 0px;
  }
}
</style>
