
<script setup lang="ts">
    import Applications from './Applications.vue'
    import TopControlBar from './TopControlBox.vue'
    import SideBar from './SideBar.vue'
</script>

<template>
    <div id="page-wrapper" class="flex flex-cols h-screen">
        <SideBar></SideBar>
        <main class="grid grid-rows-layout-row col-start-2 col-span-11">
            <div class="bg-dark-blue-custom row-start-1 row-span-1 flex flex-row border-b-2 border-black drop-shadow-3xl z-10 top-bar-wrapper   ">
                <div class="my-auto mx-10 basis-3/4">
                    <p class="font-bold text-6xl font-genos">
                        Applications
                    </p>
                </div>
                <div class="basis-1/4 my-auto">
                    <TopControlBar></TopControlBar>
                </div>
            </div>
            <div class="bg-light-blue-custom row-start-2 row-span-7">
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

        @media (max-width: 768px) {
        padding-left: 6rem;
        }
    }
    }
    .top-bar-wrapper {
        height: 116px;
    }

</style>