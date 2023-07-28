<template>
    <div class="login-page-wrapper h-screen flex flex-col">
        <div class="top-bar-wrapper flex">
            <span class="font-genos font-bold text-5xl text-white flex-1 text-center my-auto">Job Application Tracker</span>
        </div>
        <div class="content-wrapper flex-1 flex justify-center items-center">
            <div class="login-box-wrapper bg-white w-fit h-fit p-5">
                <div class="login-content mx-16 w-96 font-genos font-bold flex flex-col gap-2">
                    <div class="login-text-wrapper font-bold font-genos mb-5">
                        <h3 v-if="signingUp" class="text-6xl">Sign Up</h3>
                        <h3 v-else class="text-6xl">Login</h3>
                        <span>All your job hunts in one place</span>
                    </div>
                    <div v-if="signingUp" class="first-name-wrapper flex flex-col gap-1">
                            <label class="text-2xl" for="firstName">First Name (optional):</label>
                            <input id="firstName" type='text' v-model="firstName" class="bg-zinc-300 text-2xl p-1 px-2 border-black border"/>
                        </div>
                    <div class="text-box-wrapper flex flex-col gap-4 mb-4">
                        <div class="email-wrapper flex flex-col gap-1">
                            <label class="text-2xl" for="email">Email</label>
                            <input id="email" type='email' v-model="email" class="bg-zinc-300 text-2xl p-1 px-2 font-normal border-black border"/>
                        </div>
                        <div class="password-wrapper flex flex-col gap-1">
                            <label class="text-2xl" for="password">Password</label>
                            <input id="password" type='password' v-model="password" class="bg-zinc-300 text-2xl p-1 px-2 border-black border"/>
                            <span v-if="!signingUp" class="forgot-password">
                                Forgot Password?
                            </span>
                        </div>
                        <div v-if="signingUp" class="confirm-password-wrapper flex flex-col gap-1">
                            <label class="text-2xl" for="password">Confirm Password</label>
                            <input id="confirmPassword" type='password' v-model="confirmPassword" class="bg-zinc-300 text-2xl p-1 px-2 border-black border"/>
                        </div>
                        <div class="remember-wrapper flex items-center flex-row gap-3">
                            <label class="checkmark-container  flex flex-row items-center" for="check">
                                <input type="checkbox" class="checkbox-input p-4 bg-zinc-300 border border-black" id="check" v-model="rememberMe"/>
                                <span class="material-symbols-outlined bg-transparent invisible text-2xl absolute ">favorite</span>
                            </label>
                            <span class="h-fit">Remember Me</span>
                        </div>
                    </div>
                    <div v-if="signingUp" class="login-button-wrapper flex border border-black border-solid rounded-3xl">
                        <button @click="createAccount" class="flex-1 p-3 font-genos text-white text-4xl font-bold">Sign Up</button>
                    </div>
                    <div v-else class="login-button-wrapper flex border border-black border-solid rounded-3xl">
                        <button @click="login" class="flex-1 p-3 font-genos text-white text-4xl font-bold">Login</button>
                    </div>
                    <div class="or-wrapper flex flex-row items-center gap-2">
                        <div class="border border-black h-0 flex-1"></div>
                        <span>or</span>
                        <div class="border border-black h-0 flex-1"></div>
                    </div>
                    <div v-if="signingUp" class="sign-up-text-login flex">
                        <button @click="switchMode" class="flex-1">Already have an account?</button>
                    </div>
                    <div v-else class="sign-up-text-login flex">
                        <button @click="switchMode" class="flex-1">Sign Up</button>
                    </div>
                    <button @click="seeCurrentUser">see user</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { supabase } from '../clients/supabase'
    import router from '../router'

    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const rememberMe = ref(false)
    const firstName = ref('')

    const signingUp = ref(false)

    // create account
    async function createAccount() {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    first_name: firstName.value
                }
            }
        })

        if (error) {
            console.log(error)
        } else {
            console.log(data)
            signingUp.value = false
        }
    }
    
    // switch to sign up/login
    function switchMode() {
        signingUp.value = !signingUp.value
    }

    // login
    async function login() {
        console.log("login")
        const { data, error }  = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) {
            console.log(error)
        } else {
            console.log(data)
            router.push({ path: 'Applications', replace: true })
        }
    }

    // see current user
    async function seeCurrentUser() {
        console.log("see current user")
        const localUser = await supabase.auth.getSession()
        console.log(localUser)
    }

</script>

<style lang="scss" scoped>
    .top-bar-wrapper {
        height: 116px;
        background-color: var(--dark-aquamarine);
    }

    .content-wrapper {
        background-color: var(--light-aquamarine);
    }

    .login-button-wrapper {
        background-color: var(--light-pink);

        &:hover {
            background-color: var(--bright-pink);
        }
    }

    .login-box-wrapper {
        box-shadow: 0px 0px 10px black;
    }

    // https://moderncss.dev/pure-css-custom-checkbox-style/
    .checkbox-input {
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        appearance: none;

        // transform: translateY(-0.075em);
        display: grid;
    }

    input:checked + .material-symbols-outlined {
        visibility: visible;
    }

    input:checked {
        background-color: var(--light-pink);
    }

    .material-symbols-outlined {
        padding: 0.35rem;
    }

    .checkmark-container:hover {
        input:not(:checked) {
            background-color: darkgray;
        }

        input:checked {
            background-color: var(--bright-pink);
        }
    }
</style>