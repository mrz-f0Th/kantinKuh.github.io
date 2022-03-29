import { createApp } from "vue";
import { createPinia } from "pinia";
import Router from "./routes";
import App from "./App.vue";
import VueHtmlToPaper from "../plugins/VueHtmlToPaper";
import "./index.css";

createApp(App).use(Router).use(createPinia()).use(VueHtmlToPaper).mount("#app");
