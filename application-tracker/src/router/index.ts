import { createRouter, createWebHistory} from 'vue-router'

import Applications from '../components/Applications.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Applications',
            component:  Applications 
        },
        {
            path: '/stats',
            name: 'Stats',
            component: () => import('../components/Stats.vue') 
        }
    ]
})

export default router