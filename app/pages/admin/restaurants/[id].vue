<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ restaurantName }} Admin</h1>
      <NuxtLink to="/admin/restaurants">
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center">
          <ArrowLeft class="mr-2 h-4 w-4" /> Back to Restaurants
        </button>
      </NuxtLink>
    </div>

    <!-- Sub-navigation for the specific restaurant -->
    <nav class="flex space-x-4 border-b pb-4 mb-6 overflow-x-auto">
      <NuxtLink :to="`/admin/restaurants/${restaurantId}`">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100',
            $route.path === `/admin/restaurants/${restaurantId}` ? 'bg-gray-100 text-orange-600' : 'text-gray-700'
          ]"
        >
          <LayoutDashboard class="mr-2 h-4 w-4 inline-block" /> Overview
        </button>
      </NuxtLink>
      <NuxtLink :to="`/admin/restaurants/${restaurantId}/orders`">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100',
            $route.path === `/admin/restaurants/${restaurantId}/orders` ? 'bg-gray-100 text-orange-600' : 'text-gray-700'
          ]"
        >
          <ListOrdered class="mr-2 h-4 w-4 inline-block" /> Orders
        </button>
      </NuxtLink>
      <NuxtLink :to="`/admin/restaurants/${restaurantId}/tables`">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100',
            $route.path === `/admin/restaurants/${restaurantId}/tables` ? 'bg-gray-100 text-orange-600' : 'text-gray-700'
          ]"
        >
          <Table class="mr-2 h-4 w-4 inline-block" /> Tables
        </button>
      </NuxtLink>
      <NuxtLink :to="`/admin/restaurants/${restaurantId}/menu-builder`">
        <button
          :class="[
            'text-base px-4 py-2 rounded-md hover:bg-gray-100',
            $route.path === `/admin/restaurants/${restaurantId}/menu-builder` ? 'bg-gray-100 text-orange-600' : 'text-gray-700'
          ]"
        >
          <UtensilsCrossed class="mr-2 h-4 w-4 inline-block" /> Menu Builder
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
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const route = useRoute()
const restaurantId = computed(() => route.params.id)

const restaurantName = computed(() => {
  if (!restaurantId.value) return ''
  return restaurantId.value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
})
</script>
