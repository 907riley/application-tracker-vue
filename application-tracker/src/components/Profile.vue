<template>
    <div>
        <h2>User Profile</h2>
        <button @click="login" class="bg-blue-500">Log in</button>
        <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
        </pre>
    </div>
</template>

<script setup lang="ts">
    import { useAuth0 } from '@auth0/auth0-vue';

    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    const login = () => {
        loginWithRedirect()
    }
</script>