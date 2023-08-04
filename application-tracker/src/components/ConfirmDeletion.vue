<template>
    <div class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="application-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <div class="w-24">

                </div>
                <div class="flex-1 text-center">
                    <span> Are you sure? </span>
                </div>
                <div class="w-24 items-center text-5xl flex flex-row place-content-end">
                    <button class="w-fit h-fit" @click="storeApplications.exitApplicationForm">
                        <span id="exit-button" class="material-symbols-outlined w-fit h-fit">close</span>
                    </button>
                </div>
            </div>
            <div class="form-content-wrapper flex flex-col gap-8 m-10">
                <div class="button-wrapper flex border-2 border-black">
                    <button @click="storeApplications.deleteApplication" id="done-button" class="flex-1 p-2 font-bold text-3xl">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useApplicationStore } from '../stores/applications'

    const storeApplications = useApplicationStore()

</script>

<style lang="scss">

</style>