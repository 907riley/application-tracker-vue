<template>
    <div class="flex-col">
        <div class="font-genos font-bold text-9xl text-center">
            Full profile page coming soon
        </div>
        <div class="flex flex-col m-5 gap-4 w-fit">
            <div class="flex flex-row gap-4">
                <h2>Email: </h2>
                <!-- <button @click="login" class="bg-blue-500">Log in</button>
                <pre v-if="isAuthenticated">
                    <code>{{ user }}</code>
                </pre> -->
                {{ account?.data.session.user.email }}
            </div>
            <button @click="logout" class="p-2 bg-red-700">logout</button>
        </div>
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
            router.push({ name: 'Login', replace: true })
        }
    }

</script>