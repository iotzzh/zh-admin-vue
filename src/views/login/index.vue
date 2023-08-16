<template>
  <div class="main-content">
    <div class="login-box" v-on:keypress.enter="login" v-if="showLoginForm">
      <div class="user-box">
        <div class="login-title">{{ sysName }}</div>
        <form class="login-form" v-if="showLoginForm">
          <el-input
            v-model="inputAccount"
            class="w-50 m-2 input-box"
            size="large"
            placeholder="随便输入"
            :prefix-icon="Avatar"
            clearable
          ></el-input>
          <el-input
            v-model="inputPassword"
            class="w-50 m-2 input-box"
            size="large"
            placeholder="随便输入"
            type="password"
            :prefix-icon="Lock"
            clearable
            show-password
          ></el-input>
          <el-button type="primary" class="login-button button" @click="login()"
            >登录</el-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Avatar, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import storage from "@/utils/storage";
import { TZHRequestParams } from "@/components/zh-request/type";
import ZHRequest from "@/components/zh-request";
import api from "@/api";

const router = useRouter();

const sysName = ref("后台管理系统");
const inputAccount = ref("") as any;
const inputPassword = ref("") as any;
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
    errorMessage: "登录失败",
    successMessage: "登录成功",
  };

  const result = await ZHRequest.get(params);
  if (!result.success) return;
  setToken(result.data.token);

  // 跳转路由
  router.push({ path: "/root" });
};
</script>

<script lang="ts">
export default { name: "login" };
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
