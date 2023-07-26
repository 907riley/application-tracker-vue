import { createRouter, createWebHistory} from 'vue-router'
import Login from '../components/Login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('../components/ApplicationTracker.vue'),
            children: [
                {
                    path: 'applications',
                    name: 'Applications',
                    component: () => import('../components/Applications.vue'),
                },
                {
                    path: 'stats',
                    name: 'Stats',
                    component: () => import('../components/Stats.vue'),
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('../components/Profile.vue'),
                }
            ]
        }
    ]
})

export default router