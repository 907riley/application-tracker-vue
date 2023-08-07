<script setup lang="ts">
</script>

<template>
    <RouterView></RouterView>
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
    --disabled-aquamarine: #237667;

    --interviewing-color: #95FF9F;
    --rejected-color: #FEAD9B;
    --offered-color: #5BCEDD;
    --accepted-color: #40D24E;
    --declined-color: #FF6A49;
    --pending-color: #FFFFFF;
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