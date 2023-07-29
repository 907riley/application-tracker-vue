
<script setup lang="ts">
    import Applications from './Applications.vue'
    import TopControlBar from './TopControlBox.vue'
    import SideBar from './SideBar.vue'

    import { ref, onMounted } from 'vue';
    import { supabase } from '@/clients/supabase';
    import { useCurrentHuntStore } from '@/stores/currentHunt';
    import { storeToRefs } from 'pinia';

    const addingHunt = ref(false)

    const store = useCurrentHuntStore()
    const { currentHunt } = storeToRefs(store)
    const { setCurrentHunt } = store

    const jobTypes = ref([
        { value: "Internship" },
        { value: "Junior" },
        { value: "Mid" },
        { value: "Senior" }
    ])

    const huntTitle = ref('First Real Job!')
    const goalSalary = ref(60000)
    const goalJobType = ref(jobTypes.value[0].value)
    const goalLocation = ref('Remote')
    const goalTechStack = ref('Vue.js')
    const goalJobTitle = ref('Junior Software Dev')

    const localHunts = ref()

    onMounted(() => {
        getHunts()
    })

    async function getHunts() {
        const localUser = await supabase.auth.getSession()
        const localUserId = localUser.data.session?.user.id
        console.log(localUserId)

        // get the hunts
        if (localUserId) {
            let { data: Hunts, error } = await supabase
                .from('Hunts')
                .select("hunt_title")

            if (error) {
                console.log(error)
            }

            if (Hunts) {
                localHunts.value = Hunts
                setCurrentHunt(Hunts[0].hunt_title)
                console.log(Hunts)
                console.log(localHunts.value)
            }
        }
    }

    function displayHuntForm() {
        console.log("displaying hunt form")
        addingHunt.value = true
    }

    async function submitJobHunt() {
        console.log(huntTitle, goalSalary, goalJobType, goalLocation, goalTechStack, goalJobTitle)

        const localUser = await supabase.auth.getSession()
        const localUserId = localUser.data.session?.user.id
        console.log(localUserId)

        if (localUserId) {
            const { data: Hunts, error } = await supabase
            .from('Hunts')
            .insert([
                {
                    user_id: localUserId,
                    hunt_title: huntTitle.value,
                    goal_salary: goalSalary.value,
                    goal_job_title: goalJobTitle.value,
                    goal_location: goalLocation.value,
                    goal_tech_stack: goalTechStack.value,
                    goal_job_type: goalJobTitle.value
                }
            ])
            .select('hunt_title')
            console.log(`Right after inserting: ${JSON.stringify(Hunts)}`)
            if (error) {
                if (error.code = '23505') {
                    console.log('you\'ve already created a hunt with this title')
                } else {
                    console.log(error)
                }
            } else {
                addingHunt.value = false
                localHunts.value.push(Hunts[0])
                setCurrentHunt(Hunts[0].hunt_title)
            }
        }

    }
</script>

<template>
    <div v-if="addingHunt" class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="hunt-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <span>New Job Hunt</span>
            </div>
            <div class="form-content-wrapper flex flex-col gap-8 m-10">
                <div class="title-form-wrapper gap-6 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="hunt_title" class="place-self-start"> Hunt Title: </label>
                        <div class="flex-1 "></div>
                        <input id="hunt_title" type="text" v-model="huntTitle" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="job-goal-wrapper border-b-2 border-black flex justify-center text-2xl font-bold">
                    <span>Job Goals (optional)</span>
                </div>
                <div class="information-wrapper gap-6 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_salary" class="place-self-start"> Salary: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_salary" type="number" v-model="goalSalary" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_job_type" class="place-self-start"> Job Type: </label>
                        <div class="flex-1 "></div>
                        <!-- <input id="goal_job_type" type="text" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/> -->
                        <select v-model="goalJobType" class="p-1 px-2 bg-zinc-300 border border-black place-self-end">
                            <option v-for="job in jobTypes" :key="job.value" :value="job.value" >{{job.value}}</option>
                        </select>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_location" class="place-self-start"> Location: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_location" type="text" v-model="goalLocation" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_tech_stack" class="place-self-start"> Tech Stack: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_tech_stack" type="text" v-model="goalTechStack" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="goal_job_title" class="place-self-start"> Job Title: </label>
                        <div class="flex-1 "></div>
                        <input id="goal_job_title" type="text" v-model="goalJobTitle" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="button-wrapper flex border-2 border-black">
                    <button @click="submitJobHunt" id="done-button" class="flex-1 p-2 font-bold text-3xl">Done</button>
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
                <TopControlBar @add-hunt="displayHuntForm" :local-hunts="localHunts"></TopControlBar>
            </div>
            <div class="content-wrapper">
                <RouterView ></RouterView>
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