import { createRouter, createWebHistory} from 'vue-router'

import Applications from '../components/Applications.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:  Applications 
        },
        {
            path: '/stats',
            component: () => import('../components/Stats.vue') 
        }
    ]
})

export default router