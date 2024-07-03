import { createApp, provide, h } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { DefaultApolloClient, apolloClient } from './services/apollo'
import { router } from './routes'

import App from './App.vue'


import './css/main.css'

createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App)
})

    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
        }
    })
    .mount('#app')

