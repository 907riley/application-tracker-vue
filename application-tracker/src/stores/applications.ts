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

export const useApplicationStore = defineStore('applications', {
    state: () => ({
        applications: <Application[]>[],
        error: <PostgrestError | null>{},
        activeApplication: false,
        sortedBy: <keyof Application>'job_title',
        ascending: true
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
                const valueB = a[this.sortedBy] || 0

                return Number(valueA > valueB) - Number(valueA < valueB)
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
        async addApplication(jobTitle: string, company: string | null, location: string | null, pay: number | null, appliedAt: string | null, response: boolean | null, applicationLink: string | null) {
            const localUserId = storeUser.userId
            const currentHunt = storeHunts.currentHunt

            if (localUserId) {
                const { data, error } = await supabase
                    .from('Applications')
                    .insert([
                        {
                            user_id: localUserId,
                            hunt_id: currentHunt,
                            job_title: jobTitle,
                            company: company,
                            location: location,
                            pay: pay,
                            applied_at: appliedAt,
                            response: response,
                            application_link: applicationLink
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
                        this.error = null
                    }
                }
            }
        },
        async deleteApplication(deleteId: string) {
            const { error } = await supabase
                .from('Applications')
                .delete()
                .eq('id', deleteId)

            if (error) {
                this.error = error
            } else {
                console.log('successfully deleted')
                this.applications = this.applications.filter((app) => { 
                    if (app.id === deleteId) {
                        return false
                    } else {
                        return true
                    }
                })
                this.error = null
            }
        },
        async updateApplication(id: string, jobTitle: string, company: string | null, location: string | null, pay: number | null, appliedAt: string | null, response: boolean | null, applicationLink: string | null) {
            const { data, error } = await supabase
                .from('Applications')
                .update({
                    job_title: jobTitle,
                    company: company,
                    location: location,
                    pay: pay,
                    applied_at: appliedAt,
                    response: response,
                    application_link: applicationLink
                })
                .eq('id', id)
                .select('*')
            
            if (error) {
                this.error = null
                console.log('error in updating application')
            } else {
                console.log('succesfully updated')
                this.applications = this.applications.map((app) => {
                    if (app.id === id) {
                        app.job_title = jobTitle
                        app.company = company
                        app.location = location
                        app.pay = pay
                        app.applied_at = appliedAt
                        app.response = response
                        app.application_link = applicationLink
                    }
                    return app
                })
                this.error = null
            }
        },
        // FIXME: this is jank
        getSingleApplication(searchId: string): Application {
            return this.applications.filter((app) => {
                if (app.id === searchId) {
                    return true
                }
                return false
            })[0]
        }
    }
})