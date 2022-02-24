/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-25 09:50:16
 * @LastEditors: zzh
 * @LastEditTime: 2022-02-24 18:43:22
 */
import { ElMessage } from 'element-plus';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $message: ElMessage
    }
  }

  declare module 'vue-router' {
    interface RouteMeta {
      roles?: string[]
    }
}
