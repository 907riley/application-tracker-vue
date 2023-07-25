<script setup lang="ts">
    import DropDownVue from './DropDown.vue';
</script>

<template>
        <div class="my-auto flex flex-row place-content-between gap-4 mr-4 top-control-wrapper">
            <div class="border-2 dropdown-wrapper flex">
                <DropDownVue></DropDownVue>
            </div>
            <div class="vertical-plus-wrapper">
                <span class="material-symbols-outlined">add</span>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .top-control-wrapper {
        display: flex;
        flex-direction: row;

        & > * {
            border: 2px solid black;
        }
    }

    .vertical-plus-wrapper {
        background-color: var(--light-aquamarine);
        display: flex;
    }

    .material-symbols-outlined {
        font-size: 3rem;
        flex: 1 1 0;
    }

</style>
