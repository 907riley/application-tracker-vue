<script setup lang="ts">
    import DropDownVue from './DropDown.vue';
    import { supabase } from '@/clients/supabase';
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useCurrentHuntStore } from '@/stores/currentHunt';

    const store = useCurrentHuntStore()

    const { currentHunt } = storeToRefs(store)
    const { setCurrentHunt } = store

    const props = defineProps(['localHunts'])

    defineEmits(['click', 'addHunt'])

    function changingHunt() {
        setCurrentHunt(currentHunt.value) 
    }
</script>

<template>
        <div class="my-auto flex flex-row place-content-between gap-4 mr-4 top-control-wrapper">
            <div class="border-2 dropdown-wrapper flex">
                    <!-- <label for="hunts" class="font-bold font-genos bold">Job Hunts</label> -->
                <select id="hunts" @change="changingHunt()" v-model="currentHunt" class="font-genos text-3xl font-bold px-5 flex-1">
                    <option v-for="hunt in localHunts" :key="hunt.hunt_title" :value="hunt.hunt_title">{{hunt.hunt_title}}</option>
                    <!-- <option value="Post Grad">Post Grad</option>
                    <option value="Second Job">Second Job</option>
                    <option value="Game Dev">Game Dev</option> -->
                </select>
            </div>
            <div class="vertical-plus-wrapper">
                <button @click="$emit('addHunt')" class="material-symbols-outlined">add</button>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .top-control-wrapper {
        display: flex;
        flex-direction: row;

        & > * {
            border: 2px solid black;
        }
    }

    .vertical-plus-wrapper {
        background-color: var(--light-aquamarine);
        display: flex;
    }

    .material-symbols-outlined {
        font-size: 3rem;
        flex: 1 1 0;
    }

    select {
        background-color: var(--light-aquamarine);
    }

</style>
