
<script setup lang="ts">
    import Applications from './Applications.vue'
</script>

<template>
    <div class="grid grid-cols-12 h-screen">
        <div class="bg-dark-blue-custom col-start-1 col-span-1">
            Side panel
        </div>
        <div class="flex flex-col col-start-2 col-span-11">
            <div class="bg-dark-blue-custom flex flex-row h-36">
                <div class="font-bold">
                    Applications
                </div>
                <div class="border-2 border-solid border-black h-fit">
                    Drop down
                </div>
            </div>
            <div class="bg-light-blue-custom h-min">
                <Applications></Applications>
            </div>
        </div>
    </div>
</template>