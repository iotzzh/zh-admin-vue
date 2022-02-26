import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import './styles/global.css';

const app = createApp(App);

// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key]);
});


app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
