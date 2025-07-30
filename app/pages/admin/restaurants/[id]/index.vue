<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold text-gray-900">{{ $t('admin.overview') }}</h2>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.restaurantRevenue') }}</h3>
          <DollarSign class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">${{ restaurantStats.totalRevenue.toFixed(2) }}</div>
          <p class="text-xs text-gray-500">{{ $t('admin.revenue.thisMonth', { percent: '15' }) }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.newBookings') }}</h3>
          <CalendarCheck class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">{{ restaurantStats.newBookings }}</div>
          <p class="text-xs text-gray-500">{{ $t('admin.timeframes.today') }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.activeTables') }}</h3>
          <Users class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">{{ restaurantStats.activeTables }}</div>
          <p class="text-xs text-gray-500">{{ $t('admin.currentlyOccupied') }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.menuItems') }}</h3>
          <Utensils class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">{{ restaurantStats.menuItems }}</div>
          <p class="text-xs text-gray-500">{{ $t('admin.totalItemsOnMenu') }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">{{ $t('orders.recentOrders') }}</h3>
      <div class="text-center text-gray-500 py-8">
        <p>{{ $t('admin.placeholders.recentOrders') }}</p>
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
