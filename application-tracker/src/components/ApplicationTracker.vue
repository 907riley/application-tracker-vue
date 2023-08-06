
<script setup lang="ts">
    import TopControlBar from './TopControlBox.vue'
    import SideBar from './SideBar.vue'
    import ApplicationForm from './ApplicationForm.vue'
    import ConfirmDeletion from './ConfirmDeletion.vue'
    import HuntForm from './HuntForm.vue'

    import { onMounted } from 'vue';
    import { useHuntStore } from '@/stores/hunts';
    import { useApplicationStore } from '@/stores/applications';

    // const addingHunt = ref(false)

    const storeHunts = useHuntStore()
    const storeApplications = useApplicationStore()


    onMounted(() => {
        storeHunts.getHunts()
    })

    // function displayHuntForm() {
    //     addingHunt.value = true
    // }

    // TODO: make form have default values somewhere, probably in the store
    // function exitHuntForm() {
    //     addingHunt.value = false
    // }

    // async function submitJobHunt() {
    //     console.log(huntTitle, goalSalary, goalJobType, goalLocation, goalTechStack, goalJobTitle)

    //     const localUser = await supabase.auth.getSession()
    //     const localUserId = localUser.data.session?.user.id
    //     console.log(localUserId)

    //     if (localUserId) {
    //         const { data: Hunts, error } = await supabase
    //         .from('Hunts')
    //         .insert([
    //             {
    //                 user_id: localUserId,
    //                 hunt_title: huntTitle.value,
    //                 goal_salary: goalSalary.value,
    //                 goal_job_title: goalJobTitle.value,
    //                 goal_location: goalLocation.value,
    //                 goal_tech_stack: goalTechStack.value,
    //                 goal_job_type: goalJobTitle.value
    //             }
    //         ])
    //         .select('hunt_title')
    //         console.log(`Right after inserting: ${JSON.stringify(Hunts)}`)
    //         if (error) {
    //             if (error.code = '23505') {
    //                 console.log('you\'ve already created a hunt with this title')
    //             } else {
    //                 console.log(error)
    //             }
    //         } else {
    //             addingHunt.value = false
    //             localHunts.value.push(Hunts[0])
    //         }
    //     }

    // }
</script>

<template>

    <HuntForm v-if="storeHunts.addingHunt"></HuntForm>
    <ApplicationForm v-if="storeApplications.addingApplication || storeApplications.updatingApplication"></ApplicationForm>
    <ConfirmDeletion v-if="storeApplications.deletingApplication"></ConfirmDeletion>
    
    <div id="page-wrapper" class="flex flex-cols h-screen">
        <SideBar></SideBar>
        <main class="">
            <div class="bg-dark-blue-custom flex flex-row border-2 border-black drop-shadow-3xl z-10 top-bar-wrapper">
                <div class="my-auto mx-10 flex-1">
                    <p class="font-bold text-6xl font-genos title">
                        {{$route.name}}
                    </p>
                </div>
                <TopControlBar @add-hunt="() => { storeHunts.addingHunt = true }"></TopControlBar>
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
            height: 100vh;

            @media (max-width: 768px) {
                padding-left: 6rem;
            }

            .top-bar-wrapper {
                height: 116px;
                background-color: var(--dark-aquamarine);
            }

            .content-wrapper {
                flex: 1;
                min-height: 0;
                display: flex;
                flex-direction: column;
                background-color: var(--light-aquamarine);
            }
        }
    }

    .title {
        color: white;
    }

    #exit-button{
        font-size: 3rem;

        color: var(--light-pink);
        &:hover {
            color: var(--bright-pink);
            font-weight: bold;

        }
    }
</style>