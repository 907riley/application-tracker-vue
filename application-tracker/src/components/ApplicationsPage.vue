<script setup lang="ts">
    import { ref, onMounted, watch, onUnmounted} from 'vue'
    import { useApplicationStore } from '@/stores/applications';
    import { useHuntStore } from '@/stores/hunts';
    import type { Database } from '@/db_types/supabase';


    type Application = Database["public"]["Tables"]["Applications"]["Row"]

    const storeApplications = useApplicationStore()
    const storeHunts = useHuntStore()


    const applicationFieldsArray: {displayString: string, databaseString: keyof Application, id: number}[]  = [
        {
            displayString: 'Title',
            databaseString: 'job_title',
            id: 0
        },
        {
            displayString: 'Company',
            databaseString: 'company',
            id: 1
        },
        {
            displayString: 'Location',
            databaseString: 'location',
            id: 2
        }, 
        {
            displayString: 'Salary',
            databaseString: 'pay',
            id: 3
        }, 
        {
            displayString: 'Date Applied',
            databaseString: 'applied_at',
            id: 4
        }, 
        {
            displayString: 'Status',
            databaseString: 'status',
            id: 5
        }, 
        {
            displayString: 'Link',
            databaseString: 'application_link',
            id: 6
        }
    ]


    const applicationsArray = ref()
    const applicationFields = ref(applicationFieldsArray)

    const searchBar = ref('')

    onMounted(() => {
        getApplications()
        hideScrollbar()
    })

    onUnmounted(() => {
        // TODO: Investigate if this is necessary now that forms are on the main page
        storeApplications.addingApplication = false
    })

    watch(() => storeHunts.currentHunt, async () => {
        console.log("watch effect happening")
        await getApplications()
    })
    

    function searchApplication() : Application[] {
        if (storeApplications.applications && storeApplications.applications.length > 0) {
            return storeApplications.sortedApplications.filter((app: Application) => {
                for ( const [, value] of Object.entries(app)) {
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


    function parseMoney(pay: number | null) {
        // should be decimal safe
        if (!pay) {
            return "$0"
        }
        const moneyString = String(pay).split('.')[0]

        if (moneyString.length <= 3) {
            return '$' + moneyString
        } else {
            let stringIndex = moneyString.length % 3
            let newMoneyString = moneyString.slice(0, stringIndex)

            if (stringIndex == 0) {
                newMoneyString +=  moneyString.slice(stringIndex, stringIndex + 3)
                stringIndex += 3
            }

            while (stringIndex < moneyString.length) {
                newMoneyString += ',' + moneyString.slice(stringIndex, stringIndex + 3)
                stringIndex += 3
            }
            return '$' + newMoneyString
        }
    }

    function hideScrollbar() {
        let parentWrapper = document.getElementById('labels-parent')
        let labelWrapper = document.getElementById('labels')
        let scrollSpaceDiv = document.getElementById('scroll-space')

        if (parentWrapper && labelWrapper && scrollSpaceDiv) {
            // get the scrollbar width
            let scrollWidth = parentWrapper.clientWidth - labelWrapper.clientWidth
        
            // get rid of the overflow
            labelWrapper.style.overflow = "hidden"
        
            scrollSpaceDiv.style.width = String(scrollWidth + "px")
            // add width to the last child
            console.log(`scroll width: ${scrollWidth} ${scrollSpaceDiv}`)
        }
            
    }

</script>

<template>
    <div class="full-application-wrapper p-5 flex-1 flex flex-col">
        <div class="search-add-bar-wrapper h-24 flex flex-row">
            <div class="search-bar-wrapper my-auto">
                <input v-model="searchBar" type="text" placeholder="Search" class="search-bar text-4xl border-2 py-2 px-4 border-black rounded-full font-genos font-black"/>
            </div>
            <div class="flex-1"></div>
            <div class="add-application-button-wrapper border-2 border-black w-fit my-auto">
                <button @click="() => {storeApplications.addingApplication = true}" class="add-application-button text-white font-genos text-5xl p-2">Add Application</button>
            </div>
        </div>
        <div id="labels-parent" class="information-section-wrapper flex-fit flex flex-col">
            <div id="scroll-bar-pain" class="flex flex-row rounded-t-3xl">
                <div id="labels" class="flex-1 label-bar-wrapper font-genos text-3xl font-bold text-white grid grid-cols-8  overflow-y-scroll">
                    <div v-for="field in applicationFields" :key="field.id" class="label-wrapper inline flex flex-row">
                        <button class="col-span-1 flex flex-row flex-1 items-center" @click="changeSortOrder(field.databaseString)">
                            <div class="w-12">
        
                            </div>
                            <div class="py-4 flex-1">
                                {{ field.displayString }}
                            </div>
                            <div class="w-12 flex">
                                <div v-if="storeApplications.sortedBy === field.databaseString" class="flex-1 flex flex-col justify-center">
                                    <span v-if="storeApplications.ascending" class="sorted-arrow material-symbols-outlined ">
                                        arrow_upward
                                    </span>
                                    <span v-else class="sorted-arrow material-symbols-outlined ">
                                        arrow_downward
                                    </span>
                                </div>
                            </div>
                        </button>   
                    </div>
                </div>
                <div id="scroll-space" class="">
                </div>
            </div>
            <div class="information-wrapper flex flex-col flex-initial max-h-full overflow-y-scroll">
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
                            {{ parseMoney(applications.pay) }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.applied_at?.slice(5, 7) }} / {{ applications.applied_at?.slice(8, 10) }} / {{ applications.applied_at?.slice(0, 4) }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.status }}
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
                            <button class="flex-1 hover:text-blue-500" @click="() => { storeApplications.updatingId = applications.id, storeApplications.displayUpdatingApplicationForm() }">
                                <span class="material-symbols-outlined row-controls">edit</span>
                            </button>
                            <button class="flex-1 hover:text-red-500" @click="() => { storeApplications.deletingId = applications.id, storeApplications.deletingApplication = true }">
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

    .full-application-wrapper,
    .information-section-wrapper {
        flex: 1;
        min-height: 0;
    }

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


    #scroll-bar-pain {
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

    #scroll-bar-pain {
        border-top: white 1px solid;
    }
    
    .label-wrapper {
        border-right: white 1px solid;
    }

    .label-wrapper:hover {

        color: var(--bright-pink);
        .material-symbols-outlined {
            color: var(--bright-pink);
        }
    }
</style>