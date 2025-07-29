<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold text-gray-900">Overview</h2>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-gray-700">Restaurant Revenue</h3>
          <DollarSign class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">${{ restaurantStats.totalRevenue.toFixed(2) }}</div>
          <p class="text-xs text-gray-500">+15% this month</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-gray-700">New Bookings</h3>
          <CalendarCheck class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">{{ restaurantStats.newBookings }}</div>
          <p class="text-xs text-gray-500">Today</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-gray-700">Active Tables</h3>
          <Users class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">{{ restaurantStats.activeTables }}</div>
          <p class="text-xs text-gray-500">Currently occupied</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-gray-700">Menu Items</h3>
          <Utensils class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">{{ restaurantStats.menuItems }}</div>
          <p class="text-xs text-gray-500">Total items on menu</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">Recent Orders</h3>
      <div class="text-center text-gray-500 py-8">
        <p>Recent orders for this restaurant will be displayed here.</p>
        <!-- <img
          src="/placeholder.svg?height=150&width=300&text=Recent Orders"
          alt="Recent Orders Placeholder"
          class="mx-auto mt-4"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const restaurantStats = ref({
  totalRevenue: 12345.67,
  newBookings: 50,
  activeTables: 10,
  menuItems: 75,
})
</script>
