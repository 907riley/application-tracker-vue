
<script setup lang="ts">
    import Applications from './Applications.vue'
</script>

<template>
    <div class="grid grid-cols-layout-col h-screen">
        <div class="bg-dark-blue-custom col-start-1 col-span-1 border-r-2 border-black">
            Side panel
        </div>
        <div class="grid grid-rows-layout-row col-start-2 col-span-11">
            <div class="bg-dark-blue-custom row-start-1 row-span-1 flex flex-row border-b-2 border-black">
                <div class="font-bold">
                    Applications
                </div>
                <div class="border-2 border-solid border-black h-fit">
                    Drop down
                </div>
            </div>
            <div class="bg-light-blue-custom row-start-2 row-span-7">
                <Applications></Applications>
            </div>
        </div>
    </div>
</template>