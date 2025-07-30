<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.dashboard') }}</h1>

    <!-- Overview Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.revenue.total') }}</h3>
          <DollarSign class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">$45,231.89</div>
          <p class="text-xs text-gray-500">{{ $t('admin.revenue.fromLastMonth', { percent: '20.1' }) }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.newUsers') }}</h3>
          <Users class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">+2350</div>
          <p class="text-xs text-gray-500">{{ $t('admin.revenue.fromLastMonth', { percent: '180.1' }) }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.activeRestaurants') }}</h3>
          <Utensils class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">124</div>
          <p class="text-xs text-gray-500">{{ $t('admin.timeframes.sinceLastMonth', { count: '5' }) }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">{{ $t('admin.totalBookings') }}</h3>
          <CalendarCheck class="h-4 w-4 text-gray-500" />
        </div>
        <div class="mt-1">
          <div class="text-2xl font-bold">5,789</div>
          <p class="text-xs text-gray-500">{{ $t('admin.revenue.fromLastMonth', { percent: '19' }) }}</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity / Charts (Placeholders) -->
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">{{ $t('orders.recentOrders') }}</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">John Doe - Sakura Japanese</p>
              <p class="text-sm text-gray-500">{{ $t('order.table') }} 5, 7:00 PM - July 25, 2025</p>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              {{ $t('common.confirmed') }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Jane Smith - Italian Bistro</p>
              <p class="text-sm text-gray-500">{{ $t('order.table') }} 2, 6:30 PM - July 25, 2025</p>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              {{ $t('common.confirmed') }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Alice Johnson - The Steakhouse</p>
              <p class="text-sm text-gray-500">{{ $t('order.table') }} 10, 8:00 PM - July 24, 2025</p>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
              {{ $t('common.pending') }}
            </span>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">{{ $t('admin.restaurantPerformance') }}</h3>
        <div class="text-center text-gray-500 py-8">
          <p>{{ $t('admin.placeholders.chartData') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'admin',
})

console.log('pages/admin/index.vue script setup executed!');
</script>
