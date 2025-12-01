<template>
  <div 
    class="zh-layout-container"
    :class="config?.className || ''"
    :style="config?.style || {}"
  >
    <!-- 如果有布局配置 -->
    <template v-if="config?.items && config.items.length > 0">
      <!-- Grid布局 -->
      <el-row v-if="config.type === 'grid'" :gutter="config.gutter || 0" class="zh-layout-grid">
        <LayoutItem 
          v-for="(item, index) in layoutInstance.currentLayoutItems" 
          :key="item.id || index" 
          :item="item"
          :layout-instance="layoutInstance" 
          :slots="slots" 
        />
      </el-row>
      
      <!-- Flex布局 -->
      <div v-else-if="config.type === 'flex'" class="zh-layout-flex" :style="{
            display: 'flex',
            flexDirection: config.flexDirection || 'row',
            alignItems: config.alignItems || 'stretch',
            justifyContent: config.justifyContent || 'flex-start',
            gap: config.gap || '0px'
          }">
        <LayoutItem 
          v-for="(item, index) in layoutInstance.currentLayoutItems" 
          :key="item.id || index" 
          :item="item"
          :layout-instance="layoutInstance" 
          :slots="slots" 
        />
      </div>
      
      <!-- 默认布局 -->
      <div v-else class="zh-layout-default">
        <LayoutItem 
          v-for="(item, index) in layoutInstance.currentLayoutItems" 
          :key="item.id || index" 
          :item="item"
          :layout-instance="layoutInstance" 
          :slots="slots" 
        />
      </div>
    </template>
    
    <!-- 如果没有配置，但有默认插槽 -->
    <template v-else-if="slots.default">
      <slot />
    </template>
    
    <!-- 空状态 -->
    <div v-else class="zh-layout-empty">
      <span>暂无布局配置</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useSlots, watch, h } from 'vue';
import { TZHLayoutConfig, TZHLayoutItem } from './type';
import zhLayoutInstance from './index'; // 修改导入别名避免重复

/**
 * 布局项组件
 */
const LayoutItem = defineComponent({
  name: 'LayoutItem',
  props: {
    item: {
      type: Object as () => TZHLayoutItem,
      required: true
    },
    layoutInstance: {
      type: Object,
      required: true
    },
    slots: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    const { item, layoutInstance, slots } = this;

    // 如果布局项被隐藏，不渲染
    if (item.hidden) {
      return null;
    }

    // 确定组件类型
    const Component = item.type || 'div';

    // 构建样式
    const style: Record<string, any> = { ...item.style };

    // 如果是flex布局项，应用flex相关样式
    if (item.flex) {
      style.display = 'flex';
      if (item.flexDirection) style.flexDirection = item.flexDirection;
      if (item.alignItems) style.alignItems = item.alignItems;
      if (item.justifyContent) style.justifyContent = item.justifyContent;
    }

    // 构建类名
    const className = ['zh-layout-item', item.className || ''].filter(Boolean).join(' ');

    // 构建子节点
    const children: any[] = [];

    // 优先使用插槽
    if (item.id && slots[item.id]) {
      children.push(slots[item.id]?.());
    }
    // 如果有子项，递归渲染
    else if (item.children && item.children.length > 0) {
      item.children.forEach((child, index) => {
        children.push(
          h(LayoutItem, {
            key: child.id || index,
            item: child,
            layoutInstance: layoutInstance,
            slots: slots
          })
        );
      });
    }

    // 如果没有插槽和子项，但有内容
    else if (item.content) {
      children.push(item.content);
    }

    // 根据是否在grid布局中，返回不同的结构
    const isGridLayout = this.$parent && (this.$parent as any).$el?.classList?.contains('zh-layout-grid') || false;

    if (isGridLayout) {
      // 在grid布局中，使用el-col
      return h(
        'el-col',
        {
          span: layoutInstance.getColumnSpan(item),
          xl: item.xl,
          lg: item.lg,
          md: item.md,
          sm: item.sm,
          xs: item.xs,
          style: style,
          class: className
        },
        children
      );
    } else {
      // 非grid布局，直接使用指定的组件类型
      return h(
        Component,
        {
          style: style,
          class: className
        },
        children
      );
    }
  }
});

/**
   * 布局组件
   */
export default defineComponent({
  name: 'zhLayout',
  components: {
    LayoutItem
  },
  props: {
    config: {
      type: Object as () => TZHLayoutConfig,
      default: () => ({})
    }
  },
  emits: [
    'update:config',
    'layoutChange'
  ],
  setup(props, { emit }) {
    // 使用 useSlots() 获取插槽
    const slots = useSlots();

    // 创建布局实例
    const layoutInstance = new zhLayoutInstance({
      config: props.config,
      emit: emit
    });

    // 监听配置变化
    watch(() => props.config, (newConfig) => {
      if (layoutInstance.updateConfig) {
        layoutInstance.updateConfig(newConfig);
      }
    }, { deep: true });

    // 开始监听窗口大小变化
    if (layoutInstance.startListeningWindowResize) {
      layoutInstance.startListeningWindowResize();
    }

    return {
      config: props.config,
      slots,
      layoutInstance
    };
  }
});
</script>

<style scoped lang="scss">
.zh-layout-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.zh-layout-grid {
  width: 100%;
}

.zh-layout-flex {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.zh-layout-default {
  width: 100%;
  height: 100%;
}

.zh-layout-item {
  box-sizing: border-box;
  min-height: 40px;
}

.zh-layout-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  background-color: #f5f7fa;
  border: 1px dashed #dcdfe6;
}
</style>