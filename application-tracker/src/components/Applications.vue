<script setup lang="ts">
    import { ref, type App, type Ref} from 'vue'

    interface Application {
        title: string;
        company: string;
        location: string;
        pay?: number;
        date_applied: Date;
        response: boolean;
        link: string;
    }

    const applicationFieldsArray  = ['Title', 'Company', 'Location', 'Pay', 'Date Applied', 'Response', 'Link']

    const exampleApplicationsJSON: Application[] = [
        {
            title: "Backend Engineer",
            company: "Spotify",
            location: "Remote",
            link: "https://jobs.lever.co/spotify/7bd1a238-6935-49cb-9464-45503bc87095?lever-source=LinkedInJobs",
            response: false,
            date_applied: new Date(2023, 6, 12),
            pay: 60000,
        },
        {
            title: "UI Engineer (L4) - Data Experience",
            company: "Netflix",
            location: "Remote",
            link: "https://jobs.netflix.com/jobs/276423841",
            response: false,
            date_applied: new Date(2023, 6, 11),
            pay: 85000,
        },
        {
            title: "Real-Time Software Developer",
            company: "Boeing",
            location: "Remote",
            link: "WayUp",
            response: false,
            date_applied: new Date(2023, 6, 14),
            pay: 75000,
        },  
    ]

    const exampleApplications: Ref<Application[]> = ref(exampleApplicationsJSON)
    const applicationFields = ref(applicationFieldsArray)
    const searchBar = ref('')

    function filteredApplications() {
        return exampleApplications.value.filter((app) => {
                for ( const [key , value] of Object.entries(app)) {
                    console.log(value)
                }
            }
        )
    }

</script>

<template>
    <div class="h-fit p-5 flex-1 flex flex-col">
        <div class="search-add-bar-wrapper h-32 flex flex-row">
            <div class="search-bar-wrapper my-auto">
                <input v-model="searchBar" type="text" placeholder="Search" class="search-bar text-4xl border-2 py-2 px-4 border-black rounded-full font-genos font-black"/>
            </div>
            <div class="flex-1"></div>
            <div class="add-application-button-wrapper border-2 border-black w-fit my-auto">
                <button class="add-application-button text-white font-genos text-5xl p-2">Add Application</button>
            </div>
        </div>
        <div class="information-section-wrapper flex-1 flex flex-col">
            <div class="label-bar-wrapper font-genos text-3xl font-bold text-white grid grid-cols-8 border-2 border-top border-black rounded-t-3xl">
                <button v-for="fields in applicationFields" class="col-span-1 py-4">{{ fields }}</button>
            </div>
            <div class="information-wrapper flex flex-col flex-1">
                <div v-for="applications in filteredApplications()" class="grid grid-cols-8 bg-white font-genos">
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.title }}
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
                            {{ applications.date_applied.getMonth() }} / {{ applications.date_applied.getDate() }} / {{ applications.date_applied.getFullYear() }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            {{ applications.response }}
                        </div>
                    </div>
                    <div class="col-span-1 text-2xl p-2 border-r border-b border-black flex"> 
                        <div class="m-auto flex-1 text-center">
                            <a target="_blank" rel="noopener noreferrer" v-if="applications.link.toLowerCase() === 'wayup'"> WayUp </a>
                            <a target="_blank" rel="noopener noreferrer" v-else-if="applications.link.toLowerCase() === 'linkedin'"> Linkedin </a>
                            <a target="_blank" rel="noopener noreferrer" v-else :href=applications.link class="m-auto">
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
    .add-application-button {
        background-color: var(--dark-aquamarine);
    }

    .label-bar-wrapper {
        background-color: var(--dark-aquamarine);
    }

</style>