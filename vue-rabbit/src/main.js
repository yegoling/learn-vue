import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives/index.js'
import { componentPlugin } from './views/Detail/components'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(componentPlugin)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
