import { defineStore } from 'pinia'
import { supabase } from '@/clients/supabase';
import { useStorage } from '@vueuse/core'
import { useUserStore } from './user';
import { type Database } from '@/db_types/supabase';
import { useHuntStore } from './hunts'
import type { App } from 'vue';
import { type PostgrestError } from '@supabase/supabase-js';

const storeUser = useUserStore()
const storeHunts = useHuntStore()

type Application = Database["public"]["Tables"]["Applications"]["Row"]


const defaultApplication: Application = {
    user_id: storeUser.userId,
    id: "",
    hunt_id: -1,
    created_at: null,
    job_title: "Software Developer",
    company: "Computify",
    location: "Remote",
    pay: 65000,
    applied_at: (new Date().toISOString().slice(0, 10)),
    response: false,
    application_link: "https://www.exampleLink.com"
}


export const useApplicationStore = defineStore('applications', {
    state: () => ({
        applications: <Application[]>[],
        error: <PostgrestError | null>{},
        sortedBy: <keyof Application>'job_title',
        ascending: true,
        addingApplication: false,
        updatingApplication: false,
        deletingApplication: false,
        updatingId: "",
        deletingId: "",
        currentApplicationForm: <Application> defaultApplication
    }),
    getters: {
        applicationsDateFormatted(): Application[] {
            return this.applications.map((application) => {
                if (application.applied_at?.slice(0, 10))
                    application.applied_at = application.applied_at?.slice(0, 10)
                return application
            })
        },
        sortedApplications(): Application[] {
            return this.applications.sort((a: Application, b: Application) => {
                const valueA = a[this.sortedBy] || 0
                const valueB = b[this.sortedBy] || 0

                return this.ascending ? (Number(valueA > valueB) - Number(valueA < valueB)) : -(Number(valueA > valueB) - Number(valueA < valueB))
            })
        },
        // },
        // searchApplications(searchBar): Application[] {
        //     return this.applications.filter((app: Application) => {
        //         for ( const [key , value] of Object.entries(app)) {
        //             // only dealing with string values rn TODO: fix
        //             if (typeof value === 'string') {
        //                 if (value.toLowerCase().includes(searchBar.toLowerCase())) {
        //                     return true
        //                 }
        //             }
        //         }
        //         return false
        //     })
        // }
    },
    actions: {
        async getApplications() {
            const localUserId = storeUser.userId

            if (localUserId) {
                const { data: Applications, error } = await supabase
                    .from('Applications')
                    .select('*')
                    .eq('hunt_id', storeHunts.currentHunt)

                if (error) {
                    console.log(`error in applicatoins get store ${error}`)
                    this.error = error
                } else {
                    if (Applications) {
                        this.applications = Applications
                        this.error = null
                    }
                }
            }
        },
        async addApplication() {
            const localUserId = storeUser.userId
            const currentHunt = storeHunts.currentHunt

            if (localUserId) {
                const { data, error } = await supabase
                    .from('Applications')
                    .insert([
                        {
                            user_id: localUserId,
                            hunt_id: currentHunt,
                            job_title: this.currentApplicationForm.job_title,
                            company: this.currentApplicationForm.company,
                            location: this.currentApplicationForm.location,
                            pay: this.currentApplicationForm.pay,
                            applied_at: this.currentApplicationForm.applied_at,
                            response: this.currentApplicationForm.response,
                            application_link: this.currentApplicationForm.application_link
                        }
                    ])
                    .select('*')
                
                if (error) {
                    console.log(`error in submitting new application ${error}`)
                    this.error = error
                } else {
                    console.log(`succesfully submitted new application ${data}`)
                    if (data) {
                        this.applications.push(data[0])
                        this.addingApplication = false
                        // TODO: RESET APPLICATION FORM TO DEFAULT
                        this.error = null
                    }
                }
            }
        },
        async deleteApplication() {
            const { error } = await supabase
                .from('Applications')
                .delete()
                .eq('id', this.deletingId)

            if (error) {
                this.error = error
            } else {
                console.log('successfully deleted')
                this.applications = this.applications.filter((app) => { 
                    if (app.id === this.deletingId) {
                        return false
                    } else {
                        return true
                    }
                })
                this.error = null
                this.deletingApplication = false
                this.deletingId = ""
            }
        },
        async updateApplication() {
            const { data, error } = await supabase
                .from('Applications')
                .update({
                    job_title: this.currentApplicationForm.job_title,
                    company: this.currentApplicationForm.company,
                    location: this.currentApplicationForm.location,
                    pay: this.currentApplicationForm.pay,
                    applied_at: this.currentApplicationForm.applied_at,
                    response: this.currentApplicationForm.response,
                    application_link: this.currentApplicationForm.application_link
                })
                .eq('id', this.updatingId)
                .select('*')
            
            if (error) {
                this.error = null
                console.log('error in updating application')
            } else {
                console.log('succesfully updated')
                this.applications = this.applications.map((app) => {
                    if (app.id === this.updatingId) {
                        app.job_title = this.currentApplicationForm.job_title
                        app.company = this.currentApplicationForm.company
                        app.location = this.currentApplicationForm.location
                        app.pay = this.currentApplicationForm.pay
                        app.applied_at = this.currentApplicationForm.applied_at
                        app.response = this.currentApplicationForm.response
                        app.application_link = this.currentApplicationForm.application_link
                    }
                    return app
                })
                this.error = null
                this.updatingApplication = false
                // TODO: RESET TO DEFAULT APPLICATION
                this.updatingId = ""
            }
        },
        displayUpdatingApplicationForm() {
            this.currentApplicationForm = this.applications.filter((app) => {
                if (app.id === this.updatingId) {
                    return true
                }
                return false
            })[0]
            this.updatingApplication = true
        },
        // FIXME: this is jank
        getSingleApplication(searchId: string): Application {
            return this.applications.filter((app) => {
                if (app.id === searchId) {
                    return true
                }
                return false
            })[0]
        },
        exitApplicationForm() {
            this.addingApplication = false
            this.updatingApplication = false
            this.deletingApplication = false
            this.updatingId = ""
            this.deletingId = ""
            this.currentApplicationForm = defaultApplication
            // TODO: RESET APPLICATION FORM TO DEFAULT
        },
    }
})