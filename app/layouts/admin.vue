<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-4 flex flex-col">
      <div class="mb-8 flex items-center space-x-2">
        <Home class="h-7 w-7 text-orange-600" />
        <h2 class="text-xl font-bold text-orange-600">{{ $t('admin.title') }}</h2>
      </div>
      <nav class="flex-1 space-y-2">
        <NuxtLink :to="localePath('/admin')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <LayoutGrid class="mr-3 h-5 w-5" />
            {{ $t('admin.dashboard') }}
          </button>
        </NuxtLink>
        <NuxtLink :to="localePath('/admin/qr-tables')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin/qr-tables') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <QrCode class="mr-3 h-5 w-5" />
            {{ $t('admin.qrTables') }}
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
                isRestaurantsOpen || $route.path.startsWith(localePath('/admin/restaurants')) ? 'bg-orange-50 text-orange-600' : ''
              ]"
            >
              <Utensils class="mr-3 h-5 w-5" />
              {{ $t('admin.restaurants') }}
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isRestaurantsOpen }]" />
            </button>
            <div v-if="isRestaurantsOpen" class="ml-6 space-y-1 mt-1">
              <NuxtLink :to="localePath('/admin/restaurants')" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === localePath('/admin/restaurants') ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <List class="mr-3 h-4 w-4" />
                  {{ $t('admin.allRestaurants') }}
                </button>
              </NuxtLink>
            </div>
          </div>
        </ClientOnly>

        <NuxtLink :to="localePath('/admin/categories')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin/categories') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <LayoutGrid class="mr-3 h-5 w-5" />
            {{ $t('admin.categories') }}
          </button>
        </NuxtLink>
        <NuxtLink :to="localePath('/admin/menu-items')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin/menu-items') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <List class="mr-3 h-5 w-5" />
            {{ $t('admin.menuItems') }}
          </button>
        </NuxtLink>
        <NuxtLink :to="localePath('/admin/item-options')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin/item-options') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <Option class="mr-3 h-5 w-5" />
            {{ $t('admin.itemOptions') }}
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
                isPastaParadiseOpen || $route.path.startsWith(localePath('/admin/restaurants/pasta-paradise')) ? 'bg-orange-50 text-orange-600' : ''
              ]"
            >
              <Pizza class="mr-3 h-5 w-5" />
              {{ $t('admin.pastaParadise') }}
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isPastaParadiseOpen }]" />
            </button>
            <div v-if="isPastaParadiseOpen" class="ml-6 space-y-1 mt-1">
              <NuxtLink :to="localePath('/admin/restaurants/pasta-paradise')" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === localePath('/admin/restaurants/pasta-paradise') ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <LayoutDashboard class="mr-3 h-4 w-4" />
                  {{ $t('admin.overview') }}
                </button>
              </NuxtLink>
              <NuxtLink :to="localePath('/admin/restaurants/pasta-paradise/orders')" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === localePath('/admin/restaurants/pasta-paradise/orders') ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <ListOrdered class="mr-3 h-4 w-4" />
                  {{ $t('admin.orders') }}
                </button>
              </NuxtLink>
              <NuxtLink :to="localePath('/admin/restaurants/pasta-paradise/tables')" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === localePath('/admin/restaurants/pasta-paradise/tables') ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <LayoutGrid class="mr-3 h-4 w-4" />
                  {{ $t('admin.listTables') }}
                </button>
              </NuxtLink>
              <NuxtLink :to="localePath('/admin/restaurants/pasta-paradise/menu-builder')" class="block">
                <button
                  :class="[
                    'w-full justify-start text-base text-gray-600 hover:bg-orange-50 hover:text-orange-600',
                    'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                    $route.path === localePath('/admin/restaurants/pasta-paradise/menu-builder') ? 'bg-orange-50 text-orange-600' : ''
                  ]"
                >
                  <Book class="mr-3 h-4 w-4" />
                  {{ $t('admin.menuBuilder') }}
                </button>
              </NuxtLink>
            </div>
          </div>
        </ClientOnly>

        <NuxtLink :to="localePath('/admin/bookings')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin/bookings') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <CalendarCheck class="mr-3 h-5 w-5" />
            {{ $t('admin.bookings') }}
          </button>
        </NuxtLink>
        <NuxtLink :to="localePath('/admin/users')" class="block">
          <button
            :class="[
              'w-full justify-start text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600',
              'flex items-center px-4 py-2 rounded-md transition-colors duration-200',
              $route.path === localePath('/admin/users') ? 'bg-orange-50 text-orange-600' : ''
            ]"
          >
            <Users class="mr-3 h-5 w-5" />
            {{ $t('admin.users') }}
          </button>
        </NuxtLink>
      </nav>
      
      <!-- Language Switcher -->
      <div class="mt-auto space-y-2 border-t pt-4">
        <div class="flex space-x-2 mb-4">
          <NuxtLink :to="switchLocalePath('en')" class="flex-1">
            <button
              :class="[
                'w-full px-3 py-1 text-sm rounded-md transition-colors duration-200',
                locale === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              EN
            </button>
          </NuxtLink>
          <NuxtLink :to="switchLocalePath('vi')" class="flex-1">
            <button
              :class="[
                'w-full px-3 py-1 text-sm rounded-md transition-colors duration-200',
                locale === 'vi' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              VI
            </button>
          </NuxtLink>
        </div>

        <!-- Pasta Paradise Dropdown -->
        <ClientOnly>
          <div class="relative w-full">
            <button
              @click="toggleRestaurantSelector"
              :class="[
                'w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200',
                isRestaurantSelectorOpen || $route.path.startsWith(localePath('/admin/restaurants/')) ? 'bg-orange-50 text-orange-600' : ''
              ]"
            >
              <Pizza class="mr-3 h-5 w-5" />
              <span>{{ selectedRestaurantName }}</span>
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isRestaurantSelectorOpen }]" />
            </button>
            <div v-if="isRestaurantSelectorOpen" class="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 mb-2">
              <button
                @click="selectRestaurant('pasta-paradise')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Pizza class="mr-3 h-5 w-5 text-gray-700" /> {{ $t('admin.pastaParadise') }}
              </button>
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
              {{ $t(`admin.currency.${selectedCurrency}`) }}
              <ChevronRight :class="['ml-auto h-4 w-4 transition-transform duration-200', { 'rotate-90': isCurrencySelectorOpen }]" />
            </button>
            <div v-if="isCurrencySelectorOpen" class="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 mb-2">
              <button
                @click="selectCurrency('USD')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {{ $t('admin.currency.USD') }}
              </button>
              <button
                @click="selectCurrency('EUR')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {{ $t('admin.currency.EUR') }}
              </button>
              <button
                @click="selectCurrency('GBP')"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {{ $t('admin.currency.GBP') }}
              </button>
            </div>
          </div>
        </ClientOnly>

        <!-- Login Button -->
        <button
          class="w-full justify-start text-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center px-4 py-2 rounded-md transition-colors duration-200"
        >
          <LogIn class="mr-3 h-5 w-5" />
          {{ $t('admin.login') }}
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
import { useI18n } from 'vue-i18n'
import { useNuxtApp } from '#app'

