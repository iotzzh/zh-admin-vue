<template>
  <el-menu-item :index="item ? item.url : ''" v-if="!item || !item.children || item.children.length === 0">
    {{ item?.menuName }}
  </el-menu-item>

  <el-sub-menu :index="item ? item.id : ''" v-else>
    <template #title>
      <span class="tab">{{ item?.menuName }}</span>
    </template>

    <div v-for="(child, index) in item?.children" :key="index">
      <template v-if="child.children && child.children.length > 0">
        <sidebar-item :key="child.id" :item="child" />
      </template>
      <el-menu-item v-else :index="child.url">
        <span class="tab sub">{{ child.menuName }}</span>
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { MenuNode } from '../../../../model/menuNode';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  },
  item: {
    type: Object as PropType<MenuNode>,
  },
});

const { item } = toRefs(props);
</script>

<style lang="scss"></style>