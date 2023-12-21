import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Internal
import ApiService from '@/services/ApiService'

const app = createApp(App)

app.use(router)

ApiService.init(app);

app.mount('#app')
