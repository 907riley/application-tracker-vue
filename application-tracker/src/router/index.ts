import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized} from 'vue-router'
import Login from '../components/LoginPage.vue'
import { supabase } from '@/clients/supabase'

let localUser

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
            // meta: { requiresAuth: true },
            children: [
                {
                    path: 'applications',
                    name: 'Applications',
                    component: () => import('../components/ApplicationsPage.vue'),
                },
                {
                    path: 'stats',
                    name: 'Stats',
                    component: () => import('../components/StatsPage.vue'),
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: () => import('../components/ProfilePage.vue'),
                },
                {
                    path: 'settings',
                    name: 'Settings',
                    component: () => import('../components/SettingsPage.vue'),
                }
            ]
        }
    ]
})


// getUser
async function getUser(to: RouteLocationNormalized, next: NavigationGuardNext) {
    localUser = await supabase.auth.getSession()
    if (localUser.data.session == null) {
        next('/unauthorized')
    } else if (to.name === 'Home') {
        next({name: 'Applications'})
    } else {
        next()
    }
}

// auth requirements
router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth) {
        getUser(to, next)
    } else {
        next()
    }
})

export default router