<template>
  <div class="navbar-wrapper sticky top-0 z-50 w-full flex justify-center px-4 pt-4">
    <nav
      :class="[
        'navbar rounded-full transition-all duration-300 shadow-lg max-w-6xl w-full',
        scrolled
          ? 'bg-vintage-bg/90 backdrop-blur-xl border-2 border-vintage-accent'
          : 'bg-vintage-bg/60 backdrop-blur-2xl border border-white/20',
      ]"
    >
      <div class="px-6 lg:px-8 relative">
        <div class="flex justify-between items-center h-16">
          <!-- Logo - Left Aligned (Desktop Only) -->
          <router-link to="/" class="hidden md:flex items-center gap-2">
            <img src="@/flour-dude-logo.png" alt="Flour Dude Logo" class="h-12 w-auto" />
          </router-link>

          <!-- Desktop Menu - Right Aligned -->
          <div class="hidden md:flex items-center gap-6">
            <a
              href="#home"
              class="nav-link font-heading font-medium text-vintage-text hover:text-vintage-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#story"
              class="nav-link font-heading font-medium text-vintage-text hover:text-vintage-primary transition-colors"
            >
              Our Story
            </a>
            <a
              href="#products"
              class="nav-link font-heading font-medium text-vintage-text hover:text-vintage-primary transition-colors"
            >
              Menu
            </a>
            <a
              href="#gallery"
              class="nav-link font-heading font-medium text-vintage-text hover:text-vintage-primary transition-colors"
            >
              Gallery
            </a>
            <a
              href="#location"
              class="nav-link font-heading font-medium text-vintage-text hover:text-vintage-primary transition-colors"
            >
              Visit Us
            </a>
            <a
              href="#contact"
              class="nav-link font-heading font-medium text-vintage-text hover:text-vintage-primary transition-colors"
            >
              Contact
            </a>

            <router-link to="/admin">
              <Button label="" icon="pi pi-cog" class="p-button-sm" />
            </router-link>
          </div>

          <!-- Mobile: Logo (left) + Menu Button (right) -->
          <div class="flex md:hidden items-center justify-between w-full">
            <router-link to="/" class="flex items-center">
              <img src="@/flour-dude-logo.png" alt="Flour Dude Logo" class="h-10 w-auto" />
            </router-link>

            <Button
              icon="pi pi-bars"
              class="p-button-text p-button-rounded"
              @click="mobileMenuVisible = true"
            />
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- Mobile Sidebar -->
  <Sidebar v-model:visible="mobileMenuVisible" position="right" class="w-full md:w-20rem">
    <template #header>
      <div class="flex items-center gap-2">
        <img src="@/flour-dude-logo.png" alt="Flour Dude Logo" class="h-8 w-auto" />
        <h2 class="text-xl font-heading font-bold text-vintage-primary m-0">Menu</h2>
      </div>
    </template>

    <div class="flex flex-column gap-3 mobile-view-menu">
      <a
        href="#home"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-home mr-2"></i>
        Home
      </a>
      <a
        href="#story"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-book mr-2"></i>
        Our Story
      </a>
      <a
        href="#products"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-shopping-bag mr-2"></i>
        Menu
      </a>
      <a
        href="#gallery"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-images mr-2"></i>
        Gallery
      </a>
      <a
        href="#location"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-map-marker mr-2"></i>
        Visit Us
      </a>
      <a
        href="#contact"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-envelope mr-2"></i>
        Contact
      </a>
      <router-link
        to="/admin"
        @click="mobileMenuVisible = false"
        class="p-3 hover:bg-vintage-accent hover:bg-opacity-20 rounded-lg transition-colors font-heading"
      >
        <i class="pi pi-cog mr-2"></i>
        Admin Panel
      </router-link>
    </div>
  </Sidebar>
</template>

<script setup>
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import { onMounted, onUnmounted, ref } from 'vue';

const mobileMenuVisible = ref(false);
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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

.mobile-view-menu {
  flex-direction: column;
}
</style>
