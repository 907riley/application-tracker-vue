<template>
    <div class="login-page-wrapper h-screen flex flex-col">
        <div class="top-bar-wrapper flex">
            <span class="font-genos font-bold text-5xl text-white flex-1 text-center my-auto">Job Application Tracker</span>
        </div>
        <div class="content-wrapper flex-1 flex justify-center items-center">
            <div class="login-box-wrapper bg-white w-fit h-fit p-5">
                <div class="login-content mx-16 w-96 font-genos font-bold flex flex-col gap-4">
                    <div class="login-text-wrapper font-bold font-genos mb-5">
                        <h3 class="text-5xl">Login</h3>
                        <span>All your job hunts in one place</span>
                    </div>
                    <div class="text-box-wrapper flex flex-col gap-4">
                        <div class="email-wrapper flex flex-col gap-1">
                            <label for="email">Email</label>
                            <input id="email" type='text' v-model="email" class="bg-zinc-300 text-2xl p-1 px-2 font-normal border-black border"/>
                        </div>
                        <div class="password-wrapper flex flex-col gap-1">
                            <label for="password">Password</label>
                            <input id="password" type='password' v-model="password" class="bg-zinc-300 text-2xl p-1 px-2 border-black border"/>
                            <span class="forgot-password">
                                Forgot Password?
                            </span>
                        </div>
                        <div class="remember-wrapper">
                            <label class="checkmark-container py-2  flex-row gap-1 bg-red-200" for="check">
                                <input type="checkbox" class="checkbox-input hidden" id="check" v-model="rememberMe"/>
                                <span class="flex-1 bg-red-200"></span>
                            </label>
                            <span>Remember Me</span>
                        </div>
                    </div>
                    <div class="login-button-wrapper flex border border-black border-solid rounded-3xl">
                        <button class="flex-1 p-3 font-genos text-white text-4xl font-bold">Login</button>
                    </div>
                    <div class="or-wrapper">
                        <div></div>
                        <span>or</span>
                        <div></div>
                    </div>
                    <div class="sign-up-text-login">
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const email = ref('')
    const pasword = ref('')
    const rememberMe = ref(false)

</script>

<style lang="scss">
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

    .checkbox-input {
        display: none;
    }

    .checkmark-container {
        display: inline-block;
    }
</style>