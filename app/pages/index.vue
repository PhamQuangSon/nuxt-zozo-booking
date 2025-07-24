<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20"
    >
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              {{ $t("common.welcome") }}
            </h1>
            <p class="text-xl mb-8 max-w-md">
              Discover and order from the best restaurants in your area with our
              easy-to-use platform.
            </p>
            <div class="flex space-x-4">
              <NuxtLink
                to="/restaurants"
                class="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Browse Restaurants
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Learn More
              </NuxtLink>
            </div>
          </div>
          <div class="md:w-1/2">
            <img
              src="/bannerThumb1_1.png"
              alt="Restaurant food collage"
              class="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="relative flex flex-col">
      <div className="w-full overflow-hidden">
        <!-- Background Image -->
        <NuxtImg
          src="/banner-bg.jpg"
          alt="Banner"
          format="webp"
          :fill="true"
          priority
          fetchPriority="high"
          className="object-cover -z-10 absolute inset-0 w-full h-full"
        />
        <div className="container mx-auto py-16">
          <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-bold text-gray-700 mb-6 text-center">
              Welcome to Zozo Booking
            </h2>
            <p class="text-lg text-gray-700 text-center max-w-2xl mx-auto">
              Your one-stop solution for discovering and ordering from the best
              restaurants in your area. Enjoy a seamless dining experience with
              our easy-to-use platform.
            </p>
          </div>
          <!-- How It Works Section -->
          <section class="py-3">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold text-gray-700 mb-12 text-center">How It Works</h2>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="flex flex-col items-center text-center">
                  <div
                    class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-700 mb-2">Find a Restaurant</h3>
                  <p class="text-gray-600">
                    Browse our selection of restaurants and find your favorite
                    cuisine.
                  </p>
                </div>

                <div class="flex flex-col items-center text-center">
                  <div
                    class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-700 mb-2">Place Your Order</h3>
                  <p class="text-gray-600">
                    Select your favorite dishes and customize your order.
                  </p>
                </div>

                <div class="flex flex-col items-center text-center">
                  <div
                    class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-700 mb-2">Enjoy Your Meal</h3>
                  <p class="text-gray-600">
                    Sit back and enjoy your delicious meal at the restaurant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Featured Restaurants Section -->
          <section class="py-3">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold text-gray-700 mb-8 text-center">
                {{ $t("restaurant.featured") }}
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RestaurantCard
                  v-for="restaurant in featuredRestaurants"
                  :key="restaurant.id"
                  :restaurant="restaurant"
                />
              </div>

              <!-- <div class="text-center mt-12">
                <NuxtLink
                  to="/restaurants"
                  class="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
                >
                  {{ $t("restaurant.viewAll") }}
                </NuxtLink>
              </div> -->
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-700 mb-12 text-center">
          What Our Customers Say
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-md"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4"
              >
                <span class="text-lg font-bold">{{
                  testimonial.name.charAt(0)
                }}</span>
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    :class="{ 'text-gray-300': i > testimonial.rating }"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-600">{{ testimonial.comment }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-700 mb-4">Ready to Order?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who use Zozo Booking for their
          restaurant needs.
        </p>
        <NuxtLink
          to="/restaurants"
          class="px-8 py-4 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors inline-block"
        >
          Find Restaurants Near You
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Mock data for featured restaurants
const featuredRestaurants = ref([
  {
    id: 1,
    name: "Pasta Paradise",
    image: "/restaurant_1.png",
    cuisine: "Italian",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Sushi Sensation",
    image: "/restaurant_2.png",
    cuisine: "Japanese",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Burger Bliss",
    image: "/restaurant_3.png",
    cuisine: "American",
    rating: 4.5,
  },
]);

// Mock data for testimonials
const testimonials = ref([
  {
    name: "John D.",
    rating: 5,
    comment:
      "Zozo Booking made ordering so easy! The interface is intuitive and the service was excellent.",
  },
  {
    name: "Sarah M.",
    rating: 4,
    comment:
      "I love being able to browse menus and place orders directly from my table. Great experience!",
  },
  {
    name: "Michael T.",
    rating: 5,
    comment:
      "As a restaurant owner, this platform has streamlined our ordering process and improved customer satisfaction.",
  },
]);
</script>
