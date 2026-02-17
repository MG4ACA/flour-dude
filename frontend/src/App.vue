<template>
  <div id="app" class="min-h-screen">
    <Toast />
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Toast from 'primevue/toast';
import Navbar from './components/Navbar.vue';
</script>

<style>
#app {
  min-height: 100vh;
  background-color: var(--vintage-bg);
}
</style>
