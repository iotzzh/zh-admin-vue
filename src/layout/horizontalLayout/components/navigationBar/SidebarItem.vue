<template>
  <el-menu-item :index="item ? item.url : ''" v-if="!item || !item.children || item.children.length === 0">
    {{ item?.name }}
  </el-menu-item>

  <el-sub-menu :index="item ? item.id : ''" v-else>
    <template #title>
      <span class="tab">{{ item?.name }}</span>
    </template>

    <div v-for="(child, index) in item?.children" :key="index">
      <template v-if="child.children && child.children.length > 0">
        <sidebar-item :key="child.id" :item="child" />
      </template>
      <el-menu-item v-else :index="child.url">
        <span class="tab sub">{{ child.name }}</span>
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
    default: true
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

</style>