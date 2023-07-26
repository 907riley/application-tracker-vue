
<script setup lang="ts">
    import Applications from './Applications.vue'
    import TopControlBar from './TopControlBox.vue'
    import SideBar from './SideBar.vue'
</script>

<template>
    <div id="page-wrapper" class="flex flex-cols h-screen">
        <SideBar></SideBar>
        <main class="">
            <div class="bg-dark-blue-custom flex flex-row border-2 border-black drop-shadow-3xl z-10 top-bar-wrapper">
                <div class="my-auto mx-10 flex-1">
                    <p class="font-bold text-6xl font-genos title">
                        {{$route.name}}
                    </p>
                </div>
                <TopControlBar></TopControlBar>
                <div>
                    <!-- <button @click="logoutUser" class="bg-white">Log out</button> -->
                </div>
            </div>
            <div class="content-wrapper">
                <RouterView></RouterView>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
    #page-wrapper {
        display: flex; 

        main {
            flex: 1 1 0;

            display: flex;
            flex-direction: column;

            @media (max-width: 768px) {
                padding-left: 6rem;
            }

            .top-bar-wrapper {
                height: 116px;
                background-color: var(--dark-aquamarine);
            }

            .content-wrapper {
                flex: 1 1 0;

                display: flex;
                flex-direction: column;
                background-color: var(--light-aquamarine);
            }
        }
    }

    .title {
        color: white;
    }
</style>