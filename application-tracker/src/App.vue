<script setup lang="ts">
  import ApplicationTracker from './components/ApplicationTracker.vue'
</script>

<template>
  <div class="app">
    <ApplicationTracker></ApplicationTracker>
  </div>
</template>

<style>
.app {
  /* display: flex; */
}

main {
  /* flex: 1 1 0; */

  @media (max-width: 768px) {
    padding-left: 6rem;
  }
}

</style>