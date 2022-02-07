import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Router from './routes'
import App from './App.vue'
import './index.css'

createApp(App)
  .use(Router)
  .use(createPinia())
  .mount('#app')
