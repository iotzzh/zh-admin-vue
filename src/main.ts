import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import './styles/global.css';
import axios from 'axios';
import './assets/iconfont/iconfont.css';
import './styles/element-override.css';
import './styles/iconfont-override.css';

const app = createApp(App);

app.config.globalProperties.$http = axios;

// 注册Icons 全局组件，element plus icon
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key]);
});

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
