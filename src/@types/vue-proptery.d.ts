// 引入 Element Plus 的全局消息提示组件 ElMessage
import { ElMessage } from 'element-plus';

// 声明模块以扩展 Vue 运行时核心的 ComponentCustomProperties 接口
declare module '@vue/runtime-core' {
    // 扩展接口以包含自定义属性 $message，使其可以像方法一样被调用
    interface ComponentCustomProperties {
      $message: ElMessage
    }
  }

  // 声明模块以扩展 vue-router 的 RouteMeta 接口
  declare module 'vue-router' {
    // 扩展接口以允许在路由元信息中包含角色数组，用于权限控制
    interface RouteMeta {
      roles?: string[]
    }
}

