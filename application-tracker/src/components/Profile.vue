<template>
    <div>
        <h2>User Profile</h2>
        <!-- <button @click="login" class="bg-blue-500">Log in</button>
        <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
        </pre> -->
        {{ account?.data.session.user.email }}
    </div>
</template>

<script setup lang="ts">
    import { supabase } from '@/clients/supabase';
    import { ref } from 'vue'

    const account = ref()
    getSession()

    async function getSession() {
        account.value = await supabase.auth.getSession()
    }

</script>