import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/clients/supabase';
import router from '@/router';
import { AuthError } from '@supabase/supabase-js';
import { useStorage } from '@vueuse/core'


export const useUserStore = defineStore('user',  {
    state: () => ({
        email: useStorage('email', ""),
        password: "",
        firstName: useStorage('firstName', ""),
        userId: useStorage('userId', ""),
        sessionId: useStorage('sessionId', ""),
        error: {}
    }),
    getters: {

    },
    actions: {
        
        async login() {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: this.email,
                password: this.password
            })

            if (error) {
                this.error = error
            } else {
                if (data.user.email) { this.email = data.user.email }
                if (data.user.id) { this.userId = data.user.id  }
                this.sessionId = data.session.access_token
                this.error = {}
                this.password = ''
            }
        },

        async createAccount() {
            const { data, error } = await supabase.auth.signUp({
                email: this.email,
                password: this.password,
                options: {
                    data: {
                        first_name: this.firstName
                    }
                }
            })

            if (error) {
                this.error = error
            } else {
                this.error = {}
                this.password = ''
            }
        }
    },
  })
  