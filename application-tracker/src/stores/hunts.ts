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
        error: <PostgrestError | null>{},
        addingHunt: false,
        currentHuntForm: <Hunt> {
            created_at: new Date().toISOString(),
            start_date_time: new Date().toISOString(),
            goal_job_title: "Junior Software Dev",
            goal_salary: 60000,
            goal_job_type: "Junior",
            goal_location: "Remote",
            goal_tech_stack: "Vue.js + Supabase",
            hunt_title: "Post Grad Hunt",
            id: -1,
            user_id: userStore.userId
        }
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
      
        async submitJobHunt() {
            // console.log(huntTitle, goalSalary, goalJobType, goalLocation, goalTechStack, goalJobTitle)
      
            const localUserId = userStore.userId
            // console.log(localUserId)
        
            if (localUserId) {
                const { data: Hunts, error } = await supabase
                .from('Hunts')
                .insert([
                    {
                        user_id: localUserId,
                        hunt_title: this.currentHuntForm.hunt_title,
                        goal_salary: this.currentHuntForm.goal_salary,
                        goal_job_title: this.currentHuntForm.goal_job_title,
                        goal_location: this.currentHuntForm.goal_location,
                        goal_tech_stack: this.currentHuntForm.goal_tech_stack,
                        goal_job_type: this.currentHuntForm.goal_job_type
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
                    this.addingHunt = false
                    // TODO: REST HUNT FORM HERE
                }
            }
        }

    },
})
