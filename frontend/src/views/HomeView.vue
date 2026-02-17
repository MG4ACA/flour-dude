<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section id="home" class="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      <div class="hero-bg absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070" 
          alt="Coffee" 
          class="w-full h-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-vintage-bg via-transparent to-vintage-bg"></div>
      </div>
      
      <div class="hero-content relative z-10 text-center px-4 fade-in">
        <h1 class="text-6xl md:text-8xl font-heading font-bold text-vintage-primary mb-4 hero-title">
          Flour Dude
        </h1>
        <p class="text-2xl md:text-3xl font-body text-vintage-accent mb-2">
          Artisanal Coffee & Delights
        </p>
        <p class="text-lg md:text-xl font-body text-vintage-text mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of tradition and flavor in the heart of Galle
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <Button 
            label="Explore Menu" 
            icon="pi pi-arrow-down" 
            class="p-button-lg"
            @click="scrollToSection('products')"
          />
          <Button 
            label="Visit Us" 
            icon="pi pi-map-marker" 
            class="p-button-lg p-button-outlined"
            @click="scrollToSection('location')"
          />
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i class="pi pi-chevron-down text-3xl text-vintage-primary"></i>
      </div>
    </section>

    <!-- Our Story Section -->
    <section id="story" class="story-section py-20 px-4 bg-white">
      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="story-image fade-in">
            <img 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2187" 
              alt="Coffee making" 
              class="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
          </div>
          <div class="story-content fade-in">
            <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-6">Our Story</h2>
            <p class="text-lg font-body text-vintage-text mb-4 leading-relaxed">
              Born in the historic city of Galle, Flour Dude is more than just a coffee shop—it's a celebration 
              of Sri Lankan hospitality and artisanal craftsmanship.
            </p>
            <p class="text-lg font-body text-vintage-text mb-4 leading-relaxed">
              We source the finest coffee beans from local estates and combine them with our signature baking 
              techniques to create unforgettable experiences. Every cup tells a story, every brownie sparks joy.
            </p>
            <p class="text-lg font-body text-vintage-text mb-6 leading-relaxed">
              Our vintage-inspired space is designed to transport you to a simpler time, where quality and 
              conversation were paramount. Welcome to the Flour Dude family.
            </p>
            <div class="flex gap-8">
              <div>
                <h3 class="text-3xl font-heading font-bold text-vintage-primary">5+</h3>
                <p class="text-vintage-accent font-body">Years of Excellence</p>
              </div>
              <div>
                <h3 class="text-3xl font-heading font-bold text-vintage-primary">1000+</h3>
                <p class="text-vintage-accent font-body">Happy Customers</p>
              </div>
              <div>
                <h3 class="text-3xl font-heading font-bold text-vintage-primary">50+</h3>
                <p class="text-vintage-accent font-body">Unique Recipes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products/Menu Section -->
    <section id="products" class="products-section py-20 px-4 bg-vintage-bg">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Our Menu</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Handcrafted with love, served with passion. Explore our selection of premium coffees, 
            decadent brownies, and artisanal treats.
          </p>
        </div>

        <!-- Filters -->
        <div class="mb-8 fade-in">
          <div class="flex flex-wrap gap-4 justify-center items-center">
            <span class="p-input-icon-left w-full md:w-auto">
              <i class="pi pi-search" />
              <InputText 
                v-model="searchQuery" 
                placeholder="Search menu..." 
                class="w-full md:w-80"
              />
            </span>
            <Dropdown 
              v-model="selectedCategory" 
              :options="categoryOptions" 
              optionLabel="name" 
              optionValue="id"
              placeholder="All Categories" 
              class="w-full md:w-60"
              showClear
            />
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="loading" class="text-center py-20">
          <ProgressSpinner />
        </div>

        <DataView v-else :value="filteredProducts" :layout="'grid'" class="fade-in">
          <template #grid="slotProps">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                v-for="product in slotProps.items" 
                :key="product.id"
                class="product-card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-vintage-accent"
              >
                <template #header>
                  <img 
                    :src="product.image_url" 
                    :alt="product.name"
                    class="w-full h-56 object-cover"
                  />
                </template>
                <template #title>
                  <h3 class="text-2xl font-heading font-bold text-vintage-primary">{{ product.name }}</h3>
                </template>
                <template #subtitle>
                  <Tag :value="getCategoryName(product.category_id)" class="bg-vintage-accent text-white" />
                </template>
                <template #content>
                  <p class="text-vintage-text font-body">{{ product.description }}</p>
                </template>
                <template #footer>
                  <div class="flex justify-between items-center">
                    <span class="text-2xl font-heading font-bold text-vintage-primary">
                      Rs. {{ product.price }}
                    </span>
                    <Button 
                      icon="pi pi-heart" 
                      class="p-button-rounded p-button-text" 
                      @click="toggleFavorite(product.id)"
                    />
                  </div>
                </template>
              </Card>
            </div>
          </template>
        </DataView>

        <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20">
          <i class="pi pi-inbox text-6xl text-vintage-accent mb-4"></i>
          <p class="text-xl font-body text-vintage-text">No products found. Try a different search or category.</p>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery-section py-20 px-4 bg-white">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Gallery</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            A glimpse into our world of coffee, craftsmanship, and community
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 fade-in">
          <div 
            v-for="(image, index) in galleryImages" 
            :key="index"
            class="gallery-item overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            @click="showGalleryImage(index)"
          >
            <img 
              :src="image.url" 
              :alt="image.caption"
              class="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <!-- Gallery Dialog -->
      <Dialog v-model:visible="galleryDialogVisible" modal :style="{ width: '80vw' }" class="gallery-dialog">
        <template #header>
          <h3 class="font-heading text-2xl">{{ galleryImages[currentGalleryIndex]?.caption }}</h3>
        </template>
        <div class="flex justify-center items-center">
          <img 
            :src="galleryImages[currentGalleryIndex]?.url" 
            :alt="galleryImages[currentGalleryIndex]?.caption"
            class="max-w-full max-h-[70vh] object-contain"
          />
        </div>
        <template #footer>
          <div class="flex justify-between">
            <Button 
              label="Previous" 
              icon="pi pi-chevron-left" 
              @click="previousGalleryImage"
              :disabled="currentGalleryIndex === 0"
            />
            <span class="font-body">{{ currentGalleryIndex + 1 }} / {{ galleryImages.length }}</span>
            <Button 
              label="Next" 
              icon="pi pi-chevron-right" 
              iconPos="right"
              @click="nextGalleryImage"
              :disabled="currentGalleryIndex === galleryImages.length - 1"
            />
          </div>
        </template>
      </Dialog>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials-section py-20 px-4 bg-vintage-bg">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">What Our Customers Say</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Real stories from real coffee lovers
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 fade-in">
          <Card 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="testimonial-card text-center border-2 border-vintage-accent"
          >
            <template #header>
              <div class="flex justify-center pt-6">
                <Avatar 
                  :label="testimonial.name.charAt(0)" 
                  size="xlarge" 
                  shape="circle"
                  class="bg-vintage-primary text-white text-3xl"
                />
              </div>
            </template>
            <template #content>
              <div class="flex justify-center mb-4">
                <Rating :modelValue="testimonial.rating" :readonly="true" :cancel="false" />
              </div>
              <p class="text-vintage-text font-body italic mb-4">
                "{{ testimonial.text }}"
              </p>
              <h4 class="font-heading font-bold text-vintage-primary text-xl">{{ testimonial.name }}</h4>
              <p class="text-vintage-accent font-body text-sm">{{ testimonial.role }}</p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Location & Hours Section -->
    <section id="location" class="location-section py-20 px-4 bg-white">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Visit Us</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Find us in the heart of Galle. We can't wait to serve you!
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <div class="location-info fade-in">
            <Card class="border-2 border-vintage-accent">
              <template #content>
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <i class="pi pi-map-marker text-3xl text-vintage-primary mt-1"></i>
                    <div>
                      <h3 class="text-xl font-heading font-bold text-vintage-primary mb-2">Address</h3>
                      <p class="text-vintage-text font-body">
                        123 Fort Street<br>
                        Galle Fort, Galle 80000<br>
                        Sri Lanka
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div class="flex items-start gap-4">
                    <i class="pi pi-clock text-3xl text-vintage-primary mt-1"></i>
                    <div class="flex-1">
                      <h3 class="text-xl font-heading font-bold text-vintage-primary mb-2">Opening Hours</h3>
                      <div class="space-y-2 text-vintage-text font-body">
                        <div class="flex justify-between">
                          <span class="font-semibold">Monday - Friday</span>
                          <span>7:00 AM - 8:00 PM</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="font-semibold">Saturday</span>
                          <span>8:00 AM - 9:00 PM</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="font-semibold">Sunday</span>
                          <span>8:00 AM - 7:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div class="flex items-start gap-4">
                    <i class="pi pi-phone text-3xl text-vintage-primary mt-1"></i>
                    <div>
                      <h3 class="text-xl font-heading font-bold text-vintage-primary mb-2">Contact</h3>
                      <p class="text-vintage-text font-body">
                        <a href="tel:+94912224567" class="hover:text-vintage-primary transition-colors">
                          +94 91 222 4567
                        </a><br>
                        <a href="mailto:hello@flourdude.lk" class="hover:text-vintage-primary transition-colors">
                          hello@flourdude.lk
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <div class="location-map fade-in">
            <div class="rounded-lg overflow-hidden shadow-2xl h-full min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.4851848876394!2d80.21638731476889!3d6.032448295590127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c22!2sGalle%20Fort!5e0!3m2!1sen!2slk!4v1645123456789!5m2!1sen!2slk"
                width="100%" 
                height="100%" 
                style="border:0; min-height: 400px;" 
                allowfullscreen="" 
                loading="lazy"
                class="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section py-20 px-4 bg-vintage-bg">
      <div class="container mx-auto max-w-4xl">
        <div class="text-center mb-12 fade-in">
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Get In Touch</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </div>

        <Card class="fade-in contact-form-card border-2 border-vintage-accent">
          <template #content>
            <form @submit.prevent="submitContact" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex flex-column gap-2">
                  <label for="name" class="font-body font-semibold text-vintage-text">Name *</label>
                  <InputText 
                    id="name" 
                    v-model="contactForm.name" 
                    required 
                    placeholder="Your name"
                  />
                </div>
                <div class="flex flex-column gap-2">
                  <label for="email" class="font-body font-semibold text-vintage-text">Email *</label>
                  <InputText 
                    id="email" 
                    v-model="contactForm.email" 
                    type="email" 
                    required 
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div class="flex flex-column gap-2">
                <label for="phone" class="font-body font-semibold text-vintage-text">Phone</label>
                <InputText 
                  id="phone" 
                  v-model="contactForm.phone" 
                  placeholder="+94 XX XXX XXXX"
                />
              </div>

              <div class="flex flex-column gap-2">
                <label for="subject" class="font-body font-semibold text-vintage-text">Subject *</label>
                <InputText 
                  id="subject" 
                  v-model="contactForm.subject" 
                  required 
                  placeholder="What's this about?"
                />
              </div>

              <div class="flex flex-column gap-2">
                <label for="message" class="font-body font-semibold text-vintage-text">Message *</label>
                <Textarea 
                  id="message" 
                  v-model="contactForm.message" 
                  required 
                  rows="6"
                  placeholder="Tell us more..."
                />
              </div>

              <div class="flex justify-center">
                <Button 
                  type="submit" 
                  label="Send Message" 
                  icon="pi pi-send" 
                  class="p-button-lg"
                  :loading="contactSubmitting"
                />
              </div>
            </form>
          </template>
        </Card>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-vintage-text text-white py-12 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <i class="pi pi-coffee text-3xl text-vintage-accent"></i>
              <h3 class="text-2xl font-heading font-bold">Flour Dude</h3>
            </div>
            <p class="font-body text-gray-300">
              Brewing excellence, baking happiness. Your neighborhood artisanal coffee shop in Galle.
            </p>
          </div>

          <div>
            <h4 class="text-xl font-heading font-bold mb-4 text-vintage-accent">Quick Links</h4>
            <ul class="space-y-2 font-body">
              <li><a href="#home" class="hover:text-vintage-accent transition-colors">Home</a></li>
              <li><a href="#story" class="hover:text-vintage-accent transition-colors">Our Story</a></li>
              <li><a href="#products" class="hover:text-vintage-accent transition-colors">Menu</a></li>
              <li><a href="#gallery" class="hover:text-vintage-accent transition-colors">Gallery</a></li>
              <li><a href="#location" class="hover:text-vintage-accent transition-colors">Visit Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-xl font-heading font-bold mb-4 text-vintage-accent">Contact Info</h4>
            <ul class="space-y-2 font-body text-gray-300">
              <li class="flex items-center gap-2">
                <i class="pi pi-map-marker"></i>
                123 Fort Street, Galle
              </li>
              <li class="flex items-center gap-2">
                <i class="pi pi-phone"></i>
                +94 91 222 4567
              </li>
              <li class="flex items-center gap-2">
                <i class="pi pi-envelope"></i>
                hello@flourdude.lk
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-xl font-heading font-bold mb-4 text-vintage-accent">Follow Us</h4>
            <div class="flex gap-4">
              <a href="https://facebook.com" target="_blank" class="social-icon">
                <i class="pi pi-facebook text-2xl hover:text-vintage-accent transition-colors"></i>
              </a>
              <a href="https://instagram.com" target="_blank" class="social-icon">
                <i class="pi pi-instagram text-2xl hover:text-vintage-accent transition-colors"></i>
              </a>
              <a href="https://twitter.com" target="_blank" class="social-icon">
                <i class="pi pi-twitter text-2xl hover:text-vintage-accent transition-colors"></i>
              </a>
              <a href="https://youtube.com" target="_blank" class="social-icon">
                <i class="pi pi-youtube text-2xl hover:text-vintage-accent transition-colors"></i>
              </a>
            </div>
            <div class="mt-6">
              <h5 class="font-body font-semibold mb-2">Newsletter</h5>
              <div class="flex gap-2">
                <InputText 
                  v-model="newsletterEmail" 
                  placeholder="Your email" 
                  class="flex-1"
                />
                <Button 
                  icon="pi pi-send" 
                  @click="subscribeNewsletter"
                  :loading="newsletterSubmitting"
                />
              </div>
            </div>
          </div>
        </div>

        <Divider class="border-gray-600" />

        <div class="text-center font-body text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Flour Dude. All rights reserved. Made with ❤️ in Galle.</p>
        </div>
      </div>
    </footer>

    <!-- Toast for notifications -->
    <Toast position="top-right" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { productService, categoryService } from '@/services/api'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// PrimeVue Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import Avatar from 'primevue/avatar'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'

