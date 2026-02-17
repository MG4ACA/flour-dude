<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section
      id="home"
      class="hero-section relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div class="hero-bg absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070"
          alt="Coffee"
          class="w-full h-full object-cover opacity-75"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-vintage-bg via-transparent to-vintage-bg"
        ></div>
      </div>

      <div class="hero-content relative z-10 text-center px-4 fade-in">
        <h1
          class="text-6xl md:text-8xl font-heading font-bold text-vintage-primary mb-4 hero-title"
        >
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
              Born in the historic city of Galle, Flour Dude is more than just a coffee shop—it's a
              celebration of Sri Lankan hospitality and artisanal craftsmanship.
            </p>
            <p class="text-lg font-body text-vintage-text mb-4 leading-relaxed">
              We source the finest coffee beans from local estates and combine them with our
              signature baking techniques to create unforgettable experiences. Every cup tells a
              story, every brownie sparks joy.
            </p>
            <p class="text-lg font-body text-vintage-text mb-6 leading-relaxed">
              Our vintage-inspired space is designed to transport you to a simpler time, where
              quality and conversation were paramount. Welcome to the Flour Dude family.
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
    <section
      id="products"
      class="products-section py-20 px-4 bg-vintage-bg relative overflow-hidden"
    >
      <!-- Vintage Background Pattern -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0 vintage-pattern"></div>
      </div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <div class="text-center mb-12 fade-in">
          <div class="inline-block mb-4">
            <div class="flex items-center gap-3">
              <div class="h-px w-12 bg-vintage-accent"></div>
              <i class="pi pi-shop text-3xl text-vintage-accent"></i>
              <div class="h-px w-12 bg-vintage-accent"></div>
            </div>
          </div>
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Our Menu</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Handcrafted with love, served with passion. Explore our selection of premium coffees,
            decadent brownies, and artisanal treats.
          </p>
        </div>

        <!-- Category Filter Buttons -->
        <div class="flex justify-center gap-3 mb-8 flex-wrap fade-in">
          <Button
            label="All"
            :class="{
              'p-button-filled': selectedCategory === null,
              'p-button-outlined': selectedCategory !== null,
            }"
            size="small"
            @click="selectedCategory = null"
            class="vintage-filter-btn"
          />
          <Button
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :class="{
              'p-button-filled': selectedCategory === category.id,
              'p-button-outlined': selectedCategory !== category.id,
            }"
            size="small"
            @click="selectedCategory = category.id"
            class="vintage-filter-btn"
          />
        </div>

        <!-- Search Bar -->
        <div class="flex justify-center mb-8 fade-in px-4">
          <span class="p-input-icon-left w-full sm:w-80 md:w-96">
            <i class="pi pi-search" />
            <InputText v-model="searchQuery" placeholder="Search menu..." class="w-full" />
          </span>
        </div>

        <!-- Products Masonry Grid -->
        <div v-if="loading" class="masonry-menu">
          <div
            v-for="n in 6"
            :key="`skeleton-${n}`"
            class="menu-item skeleton-loader animate-pulse bg-white/50 rounded-lg"
          ></div>
        </div>

        <div
          v-else-if="!loading && displayedProducts.length > 0"
          class="masonry-menu fade-in"
          :class="{ 'masonry-loaded': true }"
        >
          <div
            v-for="(product, index) in displayedProducts"
            :key="product.id"
            class="menu-item group relative overflow-hidden rounded-lg cursor-pointer bg-white border-2 border-transparent hover:border-vintage-accent"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Product Image -->
            <img
              :src="product.image_url"
              :alt="product.name"
              class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Vintage-styled overlay with product info -->
            <div
              class="menu-overlay absolute inset-0 bg-gradient-to-t from-vintage-primary/95 via-vintage-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5"
            >
              <div
                class="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
              >
                <div class="border-l-4 border-vintage-accent pl-3">
                  <Tag
                    :value="getCategoryName(product.category_id)"
                    class="bg-vintage-accent text-white mb-2"
                  />
                  <h3 class="font-heading text-white text-lg font-bold mb-2">
                    {{ product.name }}
                  </h3>
                  <p class="font-body text-vintage-bg text-sm mb-3 line-clamp-2">
                    {{ product.description }}
                  </p>
                  <div class="flex justify-between items-center">
                    <span class="text-xl font-heading font-bold text-vintage-bg">
                      Rs. {{ product.price }}
                    </span>
                    <Button
                      icon="pi pi-heart"
                      class="p-button-rounded p-button-text text-white hover:text-vintage-accent"
                      @click.stop="toggleFavorite(product.id)"
                    />
                  </div>
                </div>
              </div>
              <div
                class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                <i class="pi pi-eye text-white text-lg drop-shadow-lg"></i>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20">
          <i class="pi pi-inbox text-6xl text-vintage-accent mb-4"></i>
          <p class="text-xl font-body text-vintage-text">
            No products found. Try a different search or category.
          </p>
        </div>

        <!-- View More Button -->
        <div v-if="hasMoreProducts" class="text-center mt-8 fade-in">
          <Button
            label="View More Products"
            icon="pi pi-chevron-down"
            class="p-button-lg p-button-outlined"
            @click="showAllProducts = true"
          />
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery-section py-20 px-4 bg-white relative overflow-hidden">
      <!-- Vintage Background Pattern -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0 vintage-pattern"></div>
      </div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <div class="text-center mb-12 fade-in">
          <div class="inline-block mb-4">
            <div class="flex items-center gap-3">
              <div class="h-px w-12 bg-vintage-accent"></div>
              <i class="pi pi-images text-3xl text-vintage-accent"></i>
              <div class="h-px w-12 bg-vintage-accent"></div>
            </div>
          </div>
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Our Gallery</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            A glimpse into our world of coffee, craftsmanship, and community
          </p>
        </div>

        <!-- Filter buttons -->
        <div class="flex justify-center gap-3 mb-8 flex-wrap fade-in">
          <Button
            v-for="filter in galleryFilters"
            :key="filter"
            :label="filter"
            :class="{
              'p-button-filled': selectedGalleryFilter === filter,
              'p-button-outlined': selectedGalleryFilter !== filter,
            }"
            size="small"
            @click="selectedGalleryFilter = filter"
            class="vintage-filter-btn"
          />
        </div>

        <!-- Masonry Gallery Grid -->
        <div
          v-if="!galleryLoading"
          class="masonry-gallery fade-in"
          :class="{ 'masonry-loaded': galleryImagesLoaded }"
        >
          <div
            v-for="(image, index) in filteredGalleryImages"
            :key="index"
            class="gallery-item group relative overflow-hidden rounded-lg cursor-pointer"
            :class="image.height"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="showGalleryImage(index)"
          >
            <!-- Image with loading state -->
            <div
              v-if="!image.loaded"
              class="skeleton-loader absolute inset-0 bg-vintage-accent/20 animate-pulse"
            ></div>
            <img
              :src="image.url"
              :alt="image.caption"
              class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              :class="{ 'opacity-0': !image.loaded }"
              @load="onImageLoad(index)"
              loading="lazy"
            />

            <!-- Vintage-styled overlay with caption -->
            <div
              class="gallery-overlay absolute inset-0 bg-gradient-to-t from-vintage-primary/90 via-vintage-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4"
            >
              <div
                class="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
              >
                <div class="border-l-4 border-vintage-accent pl-3">
                  <h3 class="font-heading text-white text-base font-bold mb-1">
                    {{ image.caption }}
                  </h3>
                  <p
                    v-if="image.category"
                    class="font-body text-vintage-bg text-sm flex items-center gap-1"
                  >
                    <i class="pi pi-tag text-xs"></i>
                    {{ image.category }}
                  </p>
                </div>
              </div>
              <div
                class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                <i class="pi pi-search-plus text-white text-lg drop-shadow-lg"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading skeleton -->
        <div v-else class="masonry-gallery">
          <div
            v-for="n in 8"
            :key="`skeleton-${n}`"
            class="gallery-item skeleton-loader animate-pulse bg-vintage-accent/20 rounded-lg"
            :class="['tall', 'medium', 'short'][n % 3]"
          ></div>
        </div>

        <!-- Instagram Feed Integration Placeholder -->
        <div class="text-center mt-12 fade-in">
          <div
            class="inline-flex items-center gap-3 px-6 py-3 bg-vintage-bg rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <i class="pi pi-instagram text-2xl text-vintage-accent"></i>
            <span class="font-body text-vintage-text">Follow us on Instagram for more!</span>
            <a
              href="https://instagram.com/flourdude"
              target="_blank"
              class="font-heading font-bold text-vintage-primary hover:text-vintage-accent transition-colors"
            >
              @flourdude
            </a>
          </div>
        </div>
      </div>

      <!-- Enhanced Gallery Lightbox Dialog -->
      <Dialog
        v-model:visible="galleryDialogVisible"
        modal
        :style="{ width: isFullscreen ? '100vw' : '85vw', height: isFullscreen ? '100vh' : 'auto' }"
        :class="{ 'gallery-dialog': true, 'gallery-fullscreen': isFullscreen }"
        :draggable="false"
        :maximizable="false"
      >
        <template #header>
          <div class="flex items-center justify-between w-full pr-8">
            <div class="flex-1">
              <h3 class="font-heading text-2xl text-vintage-primary mb-1">
                {{ filteredGalleryImages[currentGalleryIndex]?.caption }}
              </h3>
              <p
                v-if="filteredGalleryImages[currentGalleryIndex]?.category"
                class="font-body text-sm text-vintage-accent flex items-center gap-1"
              >
                <i class="pi pi-tag text-xs"></i>
                {{ filteredGalleryImages[currentGalleryIndex]?.category }}
              </p>
            </div>
            <Button
              :icon="isFullscreen ? 'pi pi-window-minimize' : 'pi pi-window-maximize'"
              @click="toggleFullscreen"
              class="p-button-rounded p-button-text p-button-plain"
              v-tooltip.left="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'"
            />
          </div>
        </template>

        <div
          class="relative flex justify-center items-center"
          :class="isFullscreen ? 'h-[85vh]' : 'h-[60vh]'"
        >
          <!-- Main Image -->
          <img
            :src="filteredGalleryImages[currentGalleryIndex]?.url"
            :alt="filteredGalleryImages[currentGalleryIndex]?.caption"
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl gallery-lightbox-image"
          />

          <!-- Navigation Arrows (Overlay on image) -->
          <Button
            icon="pi pi-chevron-left"
            @click="previousGalleryImage"
            :disabled="currentGalleryIndex === 0"
            class="p-button-rounded p-button-lg gallery-nav-btn gallery-nav-left"
            v-tooltip.right="'Previous'"
          />
          <Button
            icon="pi pi-chevron-right"
            @click="nextGalleryImage"
            :disabled="currentGalleryIndex === filteredGalleryImages.length - 1"
            class="p-button-rounded p-button-lg gallery-nav-btn gallery-nav-right"
            v-tooltip.left="'Next'"
          />
        </div>

        <template #footer>
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-2">
              <Button
                icon="pi pi-download"
                label="Download"
                @click="downloadImage(filteredGalleryImages[currentGalleryIndex])"
                class="p-button-sm p-button-outlined"
                v-tooltip.top="'Download Image'"
              />
            </div>
            <div class="flex items-center gap-4">
              <span class="font-heading font-bold text-lg text-vintage-primary">
                {{ currentGalleryIndex + 1 }} / {{ filteredGalleryImages.length }}
              </span>
            </div>
            <div class="flex gap-2">
              <Button
                icon="pi pi-share-alt"
                label="Share"
                class="p-button-sm p-button-outlined"
                v-tooltip.top="'Share Image'"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </section>

    <!-- Testimonials Section -->
    <section
      id="testimonials"
      class="testimonials-section py-20 px-4 bg-white relative overflow-hidden"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0 vintage-pattern"></div>
      </div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="text-center mb-16 fade-in">
          <div class="inline-block mb-4">
            <i class="pi pi-comments text-5xl text-vintage-accent"></i>
          </div>
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">
            What Our Customers Say
          </h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Real stories from real coffee lovers
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 fade-in">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonial-card group relative bg-vintage-bg rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <!-- Quote Icon -->
            <div
              class="absolute -top-4 -left-4 w-16 h-16 bg-vintage-accent rounded-full flex items-center justify-center shadow-lg"
            >
              <i class="pi pi-quote-left text-2xl text-white"></i>
            </div>

            <!-- Rating Stars -->
            <div class="flex justify-center mb-6 mt-4">
              <Rating
                :modelValue="testimonial.rating"
                :readonly="true"
                :cancel="false"
                class="text-vintage-accent"
              />
            </div>

            <!-- Testimonial Text -->
            <p class="text-vintage-text font-body italic text-lg mb-8 leading-relaxed text-center">
              "{{ testimonial.text }}"
            </p>

            <!-- Author Info -->
            <div class="flex items-center gap-4 pt-6 border-t-2 border-vintage-accent/30">
              <Avatar
                :label="testimonial.name.charAt(0)"
                size="large"
                shape="circle"
                class="bg-vintage-primary text-white text-xl shadow-md"
              />
              <div class="text-left">
                <h4 class="font-heading font-bold text-vintage-primary text-lg">
                  {{ testimonial.name }}
                </h4>
                <p class="text-vintage-accent font-body text-sm">{{ testimonial.role }}</p>
              </div>
            </div>

            <!-- Decorative element on hover -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-vintage-primary via-vintage-accent to-vintage-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg"
            ></div>
          </div>
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
                      <h3 class="text-xl font-heading font-bold text-vintage-primary mb-2">
                        Address
                      </h3>
                      <p class="text-vintage-text font-body">
                        123 Fort Street
                        <br />
                        Galle Fort, Galle 80000
                        <br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div class="flex items-start gap-4">
                    <i class="pi pi-clock text-3xl text-vintage-primary mt-1"></i>
                    <div class="flex-1">
                      <h3 class="text-xl font-heading font-bold text-vintage-primary mb-2">
                        Opening Hours
                      </h3>
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
                      <h3 class="text-xl font-heading font-bold text-vintage-primary mb-2">
                        Contact
                      </h3>
                      <p class="text-vintage-text font-body">
                        <a
                          href="tel:+94912224567"
                          class="hover:text-vintage-primary transition-colors"
                        >
                          +94 91 222 4567
                        </a>
                        <br />
                        <a
                          href="mailto:hello@flourdude.lk"
                          class="hover:text-vintage-primary transition-colors"
                        >
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
                style="border: 0; min-height: 400px"
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
    <section id="contact" class="contact-section py-20 px-4 bg-white relative overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute inset-0 vintage-pattern"></div>
      </div>

      <div class="container mx-auto max-w-4xl relative z-10">
        <div class="text-center mb-12 fade-in">
          <div class="inline-block mb-4">
            <div class="flex items-center gap-3">
              <div class="h-px w-12 bg-vintage-accent"></div>
              <i class="pi pi-envelope text-3xl text-vintage-accent"></i>
              <div class="h-px w-12 bg-vintage-accent"></div>
            </div>
          </div>
          <h2 class="text-5xl font-heading font-bold text-vintage-primary mb-4">Get In Touch</h2>
          <p class="text-lg font-body text-vintage-text max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you! Drop us a message and we'll get
            back to you soon.
          </p>
        </div>

        <!-- Contact Form -->
        <div class="fade-in">
          <div
            class="bg-gradient-to-br from-vintage-bg/10 to-transparent border-2 border-vintage-accent/30 rounded-lg p-8 backdrop-blur-sm"
          >
            <form @submit.prevent="submitContact" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex flex-column gap-3 contact-form-label">
                  <label
                    for="name"
                    class="font-heading font-semibold text-vintage-primary flex items-center gap-2"
                  >
                    <i class="pi pi-user text-sm"></i>
                    Name *
                  </label>
                  <InputText
                    id="name"
                    v-model="contactForm.name"
                    required
                    placeholder="Your name"
                    class="contact-input"
                  />
                </div>
                <div class="flex flex-column gap-3 contact-form-label">
                  <label
                    for="email"
                    class="font-heading font-semibold text-vintage-primary flex items-center gap-2"
                  >
                    <i class="pi pi-envelope text-sm"></i>
                    Email *
                  </label>
                  <InputText
                    id="email"
                    v-model="contactForm.email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    class="contact-input"
                  />
                </div>
              </div>

              <div class="flex flex-column gap-3 contact-form-label">
                <label
                  for="phone"
                  class="font-heading font-semibold text-vintage-primary flex items-center gap-2"
                >
                  <i class="pi pi-phone text-sm"></i>
                  Phone
                </label>
                <InputText
                  id="phone"
                  v-model="contactForm.phone"
                  placeholder="+94 XX XXX XXXX"
                  class="contact-input"
                />
              </div>

              <div class="flex flex-column gap-3 contact-form-label">
                <label
                  for="subject"
                  class="font-heading font-semibold text-vintage-primary flex items-center gap-2"
                >
                  <i class="pi pi-question text-sm"></i>
                  Subject *
                </label>
                <InputText
                  id="subject"
                  v-model="contactForm.subject"
                  required
                  placeholder="What's this about?"
                  class="contact-input"
                />
              </div>

              <div class="flex flex-column gap-3 contact-form-label">
                <label
                  for="message"
                  class="font-heading font-semibold text-vintage-primary flex items-center gap-2"
                >
                  <i class="pi pi-comments text-sm"></i>
                  Message *
                </label>
                <Textarea
                  id="message"
                  v-model="contactForm.message"
                  required
                  rows="5"
                  placeholder="Tell us more..."
                  class="contact-input"
                />
              </div>

              <Button
                type="submit"
                label="Send Message"
                icon="pi pi-send"
                class="w-full p-button-lg bg-vintage-primary"
                :loading="contactSubmitting"
              />
            </form>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="mt-16 fade-in">
          <div class="text-center mb-8">
            <i class="pi pi-bell text-4xl text-vintage-accent mb-3 block"></i>
            <h3 class="text-3xl font-heading font-bold text-vintage-primary mb-2">Stay Updated</h3>
            <p class="text-vintage-text font-body">
              Subscribe to our newsletter for special offers and coffee news
            </p>
          </div>

          <form @submit.prevent="subscribeNewsletter" class="flex gap-3 max-w-xl mx-auto">
            <InputText
              v-model="newsletterEmail"
              type="email"
              required
              placeholder="Enter your email"
              class="flex-1 contact-input"
            />
            <Button
              type="submit"
              label="Subscribe"
              icon="pi pi-check"
              :loading="newsletterSubmitting"
              class="p-button-lg"
            />
          </form>
        </div>
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
              Brewing excellence, baking happiness. Your neighborhood artisanal coffee shop in
              Galle.
            </p>
          </div>

          <div>
            <h4 class="text-xl font-heading font-bold mb-4 text-vintage-accent">Quick Links</h4>
            <ul class="space-y-2 font-body">
              <li><a href="#home" class="hover:text-vintage-accent transition-colors">Home</a></li>
              <li>
                <a href="#story" class="hover:text-vintage-accent transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#products" class="hover:text-vintage-accent transition-colors">Menu</a>
              </li>
              <li>
                <a href="#gallery" class="hover:text-vintage-accent transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#location" class="hover:text-vintage-accent transition-colors">Visit Us</a>
              </li>
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
                <InputText v-model="newsletterEmail" placeholder="Your email" class="flex-1" />
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
          <p>
            &copy; {{ new Date().getFullYear() }} Flour Dude. All rights reserved. Made with ❤️ in
            Galle.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { categoryService, productService } from '@/services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tooltip from 'primevue/tooltip';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

