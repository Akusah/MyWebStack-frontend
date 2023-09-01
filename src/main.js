
import { VueElement, createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import './assets/css/fonts/linecons/css/linecons.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
