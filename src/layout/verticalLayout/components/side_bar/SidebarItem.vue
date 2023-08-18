<template>
  <!-- 这里没有url，跳转到新的界面：提示配置该路由 -->
  <el-menu-item
    v-if="!item || !item.children || item.children.length === 0"
    :index="item ? item.url : ''"
  >
    <i :class="'iconfont ' + item?.icon"></i>
    <template #title
      ><span class="tab">{{ item?.routeName }}</span></template
    >
  </el-menu-item>

  <el-sub-menu :index="item ? item.id : ''" v-else>
    <template #title>
      <i :class="'iconfont ' + item?.icon"></i>
      <span class="tab">{{ item?.routeName }}</span>
    </template>

    <div v-for="(child, index) in item?.children" :key="index">
      <template v-if="child.children && child.children.length > 0">
        <sidebar-item :key="child.id" :item="child" />
      </template>
      <el-menu-item v-else :index="child.url" :key="child.id">
        <i :class="'iconfont ' + child?.icon"></i>
        <span class="tab sub">{{ child?.routeName }}</span>
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script lang="ts" setup>
  import { MenuNode } from '@/layout/type';
  import { PropType, toRefs } from 'vue';

  const props = defineProps({
    collapse: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Object as PropType<MenuNode>,
    },
  });

  const { item } = toRefs(props);
</script>

<style lang="scss">
  .el-menu-vertical {
    width: 100%;
    border-right: none !important;
    overflow-y: scroll;

    .tab {
      font-size: 16px;
    }

    .el-menu-item {
      color: #333 !important;
    }

    .el-sub-menu {
      .el-menu {
        // background: #fff !important;
      }
    }

    .el-sub-menu__title {
      // color: #333 !important;
    }

    .el-menu-item:hover {
      // background-color: #91bbff !important;
      // color: #fff !important;
    }

    .el-sub-menu__title:hover {
      // background-color: #91bbff !important;
      // color: #fff !important;
    }
  }

  .el-menu-vertical::-webkit-scrollbar {
    width: 0px;
    height: 4px;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    min-height: 400px;
  }

  .iconfont {
    margin-right: 5px;
  }
</style>
