import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/clients/supabase';
import { useUserStore } from './user';

const userStore = useUserStore()


export const useHuntStore = defineStore('hunt', () => {
  const hunts = ref()
  const currentHunt = ref('')

  // FIXME: need proper typing here
  function setHunts(newHunts: any) {
    hunts.value = newHunts
  }

  function setCurrentHunt(newHunt: string) {
    currentHunt.value = newHunt
  }

  async function getHunts() {
    const localUserId = userStore.localUser.data.session?.user.id
    console.log(localUserId)

    // get the hunts
    if (localUserId) {
        let { data: Hunts, error } = await supabase
            .from('Hunts')
            .select("hunt_title")

        if (error) {
            console.log(error)
        }

        if (Hunts) {
            hunts.value = Hunts
        }
    } 
  }

  async function submitJobHunt(huntTitle: string, goalSalary: number, goalJobType: string, goalLocation: string, goalTechStack: string, goalJobTitle: string) {
    console.log(huntTitle, goalSalary, goalJobType, goalLocation, goalTechStack, goalJobTitle)

    const localUserId = userStore.localUser.data.session?.user.id
    console.log(localUserId)

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
        .select('hunt_title')
        console.log(`Right after inserting: ${JSON.stringify(Hunts)}`)
        if (error) {
            if (error.code = '23505') {
                console.log('you\'ve already created a hunt with this title')
            } else {
                console.log(error)
            }
        } else {
            addingHunt.value = false
            localHunts.value.push(Hunts[0])
            setCurrentHunt(Hunts[0].hunt_title)
        }
    }

}

  return { hunts, currentHunt, setCurrentHunt, setHunts, submitJobHunt }
})
