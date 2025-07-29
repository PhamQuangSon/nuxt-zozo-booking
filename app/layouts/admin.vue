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
        <!-- Pasta Paradise Dropdown -->
        <ClientOnly>
          <div class="relative w-full">
            <button
              @click="toggleRestaurantSelector"
              :class="[
                'w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                isRestaurantSelectorOpen || $route.path.startsWith('/admin/restaurants/pasta-paradise') ? 'bg-orange-50 text-white' : ''
              ]"
            >
              <Pizza :class="['mr-3 h-5 w-5', $route.path.startsWith('/admin/restaurants/pasta-paradise') ? 'text-white' : 'text-gray-700']" />
              <span :class="[$route.path.startsWith('/admin/restaurants/pasta-paradise') ? 'text-white' : 'text-gray-700']">
                {{ selectedRestaurantName }}
              </span>
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isRestaurantSelectorOpen }, $route.path.startsWith('/admin/restaurants/pasta-paradise') ? 'text-white' : 'text-gray-700']" />
            </button>
            <div v-if="isRestaurantSelectorOpen" class="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 mb-2">
              <button
                @click="selectRestaurant('pasta-paradise')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Pizza class="mr-3 h-5 w-5 text-gray-700" />
                Pasta Paradise
              </button>
              <!-- Add more restaurants here dynamically if needed -->
            </div>
          </div>
        </ClientOnly>

        <!-- USD Currency Selector -->
        <ClientOnly>
          <div class="relative w-full">
            <button
              @click="toggleCurrencySelector"
              class="w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200"
            >
              <DollarSign class="mr-3 h-5 w-5" />
              {{ selectedCurrency }}
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isCurrencySelectorOpen }]" />
            </button>
            <div v-if="isCurrencySelectorOpen" class="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 mb-2">
              <button
                @click="selectCurrency('USD')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                USD
              </button>
              <button
                @click="selectCurrency('EUR')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                EUR
              </button>
              <button
                @click="selectCurrency('GBP')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                GBP
              </button>
            </div>
          </div>
        </ClientOnly>

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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isRestaurantsOpen = ref(false)
const isPastaParadiseOpen = ref(false)
const isRestaurantSelectorOpen = ref(false) // New ref for footer restaurant selector
const isCurrencySelectorOpen = ref(false)   // New ref for footer currency selector
const selectedCurrency = ref('USD')         // Default currency

const toggleRestaurants = () => {
  isRestaurantsOpen.value = !isRestaurantsOpen.value
}

const togglePastaParadise = () => {
  isPastaParadiseOpen.value = !isPastaParadiseOpen.value
}

const toggleRestaurantSelector = () => {
  isRestaurantSelectorOpen.value = !isRestaurantSelectorOpen.value
  if (isRestaurantSelectorOpen.value) {
    isCurrencySelectorOpen.value = false // Close other dropdown
  }
}

const toggleCurrencySelector = () => {
  isCurrencySelectorOpen.value = !isCurrencySelectorOpen.value
  if (isCurrencySelectorOpen.value) {
    isRestaurantSelectorOpen.value = false // Close other dropdown
  }
}

const selectRestaurant = (id) => {
  // In a real app, you might update a global state or navigate
  // For now, we'll just navigate to the overview page of the selected restaurant
  router.push(`/admin/restaurants/${id}`)
  isRestaurantSelectorOpen.value = false
}

const selectCurrency = (currency) => {
  selectedCurrency.value = currency
  isCurrencySelectorOpen.value = false
}

// Computed property to display the selected restaurant name in the footer
const selectedRestaurantName = computed(() => {
  const currentRestaurantId = route.params.id
  if (currentRestaurantId) {
    // Simple capitalization for display, assuming ID is kebab-case
    return String(currentRestaurantId)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  return 'Select Restaurant' // Default text if no restaurant is selected/active
})

// Ensure collapsible sections open based on current route on client-side
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

<style scoped>
/* Add any specific styles if needed, though Tailwind should handle most */
</style>
