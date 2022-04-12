import { createApp } from "vue";
import { createPinia } from "pinia";
import Router from "./routes";
import App from "./App.vue";
import print from "vue3-print-nb";
import "./index.css";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App).use(Router).use(createPinia()).use(print).use(VueToast).mount("#app");