const { locale, t } = useI18n()
const nuxtApp = useNuxtApp()
const route = useRoute()
const router = useRouter()

// Use the proper i18n composables
const localePath = nuxtApp.$localePath
const switchLocalePath = nuxtApp.$switchLocalePath

const isRestaurantsOpen = ref(false)
const isPastaParadiseOpen = ref(false)
const isRestaurantSelectorOpen = ref(false)
const isCurrencySelectorOpen = ref(false)
const selectedCurrency = ref('USD')

const toggleRestaurants = () => {
  isRestaurantsOpen.value = !isRestaurantsOpen.value
}

const togglePastaParadise = () => {
  isPastaParadiseOpen.value = !isPastaParadiseOpen.value
}

const toggleRestaurantSelector = () => {
  isRestaurantSelectorOpen.value = !isRestaurantSelectorOpen.value
  if (isRestaurantSelectorOpen.value) {
    isCurrencySelectorOpen.value = false
  }
}

const toggleCurrencySelector = () => {
  isCurrencySelectorOpen.value = !isCurrencySelectorOpen.value
  if (isCurrencySelectorOpen.value) {
    isRestaurantSelectorOpen.value = false
  }
}

const selectRestaurant = (id) => {
  router.push(localePath(`/admin/restaurants/${id}`))
  isRestaurantSelectorOpen.value = false
}

const selectCurrency = (currency) => {
  selectedCurrency.value = currency
  isCurrencySelectorOpen.value = false
}

const selectedRestaurantName = computed(() => {
  const currentRestaurantId = route.params.id
  if (currentRestaurantId) {
    return String(currentRestaurantId)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  return t('admin.selectRestaurant')
})

// Auto-open collapsible sections based on current route
const isClient = process.client
const isRestaurantsPath = route.path.includes('/admin/restaurants') && !route.path.endsWith('/admin/restaurants')
const isPastaParadisePath = route.path.includes('/admin/restaurants/pasta-paradise')

if (isClient) {
  if (isRestaurantsPath) {
    isRestaurantsOpen.value = true
  }
  if (isPastaParadisePath) {
    isPastaParadiseOpen.value = true
  }
}
</script>