gsap.registerPlugin(ScrollTrigger)

const toast = useToast()

// Products & Categories
const products = ref([])
const categories = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref(null)

// Contact Form
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})
const contactSubmitting = ref(false)

// Newsletter
const newsletterEmail = ref('')
const newsletterSubmitting = ref(false)

// Gallery
const galleryDialogVisible = ref(false)
const currentGalleryIndex = ref(0)
const galleryImages = ref([
  { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800', caption: 'Fresh Coffee Brewing' },
  { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800', caption: 'Artisanal Coffee Art' },
  { url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800', caption: 'Cozy Ambiance' },
  { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800', caption: 'Coffee Making Process' },
  { url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800', caption: 'Delicious Brownies' },
  { url: 'https://images.unsplash.com/photo-1587049352846-4a222e784422?q=80&w=800', caption: 'Fresh Pastries' },
  { url: 'https://images.unsplash.com/photo-1501492673258-a87e20d3e90f?q=80&w=800', caption: 'Our Vintage Interior' },
  { url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800', caption: 'Coffee Beans Selection' }
])

// Testimonials
const testimonials = ref([
  {
    id: 1,
    name: 'Samantha Wijesinghe',
    role: 'Regular Customer',
    text: 'The best coffee in Galle! The vintage ambiance and friendly staff make every visit special.',
    rating: 5
  },
  {
    id: 2,
    name: 'James Anderson',
    role: 'Tourist from UK',
    text: 'Stumbled upon this gem while exploring Galle Fort. The brownies are to die for!',
    rating: 5
  },
  {
    id: 3,
    name: 'Dilini Fernando',
    role: 'Local Food Blogger',
    text: 'Flour Dude perfectly captures the essence of artisanal coffee culture. A must-visit!',
    rating: 5
  }
])

// Computed
const categoryOptions = computed(() => {
  return [
    { id: null, name: 'All Categories' },
    ...categories.value
  ]
})

const filteredProducts = computed(() => {
  let filtered = products.value

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category_id === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const fetchData = async () => {
  try {
    loading.value = true
    const [productsData, categoriesData] = await Promise.all([
      productService.getAll(),
      categoryService.getAll()
    ])
    products.value = productsData
    categories.value = categoriesData
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load products. Using demo data.',
      life: 3000
    })
    // Fallback demo data
    loadDemoData()
  } finally {
    loading.value = false
  }
}

const loadDemoData = () => {
  categories.value = [
    { id: 1, name: 'Coffee' },
    { id: 2, name: 'Brownies' },
    { id: 3, name: 'Pastries' },
    { id: 4, name: 'Desserts' }
  ]

  products.value = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and bold espresso shot, crafted from premium beans',
      price: 350,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800'
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Perfectly balanced espresso with steamed milk and foam',
      price: 450,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800'
    },
    {
      id: 3,
      name: 'Latte',
      description: 'Smooth and creamy latte with beautiful art',
      price: 500,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800'
    },
    {
      id: 4,
      name: 'Dark Chocolate Brownie',
      description: 'Decadent double chocolate brownie with walnuts',
      price: 400,
      category_id: 2,
      image_url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?q=80&w=800'
    },
    {
      id: 5,
      name: 'Salted Caramel Brownie',
      description: 'Rich brownie with salted caramel swirls',
      price: 450,
      category_id: 2,
      image_url: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800'
    },
    {
      id: 6,
      name: 'Croissant',
      description: 'Buttery, flaky French croissant, baked fresh daily',
      price: 300,
      category_id: 3,
      image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800'
    },
    {
      id: 7,
      name: 'Cinnamon Roll',
      description: 'Warm cinnamon roll with cream cheese frosting',
      price: 350,
      category_id: 3,
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800'
    },
    {
      id: 8,
      name: 'Tiramisu',
      description: 'Classic Italian tiramisu with mascarpone',
      price: 600,
      category_id: 4,
      image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800'
    },
    {
      id: 9,
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake',
      price: 550,
      category_id: 4,
      image_url: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800'
    }
  ]
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'Unknown'
}

const toggleFavorite = (productId) => {
  toast.add({
    severity: 'success',
    summary: 'Added to Favorites',
    detail: 'Product added to your favorites!',
    life: 2000
  })
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const showGalleryImage = (index) => {
  currentGalleryIndex.value = index
  galleryDialogVisible.value = true
}

const nextGalleryImage = () => {
  if (currentGalleryIndex.value < galleryImages.value.length - 1) {
    currentGalleryIndex.value++
  }
}

const previousGalleryImage = () => {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--
  }
}

const submitContact = async () => {
  contactSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Message Sent!',
      detail: 'Thank you for contacting us. We\'ll get back to you soon!',
      life: 4000
    })
    
    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    
    contactSubmitting.value = false
  }, 1500)
}

const subscribeNewsletter = () => {
  if (!newsletterEmail.value) return
  
  newsletterSubmitting.value = true
  
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Subscribed!',
      detail: 'You\'ve been added to our newsletter!',
      life: 3000
    })
    newsletterEmail.value = ''
    newsletterSubmitting.value = false
  }, 1000)
}

const initAnimations = () => {
  // Animate elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in')
  
  fadeElements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  })

  // Hero title animation
  gsap.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
  })
}

// Lifecycle
onMounted(() => {
  fetchData()
  setTimeout(() => {
    initAnimations()
  }, 100)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--vintage-bg) 0%, #ffe4d1 100%);
}

.product-card {
  background: white;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
}

.testimonial-card {
  background: white;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.contact-form-card {
  background: white;
}

.social-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}
</style>
