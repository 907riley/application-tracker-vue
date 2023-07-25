<script setup lang="ts">
    import DropDownVue from './DropDown.vue';
    import VerticalPlus from './icons/VerticalPlus.vue'
</script>

<template>
        <div class="flex flex-row mx-10 place-content-between">
            <div id="drop-down-wrapper" class="border-2 basis-4/5 flex flex-col dropdown-wrapper">
                <DropDownVue></DropDownVue>
            </div>
            <div id="add-hunt-wrapper" class="border-2 text-6xl place-content-center h-fit p-1 vertical-plus-wrapper">
                <VerticalPlus></VerticalPlus>
            </div>
        </div>
</template>

<style lang="scss">
    .vertical-plus-wrapper {
        background-color: var(--light-aquamarine);
    }
</style>
