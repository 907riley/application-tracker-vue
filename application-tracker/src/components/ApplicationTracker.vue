
<script setup lang="ts">
    import Applications from './Applications.vue'
    import HorizontalBar from './icons/HorizontalBar.vue'
    import TopControlBar from './TopControlBox.vue'
</script>

<template>
    <div class="grid grid-cols-layout-col h-screen">
        <div class="bg-dark-blue-custom col-start-1 col-span-1 border-r-2 border-black z-20">
            <div class="mx-auto w-fit mt-10 grid grid-rows-3 gap-3">
                <HorizontalBar></HorizontalBar>
                <HorizontalBar></HorizontalBar>
                <HorizontalBar></HorizontalBar>
            </div>
        </div>
        <div class="grid grid-rows-layout-row col-start-2 col-span-11">
            <div class="bg-dark-blue-custom row-start-1 row-span-1 flex flex-row border-b-2 border-black drop-shadow-3xl z-10">
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
                <Applications></Applications>
            </div>
        </div>
    </div>
</template>