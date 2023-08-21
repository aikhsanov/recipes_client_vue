import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import setDefaultValidationRules from '@/config/validation';
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

setDefaultValidationRules();

const app = createApp(App);
const options: PluginOptions = {
  // You can set your default options here
};

app.use(createPinia());
app.use(router);

app.mount('#app');
app.use(Toast, options);
