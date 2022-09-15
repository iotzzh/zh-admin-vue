import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

// import moment from 'moment';
// import axios from 'axios';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import './styles/global.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import './assets/iconfont/iconfont.css';

import './styles/element-override.css';
import './styles/iconfont-override.css';
import 'animate.css';

const app = createApp(App);
const store = createPinia();

store.use(createPersistedState({
    storage: sessionStorage,
    // beforeRestore: () => {},
    // afterRestore: () => {},
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
  }));

// app.config.globalProperties.$http = axios;
// app.config.globalProperties.$moment = moment;


app.use(store);

app.use(router);
app.use(ElementPlus, { locale });

app.mount('#app');
