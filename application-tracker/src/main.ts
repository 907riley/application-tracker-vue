import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue'

import router from './router'


const app = createApp(App)

app.use(
    createAuth0({
        domain: "dev-g65fb6zjzbyut3vb.us.auth0.com",
        clientId: "aKAxHvVk3YSxWdlrD98eKKQRXNvbo5lm",
        authorizationParams: {
            redirect_uri: "http://localhost:5173/home/applications"
        }
    })
)

app.use(createPinia())

app.use(router)

app.mount('#app')
