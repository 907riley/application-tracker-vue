<script setup lang="ts">
    import HorizontalBar from './icons/HorizontalBar.vue'
    import { ref } from 'vue'
    import type { Ref } from 'vue'

    const is_expanded: Ref<Boolean> = ref(localStorage.getItem('is_expanded') === 'true')

    const ToggleMenu = () => {
        is_expanded.value = !is_expanded.value

        localStorage.setItem("is_expanded", JSON.stringify(is_expanded.value))
    }

    const CloseMenu = () => {
        is_expanded.value = false
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
        <div class="menu">
            <router-link class="menu-button" :to="{ name: 'Applications'}" @click="CloseMenu">
                <span class="material-symbols-outlined">home</span>
                <span class="menu-text">Home</span>
            </router-link>
            <router-link class="menu-button" :to="{ name: 'Stats'}" @click="CloseMenu">
                <span class="material-symbols-outlined">monitoring</span>
                <span class="menu-text">Stats</span>
            </router-link>
            <router-link class="menu-button" :to="{ name: 'Profile'}" @click="CloseMenu">
                <span class="material-symbols-outlined">person</span>
                <span class="menu-text">Profile</span>
            </router-link>
        </div>

        <div class="flex"></div>

        <div class="menu">
            <router-link class="menu-button" :to="{ name: 'Settings'}" @click="CloseMenu">
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

        background-color: var(--dark-aquamarine);
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

                svg {
                    path {
                        stroke: var(--light-pink);
                    }
                }

                &:hover {
                    svg {
                        path {
                            transition: 0.2s ease-out;
                            stroke: var(--bright-pink);
                        }
                    }   
                }
            }
        }

        .menu-button .menu-text {
            opacity: 0;
            visibility: hidden;
        }

        .menu {
            // margin: 0 -1rem;

            .menu-button {
                display: flex;
                align-items: center;
                text-decoration: none;

                padding: 0.5rem 1rem;
                transition: 0.2s ease-out;

                .material-symbols-outlined {
                    font-size: 3rem;
                    color: var(--light-aquamarine);
                    transition: 0.2s ease-out;
                    margin-left: 1rem;
                }

                .menu-text {
                    color: var(--light-aquamarine);
                    font-family: 'Genos';
                    font-weight: bold;
                    transition: 0.2s ease-out;
                }

                &:hover, &.router-link-exact-active {
                    background-color: var(--light-pink);


                    .material-symbols-outlined, .menu-text {
                        color: white;
                    } 

                }

                &.router-link-exact-active {
                    border-right: 5px solid var(--bright-pink);
                }
            }
        }

        &.is_expanded {
            width: var(--side-bar-width);

            .menu-button .menu-text {
                opacity: 1;
            }

            .menu-text {
                visibility: visible;
                font-size: 2rem;
            }

            .menu-button {
                .material-symbols-outlined {
                    margin-right: 1rem;
                }

                &.router-link-exact-active {
                    background-image: linear-gradient(to right, var(--light-pink) 50%, var(--dark-aquamarine));
                }   
            }
        }

        @media (max-width: 768px) {
            position: fixed;
            z-index: 99;
        }
    }

</style>
