import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import { createAuth0 } from '@auth0/auth0-vue'
// import { createClient } from '@supabase/supabase-js'

import router from './router'

// const supabase = createClient(
//     "https://agztpyhgayxwmbxdkjpr.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnenRweWhnYXl4d21ieGRranByIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5MjU3NDEsImV4cCI6MjAwNTUwMTc0MX0.J734VpSt_JfF7YtbcV0868LRc4gjUkN8fIfquYvJnog",
// )

const app = createApp(App)

// app.use(
//     createAuth0({
//         domain: "dev-g65fb6zjzbyut3vb.us.auth0.com",
//         clientId: "aKAxHvVk3YSxWdlrD98eKKQRXNvbo5lm",
//         authorizationParams: {
//             redirect_uri: "http://localhost:5173/home/applications"
//         }
//     })
// )


app.use(router)

app.use(createPinia())

app.mount('#app')


// supabase.auth.onAuthStateChange((event, session) => {
//     userSession.value = session
// })