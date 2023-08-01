<script setup lang="ts">
    import { ref, type App, type Ref, onMounted, watchEffect, watch} from 'vue'
    import { useCurrentHuntStore } from '@/stores/currentHunt';
    import { storeToRefs } from 'pinia';
    import { supabase } from '@/clients/supabase';
    import { useApplicationStore } from '@/stores/applications';
    import { useHuntStore } from '@/stores/hunts';


    const storeCurrentHunt = useCurrentHuntStore()
    const storeApplications = useApplicationStore()
    const storeHunts = useHuntStore()
    // const { currentHunt } = storeToRefs(store)

    // interface Application {
    //     title: string;
    //     company: string;
    //     location: string;
    //     pay?: number;
    //     date_applied: Date;
    //     response: boolean;
    //     link: string;
    // }

    const applicationFieldsArray  = ['Title', 'Company', 'Location', 'Pay', 'Date Applied', 'Response', 'Link']

    // const exampleApplicationsJSON: Application[] = [
    //     {
    //         title: "Backend Engineer",
    //         company: "Spotify",
    //         location: "Remote",
    //         link: "https://jobs.lever.co/spotify/7bd1a238-6935-49cb-9464-45503bc87095?lever-source=LinkedInJobs",
    //         response: false,
    //         date_applied: new Date(2023, 6, 12),
    //         pay: 60000,
    //     },
    //     {
    //         title: "UI Engineer (L4) - Data Experience",
    //         company: "Netflix",
    //         location: "Remote",
    //         link: "https://jobs.netflix.com/jobs/276423841",
    //         response: false,
    //         date_applied: new Date(2023, 6, 11),
    //         pay: 85000,
    //     },
    //     {
    //         title: "Real-Time Software Developer",
    //         company: "Boeing",
    //         location: "Remote",
    //         link: "WayUp",
    //         response: false,
    //         date_applied: new Date(2023, 6, 14),
    //         pay: 75000,
    //     },  
    // ]

    // const exampleApplications: Ref<Application[]> = ref(exampleApplicationsJSON)
    const applicationsArray = ref()
    const applicationFields = ref(applicationFieldsArray)
    const searchBar = ref('')
    const addingApplication = ref(false)

    // const props = defineProps(['currentHunt'])

    // function filteredApplications() {
    //     return applications.value.filter(filterAppsHelper)
    // }

    // FIXME: anyu type
    // function filterAppsHelper(app: any) : boolean {
    //     for ( const [key , value] of Object.entries(app)) {
    //         //only dealing with string values rn TODO: fix
    //         if (typeof value === 'string') {
    //             if (value.toLowerCase().includes(searchBar.value.toLowerCase())) {
    //                 return true
    //             }
    //         }
    //     }
    //     return false
    // }

    const jobTitle = ref('default title')
    const company = ref('Netflix')
    const location = ref('Remote')
    const pay = ref(65000)
    const dateApplied = ref(new Date().toISOString().slice(0, 10))
    const response = ref(false)
    const applicationLink = ref('exampleLink.com')

    onMounted(() => {
        getApplications()
    })

    watch(() => storeHunts.currentHunt, async () => {
        console.log("watch effect happening")
        await getApplications()
    })
    

    function addApplication() {
        addingApplication.value = true
    }


    // async function submitNewApplication() {
    //     console.log("done with new app")

    //     const localUser = await supabase.auth.getSession()
    //     const localUserId = localUser.data.session?.user.id
    //     console.log(localUserId)

    //     if (localUserId) {
    //         const { data, error } = await supabase
    //         .from('Applications')
    //         .insert([
    //             {
    //                 user_id: localUserId,
    //                 hunt_id: storeHunt.currentHunt,
    //                 job_title: addApplicationTitle.value,
    //                 company: addApplicationCompany.value,
    //                 location: addApplicationLocation.value,
    //                 pay: addApplicationPay.value,
    //                 applied_at: addApplicationDateApplied.value,
    //                 response: addApplicationResponse.value,
    //                 application_link: addApplicationLink.value
    //             }
    //         ])

    //         if (error) {
    //             console.log(error)
    //         } else {
    //             console.log("successfull added app")
    //             addingApplication.value = false
    //             applicationsArray.value = storeApplications.applications
    //         }
    //     }

    // }

    async function submitNewApplication() {
        await storeApplications.submitNewApplication(
            jobTitle.value,
            company.value,
            location.value,
            pay.value,
            dateApplied.value,
            response.value,
            applicationLink.value
        )

        if (Object.keys(storeApplications.error).length !== 0) {
            console.log('error submitting application')
        } else {
            console.log('success submitting application')
            addingApplication.value = false
            applicationsArray.value = storeApplications.applications
        }
    }



    // async function getApplications() {
    //     const localUser = await supabase.auth.getSession()
    //     const localUserId = localUser.data.session?.user.id
    //     console.log(currentHunt.value)

    //     // get the applications
    //     if (localUserId) {
    //         let { data: Application, error } = await supabase
    //             .from('Applications')
    //             .select("*")
    //             .eq('hunt_title', currentHunt.value)

    //         if (error) {
    //             console.log(error)
    //         }

    //         if (Application) {
    //             applicationsArray.value = Application
    //             console.log(applicationsArray.value)
    //         }
    //     }
    // }

    async function getApplications() {
        await storeApplications.getApplications()
        if (Object.keys(storeApplications.error).length !== 0) {
            console.log(`error in getting applications ${JSON.stringify(storeApplications.error)}`)
        } else {
            console.log('successfully got applications')
            applicationsArray.value = storeApplications.applications
        }
    }



