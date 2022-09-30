<!--
 * @Author: zzh
 * @Date: 2022-04-18 23:08:58
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-18 23:30:11
 * @Description: 设置图标
 * @FilePath: \zh-admin\src\components\right_panel\Index.vue
-->
<template>
  <div class="handle-button" @click="show = true">
    <el-icon>
      <setting />
    </el-icon>
  </div>
  <el-drawer
    title="设置"
    v-model="show"
    size="300px"
    direction="rtl"
    destroy-on-close
  >
    <slot />
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 99;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;

  top: 50vh;
  background-color: blue;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
