
<script setup lang="ts">
    import Applications from './Applications.vue'
    import TopControlBar from './TopControlBox.vue'
    import SideBar from './SideBar.vue'

    import { ref } from 'vue';

    const addingHunt = ref(false)

    function displayHuntForm() {
        console.log("displaying hunt form")
        addingHunt.value = true
    }
</script>

<template>
    <div class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="hunt-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <span>New Job Hunt</span>
            </div>
            <div class="form-content-wrapper flex flex-col gap-4 m-5">
                <div class="title-form-wrapper gap-4 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="hunt_title" class="place-self-start"> Hunt Title: </label>
                        <div class="flex-1 bg-red-200"></div>
                        <input id="hunt_title" type="text" class="bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="job-goal-wrapper border-b-2 border-black flex justify-center text-2xl font-bold">
                    <span>Job Goals</span>
                </div>
                <div class="information-wrapper gap-4 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_salary" class="place-self-start"> Salary: </label>
                        <div class="flex-1 bg-red-200"></div>
                        <input id="goal_salary" type="text" class="bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_job_type" class="place-self-start"> Job Type: </label>
                        <div class="flex-1 bg-red-200"></div>
                        <input id="goal_job_type" type="text" class="bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_location" class="place-self-start"> Location: </label>
                        <div class="flex-1 bg-red-200"></div>
                        <input id="goal_location" type="text" class="bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_tech_stack" class="place-self-start"> Tech Stack: </label>
                        <div class="flex-1 bg-red-200"></div>
                        <input id="goal_tech_stack" type="text" class="bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_job_title" class="place-self-start"> Job Title: </label>
                        <div class="flex-1 bg-red-200"></div>
                        <input id="goal_job_title" type="text" class="bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="button-wrapper flex border-2 border-black">
                    <button id="done-button" class="flex-1 p-2 font-bold text-3xl">Done</button>
                </div>
            </div>
        </div>
    </div>
    <div id="page-wrapper" class="flex flex-cols h-screen">
        <SideBar></SideBar>
        <main class="">
            <div class="bg-dark-blue-custom flex flex-row border-2 border-black drop-shadow-3xl z-10 top-bar-wrapper">
                <div class="my-auto mx-10 flex-1">
                    <p class="font-bold text-6xl font-genos title">
                        {{$route.name}}
                    </p>
                </div>
                <TopControlBar @add-hunt="displayHuntForm"></TopControlBar>
            </div>
            <div class="content-wrapper">
                <RouterView></RouterView>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">

    #done-button {
        background-color: var(--light-pink);
    }

    .title-wrapper {
        background-color: var(--dark-aquamarine);

    }

    .hunt-form-wrapper {
        box-shadow: 0px 0px 10px black;
    }

    #page-wrapper {
        display: flex; 

        main {
            flex: 1 1 0;

            display: flex;
            flex-direction: column;

            @media (max-width: 768px) {
                padding-left: 6rem;
            }

            .top-bar-wrapper {
                height: 116px;
                background-color: var(--dark-aquamarine);
            }

            .content-wrapper {
                flex: 1 1 0;

                display: flex;
                flex-direction: column;
                background-color: var(--light-aquamarine);
            }
        }
    }

    .title {
        color: white;
    }
</style>