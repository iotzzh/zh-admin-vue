<template>
  <div class="box" v-loading="loading">
    <div class="container right-panel-active">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <form action="#" class="form" id="form1">
          <h2 class="form__title">登录</h2>
          <input type="text" placeholder="用户名（任意输入）" class="input" />
          <input type="text" placeholder="邮箱（任意输入）" class="input" />
          <input type="password" placeholder="密码（任意输入）" class="input" />
          <button class="btn">登录</button>
        </form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <form action="#" class="form" id="form2">
          <h2 class="form__title">注册</h2>
          <input type="email" placeholder="Email" class="input" />
          <input type="password" placeholder="Password" class="input" />
          <a href="#" class="link">忘记密码?</a>
          <button class="btn">注册</button>
        </form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn">注册</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Avatar, Lock } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import storage from '@/utils/storage';
  import { TZHRequestParams } from '@/components/zh-request/type';
  import ZHRequest from '@/components/zh-request';
  import api from '@/api';

  const router = useRouter();
  const loading = ref(false);

  const sysName = ref('后台管理系统');
  const inputAccount = ref('') as any;
  const inputPassword = ref('') as any;
  const showLoginForm = ref(true);

  const setToken = (token: string) => storage.setToken(token);

  // 注册
  const login = async () => {
    loading.value = true;
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
    loading.value = false;
    if (!result.success) return;
    setToken(result.data.token);

    // 跳转路由
    router.push({ path: '/root' });
  };

  onMounted(() => {
    const signInBtn: any = document.getElementById('signIn');
    const signUpBtn: any = document.getElementById('signUp');
    const fistForm: any = document.getElementById('form1');
    const secondForm: any = document.getElementById('form2');
    const container: any = document.querySelector('.container');

    signInBtn.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    signUpBtn.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    fistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      login();
    });
    secondForm.addEventListener('submit', (e) => {
      e.preventDefault();
      login();
    });
  });
</script>

<script lang="ts">
  export default { name: 'login' };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
