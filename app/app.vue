<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from './stores/currency';
import { useCartStore } from './stores/cart';
import { useAuthStore } from './stores/auth';

// Set up the app metadata
useHead({
  title: 'Zozo Booking - Restaurant Ordering System',
  meta: [
    { name: 'description', content: 'Order delicious food from your favorite restaurants with Zozo Booking' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

// Initialize stores on app start
onMounted(() => {
  const currencyStore = useCurrencyStore()
  const authStore = useAuthStore()
  // const cartStore = useCartStore()
  
  // Load saved preferences
  // currencyStore.loadFromStorage()
  // cartStore.loadFromStorage()
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
}
</style>