</script>

<template>
    <div v-if="addingApplication" class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="application-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <span>New Application</span>
            </div>
            <div class="form-content-wrapper flex flex-col gap-8 m-10">
                <div class="information-wrapper gap-6 flex flex-col text-3xl">
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_title" class="place-self-start"> Title: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_title" type="text" v-model="jobTitle" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_company" class="place-self-start"> Company: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_company" type="text" v-model="company" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_location" class="place-self-start"> Location: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_location" type="text" v-model="location" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_pay" class="place-self-start"> Pay: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_pay" type="number" v-model="pay" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_date_applied" class="place-self-start"> Date Applied: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_date_applied" type="date" v-model="dateApplied" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_response" class="place-self-start"> Response: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_response" type="checkbox" v-model="response" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                    <div class="flex flex-row bg-white gap-4">
                        <label for="add_application_link" class="place-self-start"> Application Link: </label>
                        <div class="flex-1 "></div>
                        <input id="add_application_link" type="text" v-model="applicationLink" class="p-1 px-2 bg-zinc-300 border border-black place-self-end"/>
                    </div>
                </div>
                <div class="button-wrapper flex border-2 border-black">
                    <button @click="submitNewApplication" id="done-button" class="flex-1 p-2 font-bold text-3xl">Done</button>
                </div>
            </div>
        </div>
    </div>
    <div class="h-fit p-5 flex-1 flex flex-col">
        <div class="search-add-bar-wrapper h-32 flex flex-row">
            <div class="search-bar-wrapper my-auto">
                <input v-model="searchBar" type="text" placeholder="Search" class="search-bar text-4xl border-2 py-2 px-4 border-black rounded-full font-genos font-black"/>
            </div>
            <div class="flex-1"></div>
            <div class="add-application-button-wrapper border-2 border-black w-fit my-auto">
                <button @click="addApplication" class="add-application-button text-white font-genos text-5xl p-2">Add Application</button>
            </div>
        </div>
        <div class="information-section-wrapper flex-1 flex flex-col">
            <div class="label-bar-wrapper font-genos text-3xl font-bold text-white grid grid-cols-8 border-2 border-top border-black rounded-t-3xl">
                <button v-for="fields in applicationFields" class="col-span-1 py-4">{{ fields }}</button>
            </div>
            <div class="information-wrapper flex flex-col flex-1">
                <div v-for="applications in applicationsArray" class="grid grid-cols-8 bg-white font-genos">
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.job_title }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.company }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.location }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.pay }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ new Date(applications.date_applied).getMonth() }} / {{ new Date(applications.date_applied).getDate() }} / {{ new Date(applications.date_applied).getFullYear() }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.response }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            <a target="_blank" rel="noopener noreferrer" v-if="applications.application_link.toLowerCase() === 'wayup'"> WayUp </a>
                            <a target="_blank" rel="noopener noreferrer" v-else-if="applications.application_link.toLowerCase() === 'linkedin'"> Linkedin </a>
                            <a target="_blank" rel="noopener noreferrer" v-else :href=applications.application_link class="m-auto">
                                <span class="material-symbols-outlined text-3xl">open_in_browser</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    #done-button {
        background-color: var(--light-pink);
    }

    .title-wrapper {
        background-color: var(--dark-aquamarine);

    }

    .application-form-wrapper {
        box-shadow: 0px 0px 10px black;
    }


    .add-application-button {
        background-color: var(--dark-aquamarine);
    }

    .label-bar-wrapper {
        background-color: var(--dark-aquamarine);
    }

</style>