// PrimeVue Components
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';

gsap.registerPlugin(ScrollTrigger);

const toast = useToast();
const vTooltip = Tooltip; // Register tooltip directive locally

// Products & Categories
const INITIAL_PRODUCTS_LIMIT = 6;
const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref(null);
const showAllProducts = ref(false);

// Contact Form
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});
const contactSubmitting = ref(false);

// Newsletter
const newsletterEmail = ref('');
const newsletterSubmitting = ref(false);

// Gallery
const galleryDialogVisible = ref(false);
const currentGalleryIndex = ref(0);
const isFullscreen = ref(false);
const galleryLoading = ref(true);
const galleryImagesLoaded = ref(false);
const selectedGalleryFilter = ref('All');
const galleryFilters = ref(['All', 'Coffee', 'Food', 'Ambiance', 'Process']);

const galleryImages = ref([
  {
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800',
    caption: 'Fresh Coffee Brewing',
    category: 'Coffee',
    height: 'tall',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
    caption: 'Artisanal Coffee Art',
    category: 'Coffee',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
    caption: 'Cozy Vintage Ambiance',
    category: 'Ambiance',
    height: 'short',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800',
    caption: 'Coffee Making Process',
    category: 'Process',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800',
    caption: 'Delicious Brownies',
    category: 'Food',
    height: 'tall',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800',
    caption: 'Fresh Pastries',
    category: 'Food',
    height: 'short',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800',
    caption: 'Our Vintage Interior',
    category: 'Ambiance',
    height: 'tall',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800',
    caption: 'Coffee Beans Selection',
    category: 'Process',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
    caption: 'Premium Coffee Blends',
    category: 'Coffee',
    height: 'short',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800',
    caption: 'Gourmet Cakes',
    category: 'Food',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?q=80&w=800',
    caption: 'Latte Art Mastery',
    category: 'Coffee',
    height: 'short',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
    caption: 'Coffee Shop Counter',
    category: 'Ambiance',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=800',
    caption: 'Espresso Machine Detail',
    category: 'Process',
    height: 'tall',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800',
    caption: 'Chocolate Chip Cookies',
    category: 'Food',
    height: 'short',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800',
    caption: 'Coffee Pour Perfection',
    category: 'Process',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800',
    caption: 'Cozy Reading Corner',
    category: 'Ambiance',
    height: 'tall',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800',
    caption: 'Cappuccino Delight',
    category: 'Coffee',
    height: 'medium',
    loaded: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=800',
    caption: 'Artisan Bread & Pastries',
    category: 'Food',
    height: 'short',
    loaded: false,
  },
]);

