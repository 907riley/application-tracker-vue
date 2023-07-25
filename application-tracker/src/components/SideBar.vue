<script setup lang="ts">
    import HorizontalBar from './icons/HorizontalBar.vue'
    import { ref } from 'vue'
    import type { Ref } from 'vue'

    const is_expanded: Ref<Boolean> = ref(localStorage.getItem('is_expanded') === 'true')

    const ToggleMenu = () => {
        is_expanded.value = !is_expanded.value

        localStorage.setItem("is_expanded", JSON.stringify(is_expanded.value))
    }
</script>

<template>
    <aside class="border-r-2 border-black z-20" :class="`${is_expanded && 'is_expanded'}`">
        <div class="menu-toggle-wrap">
            <button @click="ToggleMenu" class="menu-toggle">
                <div class="mx-auto w-fit grid grid-rows-3 gap-3 triple-bar-wrapper">
                    <HorizontalBar></HorizontalBar>
                    <HorizontalBar></HorizontalBar>
                    <HorizontalBar></HorizontalBar>
                </div>
            </button>
        </div>
        <h3>Menu</h3>
        <div class="menu">
            <router-link class="button" to="/">
                <span class="material-symbols-outlined">home</span>
                <span class="menu-text">Home</span>
            </router-link>
            <router-link class="button" to="/stats">
                <span class="material-symbols-outlined">monitoring</span>
                <span class="menu-text">Stats</span>
            </router-link>
        </div>

        <div class="flex"></div>

        <div class="menu">
            <router-link class="button" to="/settings">
                <span class="material-symbols-outlined">settings</span>
                <span class="menu-text">Settings</span>
            </router-link>
        </div>
    </aside>
</template>

<style lang="scss">

    aside {
        display: flex;
        flex-direction: column;
        width: calc(4rem + 52px);
        overflow: hidden;
        min-height: 100vh;

        background-color: var(--dark-blue);
        border-right: 2px solid black;

        transition: 0.2s ease-out;

        .flex {
            flex: 1 1 0;
        }

        .menu-toggle-wrap {
            display: flex;
            justify-content: flex-end;
            height: calc(4rem + 52px);;

            .menu-toggle {
                transition: 0.2s ease-out;
                padding: 2rem;

                &:hover {
                    svg {
                        path {
                            transition: 0.2s ease-out;
                            stroke: var(--light-blue);
                        }
                    }   
                }
            }
        }

        h3, .button .menu-text {
            opacity: 0;
            transition: 0.3s ease-out;
        }

        h3 {
            font-size: 0rem;
            margin: 0rem;
            text-transform: uppercase;
        }

        .menu {
            margin: 0 -1rem;

            .button {
                display: flex;
                align-items: center;
                text-decoration: none;

                padding: 0.5rem 1rem;
                transition: 0.2s ease-out;

                .material-symbols-outlined {
                    font-size: 2rem;
                    color: white;
                    transition: 0.2s ease-out;
                }

                .menu-text {
                    color: white;
                    transition: 0.2s ease-out;
                }

                &:hover, &.router-link-exact-active {
                    background-color: grey;

                    .material-symbols-outlined, .menu-text {
                        color: white;
                    } 
                }

                &.router-link-exact-active {
                    border-right: 5px solid black;
                }
            }
        }

        &.is_expanded {
            width: var(--side-bar-width);

            h3, .button .menu-text {
                opacity: 1;
            }

            h3 {
                color: black;
                font-size: 1 rem;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
            }

            .button {
                .material-symbols-outlined {
                    margin-right: 1rem;
                }
            }
        }

        @media (max-width: 768px) {
            position: fixed;
            z-index: 99;
        }
    }


    .is_expanded {
    column-span: 2;
    }
</style>
