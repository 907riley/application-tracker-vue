<script setup lang="ts">
    import HorizontalBar from './icons/HorizontalBar.vue'
    import { ref } from 'vue'

    const is_expanded = ref(false)

    const ToggleMenu = () => {
        is_expanded.value = !is_expanded.value
    }
</script>

<template>
    <aside class="bg-dark-blue-custom border-r-2 border-black z-20" :class="`${is_expanded && 'is_expanded'}`">
        <button @click="ToggleMenu">
            <div class="mx-auto w-fit mt-10 grid grid-rows-3 gap-3">
                <HorizontalBar></HorizontalBar>
                <HorizontalBar></HorizontalBar>
                <HorizontalBar></HorizontalBar>
            </div>
        </button>
    </aside>
</template>

<style scoped>
aside {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    /* width: calc(2rem + 64px); */

    color: black;

    transition: 0.2s ease-out;

    @media (max-width: 768px) {
        position: fixed;
        z-index: 99;
    }
}

.is_expanded {

}
</style>