// Testimonials
const testimonials = ref([
  {
    id: 1,
    name: 'Samantha Wijesinghe',
    role: 'Regular Customer',
    text: 'The best coffee in Galle! The vintage ambiance and friendly staff make every visit special.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Anderson',
    role: 'Tourist from UK',
    text: 'Stumbled upon this gem while exploring Galle Fort. The brownies are to die for!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dilini Fernando',
    role: 'Local Food Blogger',
    text: 'Flour Dude perfectly captures the essence of artisanal coffee culture. A must-visit!',
    rating: 5,
  },
]);

// Computed
const categoryOptions = computed(() => {
  return [{ id: null, name: 'All Categories' }, ...categories.value];
});

const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.category_id === selectedCategory.value);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
    );
  }

  return filtered;
});

const displayedProducts = computed(() => {
  if (showAllProducts.value || searchQuery.value.trim() || selectedCategory.value) {
    return filteredProducts.value;
  }
  return filteredProducts.value.slice(0, INITIAL_PRODUCTS_LIMIT);
});

const hasMoreProducts = computed(() => {
  return (
    filteredProducts.value.length > INITIAL_PRODUCTS_LIMIT &&
    !showAllProducts.value &&
    !searchQuery.value.trim() &&
    !selectedCategory.value
  );
});

