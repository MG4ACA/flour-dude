<template>
  <nav class="navbar sticky top-0 z-50 bg-vintage-bg shadow-md border-b-2 border-vintage-accent">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <i class="pi pi-coffee text-4xl text-vintage-primary"></i>
          <div class="logo-text">
            <h1 class="text-3xl font-heading font-bold text-vintage-primary m-0">Flour Dude</h1>
            <p class="text-xs text-vintage-accent font-body -mt-1">Artisanal Coffee & More</p>
          </div>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6">
          <a
            href="#home"
            class="nav-link font-body font-medium text-vintage-text hover:text-vintage-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#story"
            class="nav-link font-body font-medium text-vintage-text hover:text-vintage-primary transition-colors"
          >
            Our Story
          </a>
          <a
            href="#products"
            class="nav-link font-body font-medium text-vintage-text hover:text-vintage-primary transition-colors"
          >
            Menu
          </a>
          <a
            href="#gallery"
            class="nav-link font-body font-medium text-vintage-text hover:text-vintage-primary transition-colors"
          >
            Gallery
          </a>
          <a
            href="#location"
            class="nav-link font-body font-medium text-vintage-text hover:text-vintage-primary transition-colors"
          >
            Visit Us
          </a>
          <a
            href="#contact"
            class="nav-link font-body font-medium text-vintage-text hover:text-vintage-primary transition-colors"
          >
            Contact
          </a>
          <router-link to="/admin">
            <Button label="Admin" icon="pi pi-cog" class="p-button-sm" />
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <Button
          icon="pi pi-bars"
          class="p-button-text p-button-rounded md:hidden"
          @click="mobileMenuVisible = true"
        />
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <Sidebar v-model:visible="mobileMenuVisible" position="right" class="w-full md:w-20rem">
      <template #header>
        <div class="flex items-center gap-2">
          <i class="pi pi-coffee text-2xl text-vintage-primary"></i>
          <h2 class="text-xl font-heading font-bold text-vintage-primary m-0">Menu</h2>
        </div>
      </template>

      <div class="flex flex-column gap-3">
        <a
          href="#home"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-home mr-2"></i>
          Home
        </a>
        <a
          href="#story"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-book mr-2"></i>
          Our Story
        </a>
        <a
          href="#products"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-shopping-bag mr-2"></i>
          Menu
        </a>
        <a
          href="#gallery"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-images mr-2"></i>
          Gallery
        </a>
        <a
          href="#location"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-map-marker mr-2"></i>
          Visit Us
        </a>
        <a
          href="#contact"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-envelope mr-2"></i>
          Contact
        </a>
        <router-link
          to="/admin"
          @click="mobileMenuVisible = false"
          class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-body"
        >
          <i class="pi pi-cog mr-2"></i>
          Admin Panel
        </router-link>
      </div>
    </Sidebar>
  </nav>
</template>

<script setup>
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import { ref } from 'vue';

const mobileMenuVisible = ref(false);
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 241, 232, 0.95);
}

.nav-link {
  position: relative;
  padding-bottom: 2px;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: var(--vintage-primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover:after {
  width: 100%;
}
</style>
