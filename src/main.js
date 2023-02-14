import { createApp } from 'vue'
import App from './App.vue'

import { makeServer } from './fake-server'

import './assets/main.css'

makeServer()

createApp(App).mount('#app')
