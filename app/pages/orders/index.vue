<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ $t('orders.title') }}
      </h1>
      
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">{{ $t('common.loading') }}</p>
      </div>
      
      <div v-else-if="orders.length === 0" class="text-center py-12">
        <p class="text-gray-600 mb-4">{{ $t('orders.noOrders') }}</p>
        <NuxtLink 
          to="/restaurants" 
          class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          {{ $t('navigation.restaurants') }}
        </NuxtLink>
      </div>
      
      <div v-else class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order.id"
          class="bg-white rounded-lg shadow-sm border p-6"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ $t('receipt.orderNumber', { number: order.id }) }}</h3>
              <p class="text-gray-600">{{ order.restaurantName }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</p>
            </div>
            <span 
              :class="getStatusClass(order.status)"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ $t(`orders.status.${order.status}`) }}
            </span>
          </div>
          
          <div class="border-t pt-4">
            <div class="space-y-2">
              <div 
                v-for="item in order.items" 
                :key="item.id"
                class="flex justify-between items-center"
              >
                <span class="text-gray-700">{{ item.quantity }}x {{ item.name }}</span>
                <span class="text-gray-900 font-medium">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>
            
            <div class="border-t mt-4 pt-4 flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900">{{ $t('order.total') }}</span>
              <span class="text-lg font-bold text-orange-600">{{ formatCurrency(order.total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { formatCurrency } = useCurrencyStore()
const loading = ref(true)

// Sample orders data
const orders = ref([
  {
    id: 1001,
    restaurantName: "Pho Saigon",
    status: "delivered",
    createdAt: new Date('2024-01-15T12:30:00'),
    total: 25.97,
    items: [
      { id: 1, name: "Pho Bo", quantity: 1, price: 12.99 },
      { id: 2, name: "Spring Rolls", quantity: 2, price: 6.99 }
    ]
  },
  {
    id: 1002,
    restaurantName: "Pizza Palace",
    status: "preparing",
    createdAt: new Date('2024-01-16T18:45:00'),
    total: 18.99,
    items: [
      { id: 3, name: "Margherita Pizza", quantity: 1, price: 18.99 }
    ]
  }
])

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-orange-100 text-orange-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

// SEO
useHead({
  title: `${$t('orders.title')} - Zozo Booking`,
  meta: [
    { name: 'description', content: $t('orders.metaDescription') }
  ]
})
</script>