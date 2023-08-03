<script setup lang="ts">
    import { ref, type App, type Ref, onMounted, watchEffect, watch, onUnmounted} from 'vue'
    import { useCurrentHuntStore } from '@/stores/currentHunt';
    import { storeToRefs } from 'pinia';
    import { supabase } from '@/clients/supabase';
    import { useApplicationStore } from '@/stores/applications';
    import { useHuntStore } from '@/stores/hunts';
    import type { Database } from '@/db_types/supabase';
import { stringify } from 'querystring';


    type Application = Database["public"]["Tables"]["Applications"]["Row"]

    const storeCurrentHunt = useCurrentHuntStore()
    const storeApplications = useApplicationStore()
    const storeHunts = useHuntStore()


    const applicationFieldsArray: {displayString: string, databaseString: keyof Application}[]  = [
        {
            displayString: 'Title',
            databaseString: 'job_title',
        
        },
        {
            displayString: 'Company',
            databaseString: 'company',
        
        },
        {
            displayString: 'Location',
            databaseString: 'location',
        
        }, 
        {
            displayString: 'Pay',
            databaseString: 'pay',
        
        }, 
        {
            displayString: 'Date Applied',
            databaseString: 'applied_at',
        
        }, 
        {
            displayString: 'Response',
            databaseString: 'response',
        
        }, 
        {
            displayString: 'Link',
            databaseString: 'application_link',
        
        }
    ]


    const applicationsArray = ref()
    const applicationFields = ref(applicationFieldsArray)

    const searchBar = ref('')
    const addingApplication = ref(false)
    const deletingApplication = ref(false)
    const deletingApplicationId = ref("")


    // TODO: these vars are coupled, make them so
    const updatingApplication = ref(false)
    const updatingApplicationId = ref("")

    const jobTitle = ref<string>('default title')
    const company = ref<string | null>('Netflix')
    const location = ref<string | null>('Remote')
    const pay = ref<number | null>(65000)
    const dateApplied = ref<string | null>(new Date().toISOString().slice(0, 10))
    const response = ref<boolean | null>(false)
    const applicationLink = ref<string | null>('exampleLink.com')

    onMounted(() => {
        getApplications()
    })

    onUnmounted(() => {
        storeApplications.activeApplication = false
    })

    watch(() => storeHunts.currentHunt, async () => {
        console.log("watch effect happening")
        await getApplications()
    })
    

    function addApplication() {
        addingApplication.value = true
        storeApplications.activeApplication = true
    }

    function deleteApplication(id: string) {
        deletingApplication.value = true
        deletingApplicationId.value = id
        storeApplications.activeApplication = true
    }

    // TODO: make form have default values somewhere, probably in the store
    function exitApplicationForm() {
        addingApplication.value = false
        updatingApplication.value = false
        deletingApplication.value = false
        deletingApplicationId.value = ''
        updatingApplicationId.value = ''
        storeApplications.activeApplication = false
    }

    function updateApplication(updateId: string) {
        const currApplication = storeApplications.getSingleApplication(updateId)

        jobTitle.value = currApplication.job_title
        company.value = currApplication.company
        location.value = currApplication.location
        pay.value = currApplication.pay
        dateApplied.value = currApplication.applied_at
        response.value = currApplication.response
        applicationLink.value = currApplication.application_link

        updatingApplication.value = true
        updatingApplicationId.value = updateId
        storeApplications.activeApplication = true
    }

    async function removeApplication(id: string) {
        await storeApplications.deleteApplication(id)

        if (storeApplications.error) {
            console.log('error deleting application')
        } else {
            console.log('successfully removed application')
            deletingApplication.value = false
            applicationsArray.value = storeApplications.applications
            storeApplications.activeApplication = false
        }
    }

    async function submitUpdatedApplication() {
        await storeApplications.updateApplication(
            updatingApplicationId.value,
            jobTitle.value,
            company.value,
            location.value,
            pay.value,
            dateApplied.value,
            response.value,
            applicationLink.value
        )

        if (storeApplications.error) {
            console.log('error updating application')
        } else {
            console.log('successfully updated application')
            updatingApplication.value = false
            updatingApplicationId.value = ''
            applicationsArray.value = storeApplications.applications
            storeApplications.activeApplication = false
        }
    }

    function searchApplication() : Application[] {
        if (storeApplications.applications && storeApplications.applications.length > 0) {
            return storeApplications.sortedApplications.filter((app: Application) => {
                for ( const [key , value] of Object.entries(app)) {
                    // only dealing with string values rn TODO: fix
                    if (typeof value === 'string') {
                        if (value.toLowerCase().includes(searchBar.value.toLowerCase())) {
                            return true
                        }
                    }
                }
                return false
            })
        }
        return []
    }

    async function submitNewApplication() {
        await storeApplications.addApplication(
            jobTitle.value,
            company.value,
            location.value,
            pay.value,
            dateApplied.value,
            response.value,
            applicationLink.value
        )

        if (storeApplications.error) {
            console.log('error submitting application')
        } else {
            console.log('success submitting application')
            addingApplication.value = false
            applicationsArray.value = storeApplications.applications
            storeApplications.activeApplication = false
        }
    }

    async function getApplications() {
        await storeApplications.getApplications()
        if (storeApplications.error) {
            console.log(`error in getting applications ${storeApplications.error.message}`)
        } else {
            console.log('successfully got applications')
            applicationsArray.value = storeApplications.applications
        }
    }

    function changeSortOrder(databaseString: keyof Application) {
        if (storeApplications.sortedBy === databaseString) {
            storeApplications.ascending = !storeApplications.ascending
        } else {
            storeApplications.sortedBy = databaseString
            storeApplications.ascending = true
        }
    }


