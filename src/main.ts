import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { router } from './routes'

import App from './App.vue'


import './css/main.css'

createApp(App)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
        }
    })
    .mount('#app')

