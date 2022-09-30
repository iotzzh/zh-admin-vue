<<<<<<< HEAD
<!--
 * @Author: zzh
 * @Date: 2022-03-02 15:45:58
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-04 10:45:01
 * @Description: 登录界面
 * @FilePath: \hwason-laboratory-systems\src\views\login\Index.vue
-->
<template>
    <div class="login-box">
        <div class="login-title">实验室LIS系统</div>
        <div class="login-form" v-if="showLoginForm">
            <el-input
                v-model="inputAccount"
                class="w-50 m-2 input-box"
                size="large"
                placeholder="工号"
                :prefix-icon="Avatar"
                clearable
            ></el-input>
            <el-input
                v-model="inputPassword"
                class="w-50 m-2 input-box"
                size="large"
                placeholder="密码"
                type="password"
                :prefix-icon="Lock"
                clearable
            ></el-input>
            <el-button type="primary" class="login-button button" @click="login()">登录</el-button>
            <el-checkbox label="记住我" size="large"></el-checkbox>
        </div>

        <div class="login-select-laboratory" v-else>
            <el-button type="primary" class="button" @click="goto()">南京实验室</el-button>
            <el-button type="primary" class="button">长沙实验室</el-button>
            <el-button type="primary" class="button">郑州实验室</el-button>
            <el-button type="primary" class="button">其他实验室</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputAccount = ref('');
const inputPassword = ref('');
const showLoginForm = ref(true);

const login = () => {
    console.log('login');
    showLoginForm.value = false;
};

const enterLogin = () => {
    let key = (window as any).event.keyCode;
    if (key == 13) {
        login();
    }
};

// 添加监听enter事件
onMounted(() => {
    document.addEventListener('keydown', enterLogin);
});

// 在组件卸载时，移出加载时监听的enter事件
onBeforeUnmount(() => {
    document.removeEventListener('keydown', enterLogin);
});

const goto = () => {
    const path = '/dashboard';
    router.push(path);
};

</script>

<style lang="scss" scoped>
.login-box {
    width: 30vw;
    height: 60vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #f5f5f5;
    font-family: Arial, Helvetica, sans-serif;
    padding: 30px 5vw;
    .login-title {
        text-align: center;
        font-size: 22px;
        padding: 20px 0px;
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
=======
<!--
 * @Author: zzh
 * @Date: 2022-04-10 09:29:01
 * @LastEditors: zzh
 * @LastEditTime: 2022-06-05 22:05:44
 * @Description: 登录页
 * @FilePath: \zh-admin\src\views\login\Index.vue
-->
<template>
  <div class="login">
    <div class="login-box" v-on:keypress.enter="login">
      <div class="login-title">zh admin</div>
      <div class="login-form">
        <el-input
          v-model="inputAccount"
          class="input-box"
          size="large"
          placeholder="请输入账号"
          :prefix-icon="Avatar"
          clearable
        ></el-input>
        <el-input
          v-model="inputPassword"
          class="input-box"
          size="large"
          placeholder="请输入密码"
          type="password"
          :prefix-icon="Lock"
          clearable
        ></el-input>
        <el-button type="primary" class="login-button button" @click="login()"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { popSuccessMessage } from '@/components/hs-message';
import menuList from './mockMenuData';
import { useLayoutStore } from '@/stores/index';

const store = useLayoutStore();
const router = useRouter();

const inputAccount = ref('') as any;
const inputPassword = ref('') as any;

// 登录
const login = async () => {
  popSuccessMessage('登录成功！');
  store.setSystemMenuList(menuList as any);
  router.push('/dashboard');
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/background.png');
  background-size: cover; /* 覆盖:图片成比例填满盒子。可用于适配 */
  .login-box {
    width: 35%;
    min-width: 300px;
    height: 300px;
    border-radius: 10px;
    border: 1px solid #8ecdff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-title {
      color: #4550e4;
      text-align: center;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 30px;
      padding: 15px;
    }

    .login-form {
      text-align: center;
      .input-box {
        margin-top: 12px;
        width: 90%;
        &:deep(.el-input__inner) {
          background-color: transparent;
        }
      }
      
      &:deep(.el-input__wrapper) {
        background-color: transparent;
      }

      .login-button {
        width: 100px;
        margin-top: 20px;
        background-color: transparent;
      }
    }
  }
}
</style>
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
