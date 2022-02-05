<template>
    <div class="body">
        <span style="margin: 10px;" @click="goto(true)">登录页</span>
        <span @click="goto(false)">首页</span>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {},
  methods: {
    goto(main:boolean) {
      main ? this.$router.push({ path: '/login' }) : this.$router.push({ path: '/dashboard' })
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