const filteredGalleryImages = computed(() => {
  if (selectedGalleryFilter.value === 'All') {
    return galleryImages.value;
  }
  return galleryImages.value.filter((img) => img.category === selectedGalleryFilter.value);
});

// Methods
const fetchData = async () => {
  try {
    loading.value = true;
    const [productsData, categoriesData] = await Promise.all([
      productService.getAll(),
      categoryService.getAll(),
    ]);
    products.value = productsData;
    categories.value = categoriesData;
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load products. Using demo data.',
      life: 3000,
    });
    // Fallback demo data
    loadDemoData();
  } finally {
    loading.value = false;
  }
};

const loadDemoData = () => {
  categories.value = [
    { id: 1, name: 'Coffee' },
    { id: 2, name: 'Brownies' },
    { id: 3, name: 'Pastries' },
    { id: 4, name: 'Desserts' },
  ];

  products.value = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and bold espresso shot, crafted from premium beans',
      price: 350,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800',
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Perfectly balanced espresso with steamed milk and foam',
      price: 450,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800',
    },
    {
      id: 3,
      name: 'Latte',
      description: 'Smooth and creamy latte with beautiful art',
      price: 500,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800',
    },
    {
      id: 4,
      name: 'Dark Chocolate Brownie',
      description: 'Decadent double chocolate brownie with walnuts',
      price: 400,
      category_id: 2,
      image_url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?q=80&w=800',
    },
    {
      id: 5,
      name: 'Salted Caramel Brownie',
      description: 'Rich brownie with salted caramel swirls',
      price: 450,
      category_id: 2,
      image_url: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800',
    },
    {
      id: 6,
      name: 'Croissant',
      description: 'Buttery, flaky French croissant, baked fresh daily',
      price: 300,
      category_id: 3,
      image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800',
    },
    {
      id: 7,
      name: 'Cinnamon Roll',
      description: 'Warm cinnamon roll with cream cheese frosting',
      price: 350,
      category_id: 3,
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800',
    },
    {
      id: 8,
      name: 'Tiramisu',
      description: 'Classic Italian tiramisu with mascarpone',
      price: 600,
      category_id: 4,
      image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800',
    },
    {
      id: 9,
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake',
      price: 550,
      category_id: 4,
      image_url: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800',
    },
  ];
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : 'Unknown';
};

