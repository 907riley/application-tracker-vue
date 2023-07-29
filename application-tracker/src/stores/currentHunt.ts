import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentHuntStore = defineStore('currentHunt', () => {
  const currentHunt = ref('')


  return { currentHunt }
})
