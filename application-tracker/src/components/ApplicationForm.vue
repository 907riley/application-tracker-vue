<template>
    <div class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="application-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <div class="w-24">

                </div>
                <div class="flex-1 text-center">
                    <span v-if="storeApplications.addingApplication">New Application</span>
                    <span v-else>Update Application</span>
                </div>
                <div class="w-24 items-center text-5xl flex flex-row place-content-end">
                    <button class="w-fit h-fit" @click="storeApplications.exitApplicationForm">
                        <span id="exit-button" class="material-symbols-outlined w-fit h-fit">close</span>
                    </button>
                </div>
            </div>
            <div class="form-content-wrapper flex flex-col gap-8 m-10">
                <div v-if="storeApplications.error">
                    <span class="text-red-500">{{ storeApplications.error.message }}</span>
                </div>
                <div class="information-wrapper gap-6 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_title" class="place-self-start"> Title: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_title" type="text" v-model="storeApplications.currentApplicationForm.job_title" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_company" class="place-self-start"> Company: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_company" type="text" v-model="storeApplications.currentApplicationForm.company" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_location" class="place-self-start"> Location: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_location" type="text" v-model="storeApplications.currentApplicationForm.location" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_pay" class="place-self-start"> Pay: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_pay" type="number" v-model="storeApplications.currentApplicationForm.pay" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_date_applied" class="place-self-start"> Date Applied: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_date_applied" type="date" v-model="storeApplications.currentApplicationForm.applied_at" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_response" class="place-self-start"> Response: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_response" type="checkbox" v-model="storeApplications.currentApplicationForm.response" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_link" class="place-self-start"> Application Link: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_link" type="text" v-model="storeApplications.currentApplicationForm.application_link" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="button-wrapper flex border-2 border-black">
                    <button v-if="storeApplications.addingApplication" @click="storeApplications.addApplication" id="done-button" class="flex-1 p-2 font-bold text-3xl">Done</button>
                    <button v-else @click="storeApplications.updateApplication" id="done-button" class="flex-1 p-2 font-bold text-3xl">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>




<script setup lang="ts">
    import { useApplicationStore } from '@/stores/applications'
    import { type Database } from '@/db_types/supabase';

    type Application = Database["public"]["Tables"]["Applications"]["Row"]

    const storeApplications = useApplicationStore()

</script>

<style lang="scss">

</style>