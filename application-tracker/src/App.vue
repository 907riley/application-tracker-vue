<script setup lang="ts">
  import Login from './components/Login.vue'
</script>

<template>
  <Login></Login>
</template>

<style lang="scss">
  :root {
    --dark-blue: #6B98BB;
    --light-blue: #AEDBFF;
    --side-bar-width: 300px;
    --bright-aquamarine: #00FFD1;
    --light-aquamarine: #41CAB2;
    --dark-aquamarine: #053B3F;
    --bright-pink: #FF00B8;
    --light-pink: #D728A6;

    // font-family: 'Genos', sans-serif;
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