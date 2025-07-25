<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-4 flex flex-col">
      <div class="mb-8 flex items-center space-x-2">
        <Home class="h-7 w-7 text-orange-600" />
        <h2 class="text-2xl font-bold text-orange-600">Zozo Booking</h2>
      </div>
      <nav class="flex-1 space-y-2">
        <NuxtLink to="/admin" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <LayoutGrid class="mr-3 h-5 w-5" />
            Dashboard
          </button>
        </NuxtLink>
        <NuxtLink to="/admin/qr-tables" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin/qr-tables' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <QrCode class="mr-3 h-5 w-5" />
            QR Tables
          </button>
        </NuxtLink>

        <!-- Restaurants Section with Sub-navigation -->
        <ClientOnly>
          <div class="w-full">
            <button
              @click="toggleRestaurants"
              :class="[
                'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
                'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                isRestaurantsOpen || $route.path.startsWith('/admin/restaurants') ? 'bg-orange-50 text-orange-600' : ''
              ]"
            >
              <Utensils class="mr-3 h-5 w-5" />
              Restaurants
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isRestaurantsOpen }]" />
            </button>
            <div v-if="isRestaurantsOpen" class="ml-6 space-y-1 mt-1">
              <NuxtLink to="/admin/restaurants" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === '/admin/restaurants' ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <List class="mr-3 h-4 w-4" />
                  All Restaurants
                </button>
              </NuxtLink>
            </div>
          </div>
        </ClientOnly>

        <NuxtLink to="/admin/categories" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin/categories' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <LayoutGrid class="mr-3 h-5 w-5" />
            Categories
          </button>
        </NuxtLink>
        <NuxtLink to="/admin/menu-items" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin/menu-items' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <List class="mr-3 h-5 w-5" />
            Menu Items
          </button>
        </NuxtLink>
        <NuxtLink to="/admin/item-options" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin/item-options' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <Option class="mr-3 h-5 w-5" />
            Item Options
          </button>
        </NuxtLink>

        <!-- Pasta Paradise Section with Sub-navigation -->
        <ClientOnly>
          <div class="w-full">
            <button
              @click="togglePastaParadise"
              :class="[
                'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
                'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                isPastaParadiseOpen || $route.path.startsWith('/admin/restaurants/pasta-paradise') ? 'bg-orange-50 text-orange-600' : ''
              ]"
            >
              <Pizza class="mr-3 h-5 w-5" />
              Pasta Paradise
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isPastaParadiseOpen }]" />
            </button>
            <div v-if="isPastaParadiseOpen" class="ml-6 space-y-1 mt-1">
              <NuxtLink to="/admin/restaurants/pasta-paradise" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === '/admin/restaurants/pasta-paradise' ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <LayoutDashboard class="mr-3 h-4 w-4" />
                  Overview
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/restaurants/pasta-paradise/orders" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === '/admin/restaurants/pasta-paradise/orders' ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <ListOrdered class="mr-3 h-4 w-4" />
                  Orders
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/restaurants/pasta-paradise/tables" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === '/admin/restaurants/pasta-paradise/tables' ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <LayoutGrid class="mr-3 h-4 w-4" />
                  List Tables
                </button>
              </NuxtLink>
              <NuxtLink to="/admin/restaurants/pasta-paradise/menu-builder" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === '/admin/restaurants/pasta-paradise/menu-builder' ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <Book class="mr-3 h-4 w-4" />
                  Menu Builder
                </button>
              </NuxtLink>
            </div>
          </div>
        </ClientOnly>

        <NuxtLink to="/admin/bookings" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin/bookings' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <CalendarCheck class="mr-3 h-5 w-5" />
            Bookings
          </button>
        </NuxtLink>
        <NuxtLink to="/admin/users" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === '/admin/users' ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <Users class="mr-3 h-5 w-5" />
            Users
          </button>
        </NuxtLink>
      </nav>
      <div class="mt-auto space-y-2 border-t pt-4">
        <!-- Pasta Paradise Dropdown (Placeholder) -->
        <button
          class="w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Pizza class="mr-3 h-5 w-5" />
          Pasta Paradise
          <ChevronRight class="ml-auto h-4 w-4 rotate-90" />
        </button>

        <!-- USD Currency Selector (Placeholder) -->
        <button
          class="w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200"
        >
          <DollarSign class="mr-3 h-5 w-5" />
          USD
          <ChevronRight class="ml-auto h-4 w-4 rotate-90" />
        </button>

        <!-- Login Button -->
        <button
          class="w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200"
        >
          <LogIn class="mr-3 h-5 w-5" />
          Login
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Home,
  Utensils,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
  QrCode,
  LayoutGrid,
  List,
  Pizza,
  Option,
  ChevronRight,
  LayoutDashboard, // Added for Pasta Paradise Overview
  ListOrdered,     // Added for Pasta Paradise Orders
  Book,            // Added for Pasta Paradise Menu Builder
  DollarSign,      // Added for USD
  LogIn            // Added for Login
} from 'lucide-vue-next'

const route = useRoute()
const isRestaurantsOpen = ref(false)
const isPastaParadiseOpen = ref(false) // New ref for Pasta Paradise collapsible

const toggleRestaurants = () => {
  isRestaurantsOpen.value = !isRestaurantsOpen.value
}

const togglePastaParadise = () => { // New toggle function
  isPastaParadiseOpen.value = !isPastaParadiseOpen.value
}

// Ensure this hook is called at the top level
// This will only run on the client after hydration, so the initial server render won't have this state.
// The ClientOnly wrapper handles the mismatch.
const isClient = process.client
const isRestaurantsPath = route.path.startsWith('/admin/restaurants') && route.path !== '/admin/restaurants'
const isPastaParadisePath = route.path.startsWith('/admin/restaurants/pasta-paradise')

if (isClient) {
  if (isRestaurantsPath) {
    isRestaurantsOpen.value = true
  }
  if (isPastaParadisePath) {
    isPastaParadiseOpen.value = true
  }
}
</script>
