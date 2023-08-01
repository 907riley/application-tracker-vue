import { defineStore } from 'pinia'
import { supabase } from '@/clients/supabase';
import { useStorage } from '@vueuse/core'
import { useUserStore } from './user';
import { type Database } from '@/db_types/supabase';
import { useHuntStore } from './hunts'

const storeUser = useUserStore()
const storeHunts = useHuntStore()

type Application = Database["public"]["Tables"]["Applications"]["Row"]

export const useApplicationStore = defineStore('applications', {
    state: () => ({
        applications: <Application[]>[],
        error: {}
    }),
    getters: {
        
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
                        this.error = {}
                    }
                }
            }
        },
        async submitNewApplication(jobTitle: string, company: string, location: string, pay: number, appliedAt: string, response: boolean, applicationLink: string ) {
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
                        this.error = {}
                    }
                }
            }
        },
    }
})