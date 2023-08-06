<script setup lang="ts">
    import { useHuntStore } from '@/stores/hunts';
    import { useApplicationStore } from '@/stores/applications';

    const storeApplications = useApplicationStore()

    // const store = useCurrentHuntStore()
    const storeHunts = useHuntStore()

    // const { currentHunt } = storeToRefs(store)
    // const { setCurrentHunt } = store

    defineEmits(['click', 'addHunt'])

    // function changingHunt() {
    //     setCurrentHunt(currentHunt.value) 
    // }
</script>

<template>
        <div class="my-auto flex flex-row place-content-between gap-4 mr-4 top-control-wrapper">
            <div class="border-2 dropdown-wrapper flex">
                    <!-- <label for="hunts" class="font-bold font-genos bold">Job Hunts</label> -->
                <select id="hunts"  v-model="storeHunts.currentHunt" class="font-genos text-3xl font-bold px-5 flex-1">
                    <option v-for="hunt in storeHunts.hunts" :key="hunt.id" :value="hunt.id">{{hunt.hunt_title}}</option>
                    <!-- <option value="Post Grad">Post Grad</option>
                    <option value="Second Job">Second Job</option>
                    <option value="Game Dev">Game Dev</option> -->
                </select>
            </div>
            <div class="vertical-plus-wrapper">
                <button id="add-hunt-button" @click="$emit('addHunt')" class="material-symbols-outlined">add</button>
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
        display: flex;
    }

    #add-hunt-button {
        background-color: var(--light-aquamarine);
        &:disabled {
            background-color: var(--disabled-aquamarine);
        }

    }

    .material-symbols-outlined {
        font-size: 3rem;
        flex: 1 1 0;
    }

    select {
        background-color: var(--light-aquamarine);
    }

    #hunts:disabled {
        background-color: var(--disabled-aquamarine);
    }
</style>
