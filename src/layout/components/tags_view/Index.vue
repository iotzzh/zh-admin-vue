<!--
 * @Author: zzh
 * @Date: 2022-02-25 09:55:19
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-01 13:56:04
 * @Description: tags栏
 * @FilePath: \zh-admin\src\layout\components\tags_view\Index.vue
-->
<template>
  <div class="tags-box">
    <el-scrollbar class="tags-scrollbar">
      <el-tag class="tag" v-for="tag in cachedViews" :key="tag" closable type="success" @close="closeSingleTag(tag)">{{ tag }}</el-tag>
    </el-scrollbar>

    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, ref, reactive } from 'vue';
import { useLayoutStore } from '../../../stores';
import { storeToRefs } from 'pinia';


const store = useLayoutStore();
const { cachedViews } = storeToRefs(store);

const handleTags = (command: string) => {
  console.log(command);
  //  command === 'other' ? this.closeOther() : this.closeAll();
};

// 关闭单个标签
const closeSingleTag = (tag:any)=> {
  // store.removeCachedViewsByTitle();
};

    // // 关闭单个标签
    // closeTags(index) {
    //   const delItem = this.tagsList.splice(index, 1)[0];
    //   const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
    //   if (item) {
    //     delItem.path === this.$route.fullPath && this.$router.push(item.path);
    //   } else {
    //     this.$router.push('/frontadmin/dashboard');
    //   }
    // },
    // // 关闭全部标签
    // closeAll() {
    //   this.tagsList = [];
    //   this.$router.push('/frontadmin/dashboard');
    // },
    // // 关闭其他标签
    // closeOther() {
    //   const curItem = this.tagsList.filter((item) => {
    //     return item.path === this.$route.fullPath;
    //   });
    //   this.tagsList = curItem;
    // },

</script>

<style lang="scss" scoped>
.tags-box {
  padding-top: 5px;
  display: flex;

  .tags-scrollbar {
    flex: 1;
  }

  .tags-close-box {
    width: 100px;
  }
  .tag:not(:first-child) {
    margin: 0px 5px;
  }
}
</style>
