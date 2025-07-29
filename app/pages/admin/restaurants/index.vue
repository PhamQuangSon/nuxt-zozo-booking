<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Restaurants</h1>
      <button class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center">
        <PlusCircle class="mr-2 h-4 w-4" /> Add New Restaurant
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">Restaurant List</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings Today</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="restaurant in restaurants" :key="restaurant.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ restaurant.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ restaurant.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    restaurant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ restaurant.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ restaurant.bookingsToday }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink :to="`/admin/restaurants/${restaurant.id}`">
                  <button class="text-gray-600 hover:text-gray-900 mr-2 p-2 rounded-md hover:bg-gray-100">
                    <Eye class="h-4 w-4" />
                  </button>
                </NuxtLink>
                <button class="text-orange-600 hover:text-orange-900 p-2 rounded-md hover:bg-orange-50">
                  <Edit class="h-4 w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const restaurants = ref([
  { id: "pasta-paradise", name: "Pasta Paradise", location: "City Center", status: "Active", bookingsToday: 15 },
  { id: "sushi-symphony", name: "Sushi Symphony", location: "Downtown", status: "Active", bookingsToday: 10 },
  { id: "burger-bliss", name: "Burger Bliss", location: "Suburbia", status: "Inactive", bookingsToday: 0 },
])
</script>
