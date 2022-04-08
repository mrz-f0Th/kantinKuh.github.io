import { createApp } from "vue";
import { createPinia } from "pinia";
import Router from "./routes";
import App from "./App.vue";
import print from 'vue3-print-nb'
import "./index.css";

createApp(App).use(Router).use(createPinia()).use(print).mount("#app");
