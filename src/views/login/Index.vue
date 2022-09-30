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