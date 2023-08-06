import { defineStore } from 'pinia'
import { supabase } from '@/clients/supabase';
import { AuthError } from '@supabase/supabase-js';
import { useStorage } from '@vueuse/core'


export const useUserStore = defineStore('user',  {
    state: () => ({
        email: useStorage('email', ""),
        password: "",
        firstName: useStorage('firstName', ""),
        userId: useStorage('userId', ""),
        sessionId: useStorage('sessionId', ""),
        error: <AuthError | null>{}
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
                console.log(`error in login ${error}`)
                this.error = error
            } else {
                if (data.user.email) { this.email = data.user.email }
                if (data.user.id) { this.userId = data.user.id  }
                this.sessionId = data.session.access_token
                this.error = null
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
            console.log(`createAccount call`)
            console.log(`data: ${data}`)
            console.log(`error: ${error}`)


            if (error) {
                console.log(`error in create account ${error}`)
                this.error = error
            } else {
                this.error = null
                this.password = ''
            }
        }
    },
  })
  