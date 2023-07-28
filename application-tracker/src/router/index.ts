import { createRouter, createWebHistory, START_LOCATION, type NavigationGuardNext} from 'vue-router'
import Login from '../components/Login.vue'
import { supabase } from '@/clients/supabase'

let localUser

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('../components/ApplicationTracker.vue'),
            meta: { requiresAuth: true },
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
                    name: 'Profile',
                    component: () => import('../components/Profile.vue'),
                },
                {
                    path: 'settings',
                    name: 'Settings',
                    component: () => import('../components/Settings.vue'),
                }
            ]
        }
    ]
})


// getUser
async function getUser(next: NavigationGuardNext) {
    localUser = await supabase.auth.getSession()
    if (localUser.data.session == null) {
        next('/unauthorized')
    } else {
        next()
    }
}

// auth requirements
router.beforeEach((to, from, next) => {
    if (from === START_LOCATION) {
        to.name === 'Login'
    }

    if (from.name === 'Login' && to.name != 'Applications') {
        getUser(next)
    }

    if (to.meta.requiresAuth) {
        getUser(next)
    } else {
        next()
    }
})

export default router