</script>

<template>
    <div v-if="addingApplication || updatingApplication" class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="application-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <div class="w-24">

                </div>
                <div class="flex-1 text-center">
                    <span v-if="addingApplication">New Application</span>
                    <span v-else="updatingApplication">Update Application</span>
                </div>
                <div class="w-24 items-center text-5xl flex flex-row place-content-end">
                    <button class="w-fit h-fit" @click="exitApplicationForm">
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
                    <button v-if="addingApplication" @click="submitNewApplication" id="done-button" class="flex-1 p-2 font-bold text-3xl">Done</button>
                    <button v-else @click="submitUpdatedApplication" id="done-button" class="flex-1 p-2 font-bold text-3xl">Save</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="deletingApplication" class="backdrop-blur-xl fixed z-50 h-screen w-full flex justify-center items-center">
        <div class="application-form-wrapper flex flex-col bg-white font-genos">
            <div class="title-wrapper text-white font-bold text-5xl flex justify-center p-5 border-b-2 border-black">
                <div class="w-24">

                </div>
                <div class="flex-1 text-center">
                    <span> Are you sure? </span>
                </div>
                <div class="w-24 items-center text-5xl flex flex-row place-content-end">
                    <button class="w-fit h-fit" @click="exitApplicationForm">
                        <span id="exit-button" class="material-symbols-outlined w-fit h-fit">close</span>
                    </button>
                </div>
            </div>
            <div class="form-content-wrapper flex flex-col gap-8 m-10">
                <div class="button-wrapper flex border-2 border-black">
                    <button @click="removeApplication(deletingApplicationId)" id="done-button" class="flex-1 p-2 font-bold text-3xl">Delete</button>
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
                <div v-for="field in applicationFields" class="label-wrapper inline flex flex-row">
                    <div class="w-12">

                    </div>
                    <button class="col-span-1 py-4 flex-1" @click="changeSortOrder(field.databaseString)">{{ field.displayString }}</button>
                    <div class="w-12 flex">
                        <div v-if="storeApplications.sortedBy === field.databaseString" class="flex-1 flex flex-col justify-center">
                            <span v-if="storeApplications.ascending" class="sorted-arrow material-symbols-outlined ">
                                arrow_upward
                            </span>
                            <span v-else="storeApplications.ascending" class="sorted-arrow material-symbols-outlined ">
                                arrow_downward
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="information-wrapper flex flex-col flex-1">
                <div v-for="applications in searchApplication()" :key="applications.id" class="grid grid-cols-8 bg-white font-genos">
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
                            {{ new Date(applications.applied_at || "1970-12-12").getMonth() + 1 }} / {{ new Date(applications.applied_at || "1970-12-12").getDate() }} / {{ new Date(applications.applied_at || "1970-12-12").getFullYear() }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.response }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            <a target="_blank" rel="noopener noreferrer" v-if="applications.application_link?.toLowerCase() === 'wayup'"> WayUp </a>
                            <a target="_blank" rel="noopener noreferrer" v-else-if="applications.application_link?.toLowerCase() === 'linkedin'"> Linkedin </a>
                            <a target="_blank" rel="noopener noreferrer" v-else :href="applications.application_link || ''" class="m-auto">
                                <span class="material-symbols-outlined text-3xl">open_in_browser</span>
                            </a>
                        </div>
                    </div>
                    <div class="col-span-1 p-2 border-r border-b border-black flex"> 
                        <div class="flex-1 text-center flex flex-row text-4xl">
                            <button class="flex-1 hover:text-pink-500">
                                <span class="material-symbols-outlined row-controls">favorite</span>
                            </button>
                            <button class="flex-1 hover:text-blue-500" @click="updateApplication(applications.id)">
                                <span class="material-symbols-outlined row-controls">edit</span>
                            </button>
                            <button class="flex-1 hover:text-red-500" @click="deleteApplication(applications.id)">
                                <span class="material-symbols-outlined row-controls">delete</span>
                            </button>
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

    .row-controls {
        font-size: 2rem;
    }

    #exit-button{
        font-size: 3rem;

        color: var(--light-pink);
        &:hover {
            color: var(--bright-pink);
            font-weight: bold;

        }
    }

    .sorted-arrow {
        color: var(--light-pink);

    } 

    .label-wrapper:hover {

        font-size: 2rem;
        .material-symbols-outlined {
            color: var(--bright-pink);
        }
    }
</style>