const getMenuItemHeight = (index) => {
  const heights = ['short', 'medium', 'tall', 'medium', 'tall', 'short'];
  return heights[index % heights.length];
};

const toggleFavorite = (productId) => {
  toast.add({
    severity: 'success',
    summary: 'Added to Favorites',
    detail: 'Product added to your favorites!',
    life: 2000,
  });
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const showGalleryImage = (index) => {
  currentGalleryIndex.value = index;
  galleryDialogVisible.value = true;
};

const nextGalleryImage = () => {
  if (currentGalleryIndex.value < filteredGalleryImages.value.length - 1) {
    currentGalleryIndex.value++;
  }
};

const previousGalleryImage = () => {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--;
  }
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

const onImageLoad = (index) => {
  galleryImages.value[index].loaded = true;

  // Check if all images are loaded
  const allLoaded = galleryImages.value.every((img) => img.loaded);
  if (allLoaded) {
    galleryImagesLoaded.value = true;
  }
};

const downloadImage = (image) => {
  const link = document.createElement('a');
  link.href = image.url;
  link.download = image.caption.replace(/\s+/g, '-').toLowerCase() + '.jpg';
  link.click();

  toast.add({
    severity: 'success',
    summary: 'Download Started',
    detail: 'Image download has started',
    life: 2000,
  });
};

const submitContact = async () => {
  contactSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Message Sent!',
      detail: "Thank you for contacting us. We'll get back to you soon!",
      life: 4000,
    });

    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };

    contactSubmitting.value = false;
  }, 1500);
};

