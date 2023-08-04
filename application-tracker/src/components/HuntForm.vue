<template>
    <div class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="hunt-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <div class="w-24">

                </div>
                <span>New Job Hunt</span>
                <div class="w-24 items-center text-5xl flex flex-row place-content-end">
                    <button class="w-fit h-fit" @click="() => { storeHunts.addingHunt = false }">
                        <span id="exit-button" class="material-symbols-outlined w-fit h-fit">close</span>
                    </button>
                </div>
            </div>
            <div class="form-content-wrapper flex flex-col gap-8 m-10">
                <div v-if="storeHunts.error">
                    <span class="text-red-500"> {{ storeHunts.error }} </span>
                </div>
                <div class="title-form-wrapper gap-6 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="hunt_title" class="place-self-start"> Hunt Title: </label>
                        <div class="flex-1 "></div>
                        <input id="hunt_title" type="text" v-model="storeHunts.currentHuntForm.hunt_title" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="job-goal-wrapper border-b-2 border-black flex justify-center text-2xl font-bold">
                    <span>Job Goals (optional)</span>
                </div>
                <div class="information-wrapper gap-6 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_salary" class="place-self-start"> Salary: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_salary" type="number" v-model="storeHunts.currentHuntForm.goal_salary" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_job_type" class="place-self-start"> Job Type: </label>
                        <div class="flex-1 "></div>
                        <!-- <input id="goal_job_type" type="text" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/> -->
                        <select v-model="storeHunts.currentHuntForm.goal_job_type" class="p-1 px-2 bg-zinc-300 border border-black place-self-end">
                            <option v-for="job in jobTypes" :key="job.value" :value="job.value" >{{job.value}}</option>
                        </select>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_location" class="place-self-start"> Location: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_location" type="text" v-model="storeHunts.currentHuntForm.goal_location" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_tech_stack" class="place-self-start"> Tech Stack: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_tech_stack" type="text" v-model="storeHunts.currentHuntForm.goal_tech_stack" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_job_title" class="place-self-start"> Job Title: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_job_title" type="text" v-model="storeHunts.currentHuntForm.goal_job_title" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="button-wrapper flex border-2 border-black">
                    <button @click="storeHunts.submitJobHunt" id="done-button" class="flex-1 p-2 font-bold text-3xl">Done</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useHuntStore } from '@/stores/hunts';
    import { ref } from 'vue';

    const storeHunts = useHuntStore()

    const jobTypes = ref([
        { value: "Internship" },
        { value: "Junior" },
        { value: "Mid" },
        { value: "Senior" }
    ])

</script>

<style lang="scss">

</style>