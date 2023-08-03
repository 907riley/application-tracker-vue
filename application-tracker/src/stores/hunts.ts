import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/clients/supabase';
import { useUserStore } from './user';
import { type Database } from '@/db_types/supabase';
import { useStorage } from '@vueuse/core'
import { type PostgrestError } from '@supabase/supabase-js';

const userStore = useUserStore()

type Hunt = Database["public"]["Tables"]["Hunts"]["Row"]


export const useHuntStore = defineStore('hunts', {
    state: () => ({
        hunts: <Hunt[]>[],
        currentHunt: useStorage('currentHunt', -1),
        error: <PostgrestError | null>{}
    }),
    getters: {

    },
    actions: {
        setHunts(newHunts: Hunt[]) {
          this.hunts = newHunts
        },
      
        setCurrentHunt(newHunt: number) {
          this.currentHunt = newHunt
        },
      
        async getHunts() {
          const localUserId = userStore.userId
          console.log(localUserId)
      
            // get the hunts
            if (localUserId) {
                let { data: Hunts, error } = await supabase
                    .from('Hunts')
                    .select("*")
                    .eq('user_id', localUserId)
      
                if (error) {
                    console.log(error)
                    this.error = error
                } else {
                    if (Hunts) { 
                        this.hunts = Hunts
                        // if the current hunt hasn't already been set for this session
                        if (this.currentHunt === -1) {
                            this.currentHunt = Hunts[0].id 
                        }
                    }
                    this.error = null
                }
            } 
        },
      
        async submitJobHunt(huntTitle: string, goalSalary: number, goalJobType: string, goalLocation: string, goalTechStack: string, goalJobTitle: string) {
            // console.log(huntTitle, goalSalary, goalJobType, goalLocation, goalTechStack, goalJobTitle)
      
            const localUserId = userStore.userId
            // console.log(localUserId)
        
            if (localUserId) {
                const { data: Hunts, error } = await supabase
                .from('Hunts')
                .insert([
                    {
                        user_id: localUserId,
                        hunt_title: huntTitle,
                        goal_salary: goalSalary,
                        goal_job_title: goalJobTitle,
                        goal_location: goalLocation,
                        goal_tech_stack: goalTechStack,
                        goal_job_type: goalJobTitle
                    }
                ])
                .select('*')
                // console.log(`Right after inserting: ${JSON.stringify(Hunts)}`)
                if (error) {
                    this.error = error
                } else {
                    // addingHunt.value = false
                    if (Hunts) { 
                        this.hunts.push(Hunts[0])
                        this.currentHunt = Hunts[0].id    
                    }
                    this.error = null
                }
            }
        }

    },
})
