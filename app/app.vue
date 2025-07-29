<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

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

useSeoMeta({
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
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