const subscribeNewsletter = () => {
  if (!newsletterEmail.value) return;

  newsletterSubmitting.value = true;

  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Subscribed!',
      detail: "You've been added to our newsletter!",
      life: 3000,
    });
    newsletterEmail.value = '';
    newsletterSubmitting.value = false;
  }, 1000);
};

const initAnimations = () => {
  // Animate elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      },
    );
  });

  // Hero title animation
  gsap.fromTo(
    '.hero-title',
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
    },
  );
};

// Lifecycle
onMounted(() => {
  fetchData();
  setTimeout(() => {
    initAnimations();
  }, 100);

  // Simulate gallery loading
  setTimeout(() => {
    galleryLoading.value = false;
  }, 800);
});
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

/* Vintage Background Pattern */
.vintage-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
}

/* Masonry Gallery Styles */
.masonry-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: 110px;
  gap: 0.875rem;
}

/* Masonry Menu Styles */
.masonry-menu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.menu-item {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 3px solid transparent;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.15);
}

.menu-item:hover {
  border-color: var(--vintage-accent);
  box-shadow: 0 25px 50px rgba(139, 69, 19, 0.3);
  transform: translateY(-5px);
  z-index: 10;
}

.menu-overlay {
  backdrop-filter: blur(2px);
}

.gallery-item {
  position: relative;
  border: 3px solid transparent;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.gallery-item.short {
  grid-row: span 2;
}

.gallery-item.medium {
  grid-row: span 3;
}

.gallery-item.tall {
  grid-row: span 4;
}

.gallery-item:hover {
  border-color: var(--vintage-accent);
  box-shadow: 0 25px 50px rgba(139, 69, 19, 0.3);
  transform: translateY(-5px);
  z-index: 10;
}

.gallery-overlay {
  backdrop-filter: blur(2px);
}

.skeleton-loader {
  position: relative;
  overflow: hidden;
}

.contact-form-label {
  flex-direction: column;
}
.skeleton-loader::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  to {
    left: 100%;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.masonry-loaded .gallery-item {
  animation-play-state: running;
}

/* Gallery Dialog Enhancements */
.gallery-dialog :deep(.p-dialog) {
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
  border: 2px solid var(--vintage-accent);
}

.gallery-fullscreen :deep(.p-dialog) {
  border-radius: 0;
  max-height: 100vh !important;
  margin: 0 !important;
}

.gallery-lightbox-image {
  animation: zoomIn 0.4s ease-out;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.gallery-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(139, 69, 19, 0.9) !important;
  border: 2px solid var(--vintage-bg);
  z-index: 10;
}

.gallery-nav-btn:hover:not(:disabled) {
  background: var(--vintage-primary) !important;
  transform: translateY(-50%) scale(1.1);
}

.gallery-nav-left {
  left: 20px;
}

.gallery-nav-right {
  right: 20px;
}

/* Vintage Filter Buttons */
.vintage-filter-btn {
  transition: all 0.3s ease;
  border: 2px solid var(--vintage-accent);
}

.vintage-filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

.testimonial-card {
  background: var(--vintage-bg);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(139, 69, 19, 0.2);
  border-color: var(--vintage-accent);
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

/* Contact Section Styles */
.contact-input {
  border: 2px solid var(--vintage-accent) !important;
  border-radius: 0.5rem !important;
  padding: 0.75rem 1rem !important;
  transition: all 0.3s ease;
}

.contact-input:focus {
  border-color: var(--vintage-primary) !important;
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1) !important;
}

.contact-info-card {
  background: white;
}

.contact-info-card i {
  transition: all 0.3s ease;
}

.contact-info-card:hover i {
  transform: scale(1.1);
  color: var(--vintage-primary);
}

/* Search Input Icon Fix */
.p-input-icon-left {
  display: inline-flex !important;
  width: 100%;
}

.p-input-icon-left > i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.p-input-icon-left > input {
  padding-left: 2.5rem !important;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }

  .masonry-menu {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .masonry-gallery {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 80px;
    gap: 0.5rem;
  }

  .gallery-item.short,
  .gallery-item.medium,
  .gallery-item.tall {
    grid-row: span 1 !important;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .masonry-menu {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .masonry-gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 120px;
    gap: 0.75rem;
  }

  .gallery-item.short,
  .gallery-item.medium,
  .gallery-item.tall {
    grid-row: span 1 !important;
  }

  .gallery-nav-btn {
    display: none;
  }

  .gallery-dialog :deep(.p-dialog) {
    width: 95vw !important;
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .masonry-menu {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .masonry-gallery {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    gap: 1rem;
  }

  .gallery-item.short,
  .gallery-item.medium,
  .gallery-item.tall {
    grid-row: span 1 !important;
  }
}

@media (min-width: 1024px) {
  .masonry-gallery {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .masonry-menu {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }
}
</style>
