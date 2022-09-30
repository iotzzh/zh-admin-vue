<<<<<<< HEAD
<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:34:57
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-04 13:52:37
 * @Description: 首页
 * @FilePath: \hwason-laboratory-systems\src\views\dashboard\Index.vue
-->
<template>
  <div class="dashboard">
    <div class="nav">
      <div class="left">欢迎进入南京江河华晟实验室</div>
      <div class="right">
        <el-dropdown class="dropdown" @command="handleCommand">
          <span>切换实验室</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="长沙实验室">长沙实验室</el-dropdown-item>
              <el-dropdown-item command="郑州实验室">郑州实验室</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>退出导航</span>
      </div>
    </div>
    <div class="projects">
      <div
        class="project"
        v-for="item in ['前处理', '检验工作站', '后处理', '病理系统', '公共系统']"
        :key="item"
        @click="goto(item)"
      >{{ item }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const handleCommand = (command: string) => {
  console.log(command);
};

const goto = (item:string):void => {
  if (item === '公共系统') {
    router.push('/publicSystems/dashboard');
  } else if (item === '病理系统') {
    router.push('/pathologicalSystem/dashboard');
  }
};

=======
<template>
  首页
</template>

<script setup lang="ts">
>>>>>>> eafb51fa5fdbde13fc6f01021e7bba56cdb8a5d1
</script>

<style lang="scss" scoped>
.dashboard {
  .nav {
    background-color: #f5f5f5;
    padding: 0px 20px;
    .left,
    .right {
      height: 40px;
      line-height: 40px;
      vertical-align: middle;

      .dropdown {
        margin: 0px 20px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: black;
      }
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }

  .nav:after {
    display: table;
    content: " ";
    clear: both;
  }
  .projects {
    flex: 1;
    padding: 30px;
    .project {
      width: 200px;
      height: 100px;
      line-height: 100px;
      background-color: #f5f5f5;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin: 30px;
      font-size: 20px;
      cursor: pointer;
    }
    .project:hover {
      background-color: #909090;
    }
  }
}
</style>
