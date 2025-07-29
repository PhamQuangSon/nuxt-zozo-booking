<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">Bookings Management</h1>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">All Bookings</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in bookings" :key="booking.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ booking.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ booking.customer }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ booking.restaurant }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ booking.dateTime }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                  <Eye class="h-4 w-4" /> View
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
})

const bookings = ref([
  { id: "BKG001", customer: "John Doe", restaurant: "Sakura Japanese", dateTime: "2025-07-25 19:00", status: "Confirmed" },
  { id: "BKG002", customer: "Jane Smith", restaurant: "Italian Bistro", dateTime: "2025-07-25 18:30", status: "Confirmed" },
  { id: "BKG003", customer: "Alice Johnson", restaurant: "The Steakhouse", dateTime: "2025-07-24 20:00", status: "Pending" },
])
</script>
