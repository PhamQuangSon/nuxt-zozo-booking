<template>
  <header class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="text-2xl font-bold text-primary">Zozo</span>
        <span class="text-2xl font-light">Booking</span>
      </NuxtLink>
      
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="text-gray-700 hover:text-primary transition-colors"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>
      
      <div class="flex items-center space-x-4">
        <CurrencySelector />
        <LanguageSelector />
        
        <div v-if="isLoggedIn" class="relative">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="flex items-center space-x-2 focus:outline-none"
          >
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span v-if="!user?.image" class="text-sm font-medium">{{ userInitials }}</span>
              <img v-else :src="user.image" alt="User" class="w-full h-full rounded-full" />
            </div>
            <span class="hidden md:inline text-sm">{{ user?.name || 'User' }}</span>
          </button>
          
          <div 
            v-if="isMenuOpen" 
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
          >
            <NuxtLink 
              to="/profile" 
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="isMenuOpen = false"
            >
              {{ $t('navigation.profile') }}
            </NuxtLink>
            <button 
              @click="logout" 
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {{ $t('navigation.logout') }}
            </button>
          </div>
        </div>
        
        <div v-else class="flex items-center space-x-2">
          <NuxtLink 
            to="/auth/login" 
            class="px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
          >
            {{ $t('navigation.login') }}
          </NuxtLink>
          <NuxtLink 
            to="/auth/register" 
            class="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            {{ $t('navigation.register') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
// import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
const user = computed(() => authStore.user)
const isMenuOpen = ref(false)

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

const navItems = [
  { path: '/', label: 'navigation.home' },
  { path: '/restaurants', label: 'navigation.restaurants' },
  { path: '/orders', label: 'navigation.orders' },
]

function logout() {
  authStore.logout()
  isMenuOpen.value = false
}
</script>