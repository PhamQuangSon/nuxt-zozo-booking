<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ restaurantName }} {{ $t('admin.title') }}</h1>
      <NuxtLink :to="localePath('/admin/restaurants')">
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center">
          <ArrowLeft class="mr-2 h-4 w-4" /> {{ $t('navigation.backToRestaurants') }}
        </button>
      </NuxtLink>
    </div>

    <!-- Sub-navigation for the specific restaurant -->
    <nav class="flex space-x-4 border-b pb-4 mb-6 overflow-x-auto">
      <NuxtLink :to="localePath(`/admin/restaurants/${restaurantId}`)">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200',
            isActiveRoute(`/admin/restaurants/${restaurantId}`) ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
          ]"
        >
          <LayoutDashboard class="mr-2 h-4 w-4 inline-block" /> {{ $t('admin.overview') }}
        </button>
      </NuxtLink>
      <NuxtLink :to="localePath(`/admin/restaurants/${restaurantId}/orders`)">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200',
            isActiveRoute(`/admin/restaurants/${restaurantId}/orders`) ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
          ]"
        >
          <ListOrdered class="mr-2 h-4 w-4 inline-block" /> {{ $t('admin.orders') }}
        </button>
      </NuxtLink>
      <NuxtLink :to="localePath(`/admin/restaurants/${restaurantId}/tables`)">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200',
            isActiveRoute(`/admin/restaurants/${restaurantId}/tables`) ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
          ]"
        >
          <Table class="mr-2 h-4 w-4 inline-block" /> {{ $t('admin.listTables') }}
        </button>
      </NuxtLink>
      <NuxtLink :to="localePath(`/admin/restaurants/${restaurantId}/menu-builder`)">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200',
            isActiveRoute(`/admin/restaurants/${restaurantId}/menu-builder`) ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
          ]"
        >
          <UtensilsCrossed class="mr-2 h-4 w-4 inline-block" /> {{ $t('admin.menuBuilder') }}
        </button>
      </NuxtLink>
    </nav>

    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNuxtApp } from '#app'
import { definePageMeta } from '#imports'

const { t } = useI18n()
const nuxtApp = useNuxtApp()
const route = useRoute()

// Use the proper i18n composables
const localePath = nuxtApp.$localePath

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const restaurantId = computed(() => route.params.id)

const restaurantName = computed(() => {
  if (!restaurantId.value) return ''
  return restaurantId.value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
})

// Helper function to check if a route is active
const isActiveRoute = (targetPath) => {
  const currentPath = route.path
  const localizedPath = localePath(targetPath)
  
  // Check exact match first
  if (currentPath === localizedPath) {
    return true
  }
  
  // For the overview route, also check if we're at the base restaurant path
  if (targetPath.endsWith(`/admin/restaurants/${restaurantId.value}`) && 
      currentPath === localePath(`/admin/restaurants/${restaurantId.value}`)) {
    return true
  }
  
  return false
}
</script>
