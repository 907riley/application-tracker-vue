<script setup lang="ts">
  import ApplicationTracker from './components/ApplicationTracker.vue'
</script>

<template>
  <ApplicationTracker></ApplicationTracker>
</template>

<style lang="scss">
  :root {
    --dark-blue: #6B98BB;
    --light-blue: #AEDBFF;
    --side-bar-width: 300px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }
</style>