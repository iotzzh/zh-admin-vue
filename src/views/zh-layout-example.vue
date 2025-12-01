<template>
  <div className="zh-layout-example">
    <div className="example-header">
      <h2>zh-layout 组件示例</h2>
      <p>根据传入的JSON配置，展示不同的布局，并支持插槽功能</p>
    </div>
    
    <div className="example-content">
      <!-- 示例1：基础Grid布局 -->
      <div className="example-section">
        <h3>示例1：基础Grid布局</h3>
        <zhLayout :config="gridLayoutConfig">

          <template #header>
            <div className="header-content">这是头部内容（通过插槽传入）</div>
          </template>
          <template #aside>
            <div className="aside-content">这是侧边栏内容（通过插槽传入）</div>
          </template>
          <template #main>
            <div className="main-content">这是主内容区域（通过插槽传入）</div>
          </template>
          <template #footer>
            <div className="footer-content">这是底部内容（通过插槽传入）</div>
          </template>
        </zhLayout>
      </div>
      
      <!-- 示例2：Flex布局 -->
      <div className="example-section">
        <h3>示例2：Flex布局</h3>
        <zhLayout :config="flexLayoutConfig">
          <template #left>
            <div className="left-content">左侧面板</div>
          </template>
          <template #center>
            <div className="center-content">中间面板</div>
          </template>
          <template #right>
            <div className="right-content">右侧面板</div>
          </template>
        </zhLayout>
      </div>
      
      <!-- 示例3：嵌套布局 -->
      <div className="example-section">
        <h3>示例3：嵌套布局</h3>
        <zhLayout :config="nestedLayoutConfig">
          <template #header>
            <div className="header-content">嵌套布局的头部</div>
          </template>
          <template #sidebar>
            <div className="sidebar-content">嵌套布局的侧边栏</div>
          </template>
          <template #top>
            <div className="top-content">嵌套布局的顶部区域</div>
          </template>
          <template #middle1>
            <div className="middle-content">嵌套布局的中间左区域</div>
          </template>
          <template #middle2>
            <div className="middle-content">嵌套布局的中间右区域</div>
          </template>
          <template #bottom>
            <div className="bottom-content">嵌套布局的底部区域</div>
          </template>
        </zhLayout>
      </div>
      
      <!-- 示例4：响应式布局 -->
      <div className="example-section">
        <h3>示例4：响应式布局</h3>
        <p>尝试调整浏览器窗口大小，查看响应式变化</p>
        <zhLayout :config="responsiveLayoutConfig">
          <template v-for="i in 6" :key="i" :#[`item${i}`]>
            <div className="responsive-item">响应式项目 {{ i }}</div>
          </template>
        </zhLayout>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import zhLayout from '@/components/zh-layout/index.vue';
import { TZHLayoutConfig } from '@/components/zh-layout/type';

// 示例1：基础Grid布局配置
const gridLayoutConfig = ref<TZHLayoutConfig>({
  type: 'grid',
  gutter: 20,
  items: [
    {
      id: 'header',
      type: 'header',
      span: 24,
      style: {
        height: '60px',
        backgroundColor: '#409EFF',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'aside',
      type: 'aside',
      span: 6,
      style: {
        height: '300px',
        backgroundColor: '#67C23A',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'main',
      type: 'main',
      span: 18,
      style: {
        height: '300px',
        backgroundColor: '#E6A23C',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'footer',
      type: 'footer',
      span: 24,
      style: {
        height: '60px',
        backgroundColor: '#909399',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  ]
});

// 示例2：Flex布局配置
const flexLayoutConfig = ref<TZHLayoutConfig>({
  type: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  items: [
    {
      id: 'left',
      span: 8,
      style: {
        height: '200px',
        backgroundColor: '#F56C6C',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1'
      }
    },
    {
      id: 'center',
      span: 8,
      style: {
        height: '200px',
        backgroundColor: '#409EFF',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '2'
      }
    },
    {
      id: 'right',
      span: 8,
      style: {
        height: '200px',
        backgroundColor: '#67C23A',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1'
      }
    }
  ]
});

// 示例3：嵌套布局配置
const nestedLayoutConfig = ref<TZHLayoutConfig>({
  type: 'grid',
  gutter: 10,
  items: [
    {
      id: 'header',
      span: 24,
      style: {
        height: '50px',
        backgroundColor: '#409EFF',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'sidebar',
      span: 6,
      style: {
        height: '400px',
        backgroundColor: '#67C23A',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'content',
      span: 18,
      flex: true,
      flexDirection: 'column',
      gap: '10px',
      children: [
        {
          id: 'top',
          style: {
            height: '100px',
            backgroundColor: '#E6A23C',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        {
          id: 'middle',
          flex: true,
          flexDirection: 'row',
          gap: '10px',
          children: [
            {
              id: 'middle1',
              style: {
                flex: 1,
                backgroundColor: '#F56C6C',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            },
            {
              id: 'middle2',
              style: {
                flex: 1,
                backgroundColor: '#909399',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          ]
        },
        {
          id: 'bottom',
          style: {
            height: '100px',
            backgroundColor: '#C0C4CC',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }
      ]
    }
  ]
});

// 示例4：响应式布局配置
const responsiveLayoutConfig = ref<TZHLayoutConfig>({
  type: 'grid',
  gutter: 10,
  items: [
    {
      id: 'item1',
      span: 6,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
      style: {
        height: '150px',
        backgroundColor: '#F56C6C',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'item2',
      span: 6,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
      style: {
        height: '150px',
        backgroundColor: '#E6A23C',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'item3',
      span: 6,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
      style: {
        height: '150px',
        backgroundColor: '#409EFF',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'item4',
      span: 6,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
      style: {
        height: '150px',
        backgroundColor: '#67C23A',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'item5',
      span: 12,
      xl: 12,
      lg: 16,
      md: 24,
      sm: 24,
      xs: 24,
      style: {
        height: '150px',
        backgroundColor: '#909399',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'item6',
      span: 12,
      xl: 12,
      lg: 16,
      md: 24,
      sm: 24,
      xs: 24,
      style: {
        height: '150px',
        backgroundColor: '#C0C4CC',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  ]
});
</script>

<style scoped lang="scss">
.zh-layout-example {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.example-header {
  text-align: center;
  margin-bottom: 30px;
}

.example-header h2 {
  margin-bottom: 10px;
  color: #303133;
}

.example-header p {
  color: #606266;
}

.example-content {
  max-width: 1200px;
  margin: 0 auto;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.example-section h3 {
  margin-bottom: 20px;
  color: #303133;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.example-section p {
  margin-bottom: 15px;
  color: #606266;
}

/* 插槽内容样式 */
.header-content,
.aside-content,
.main-content,
.footer-content,
.left-content,
.center-content,
.right-content,
.sidebar-content,
.top-content,
.middle-content,
.bottom-content,
.responsive-item {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
</style>