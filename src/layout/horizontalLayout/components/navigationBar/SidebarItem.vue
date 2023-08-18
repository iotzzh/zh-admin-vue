<template>
  <el-menu-item
    :index="item ? item.url : ''"
    v-if="!item || !item.children || item.children.length === 0"
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
        <span class="tab sub">{{ child.routeName }}</span>
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script lang="ts" setup>
  import { MenuNode } from '@/layout/type';
  import { onMounted, PropType, toRefs } from 'vue';

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

  onMounted(() => {
    console.log();
  });
</script>

<style lang="scss">
  .iconfont {
    padding-right: 3px;
  }
</style>
