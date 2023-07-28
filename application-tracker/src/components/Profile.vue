<template>
    <div>
        <h2>User Profile</h2>
        <!-- <button @click="login" class="bg-blue-500">Log in</button>
        <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
        </pre> -->
        {{ account?.data.session.user.email }}
    </div>
    <div>
        <button @click="logout">logout</button>
    </div>
</template>

<script setup lang="ts">
    import { supabase } from '@/clients/supabase';
    import { ref } from 'vue'
    import router from '../router'

    const account = ref()
    getSession()

    async function getSession() {
        account.value = await supabase.auth.getSession()
    }

    // logout
    async function logout() {
        console.log("logout")
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log(error)
        } else {
            console.log("logout has been good")
            router.push({ path: 'Login', replace: true })
        }
    }

</script>