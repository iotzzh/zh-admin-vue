/*
 * @Author: zzh
 * @Date: 2022-02-28 14:52:53
 * @LastEditors: zzh
 * @LastEditTime: 2022-11-23 14:46:38
 * @Description: 同一导出store， 参考 redux， reduce.compine()
 * @FilePath: \zh-admin\src\stores\index.ts
 */

// import { useLayoutStore } from './layout';

// export { useLayoutStore };

import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>) {
    app.use(store);
}

export { store };