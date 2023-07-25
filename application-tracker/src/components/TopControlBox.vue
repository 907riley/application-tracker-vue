<script setup lang="ts">
    import DropDownVue from './DropDown.vue';
    import VerticalPlus from './icons/VerticalPlus.vue'
</script>

<template>
        <div class="flex flex-row mx-10 place-content-between">
            <div id="drop-down-wrapper" class="bg-light-blue-custom border-2 basis-4/5 flex flex-col">
                <DropDownVue></DropDownVue>
            </div>
            <div id="add-hunt-wrapper" class="bg-light-blue-custom border-2 text-6xl place-content-center h-fit p-1">
                <VerticalPlus></VerticalPlus>
            </div>
        </div>
</template>
