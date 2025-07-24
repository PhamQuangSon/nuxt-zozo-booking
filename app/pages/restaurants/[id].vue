<template>
  <div v-if="restaurant" class="min-h-screen bg-gray-50">
    <!-- Restaurant Header -->
    <section class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row gap-8">
          <img 
            :src="restaurant.image" 
            :alt="restaurant.name"
            class="w-full md:w-64 h-48 object-cover rounded-lg"
          >
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ restaurant.name }}</h1>
            <p class="text-gray-600 mb-4">{{ restaurant.description }}</p>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center">
                ⭐ {{ restaurant.rating }}
              </span>
              <span>🕒 {{ restaurant.deliveryTime }}</span>
              <span>🍽️ {{ restaurant.cuisine }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in restaurant.menu" 
            :key="item.id"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-full h-32 object-cover rounded-lg mb-4"
            >
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ item.name }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-orange-600">
                {{ formatCurrency(item.price) }}
              </span>
              <button 
                @click="addToCart(item)"
                class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading restaurant...</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const cartStore = useCartStore()
const { formatCurrency } = useCurrency()

const restaurant = ref(null)

// Sample data - replace with actual API call
const sampleRestaurant = {
  id: 1,
  name: "Pho Saigon",
  image: "/restaurant_1.png",
  cuisine: "Vietnamese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  description: "Authentic Vietnamese cuisine with fresh ingredients and traditional recipes passed down through generations.",
  menu: [
    {
      id: 1,
      name: "Pho Bo",
      description: "Traditional beef noodle soup with rice noodles, herbs, and tender beef",
      price: 12.99,
      image: "/menuThumb1_1.png"
    },
    {
      id: 2,
      name: "Banh Mi",
      description: "Vietnamese sandwich with pork, pate, vegetables, and herbs",
      price: 8.99,
      image: "/menuThumb1_2.png"
    },
    {
      id: 3,
      name: "Spring Rolls",
      description: "Fresh spring rolls with shrimp, herbs, and peanut dipping sauce",
      price: 6.99,
      image: "/menuThumb1_3.png"
    }
  ]
}

const addToCart = (item) => {
  cartStore.addItem({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: 1,
    restaurantId: restaurant.value.id,
    restaurantName: restaurant.value.name
  })
  
  // Show success message
  // You can implement a toast notification here
  console.log(`Added ${item.name} to cart`)
}

// Simulate API call
onMounted(() => {
  setTimeout(() => {
    restaurant.value = sampleRestaurant
  }, 1000)
})

// SEO
useHead(() => ({
  title: restaurant.value ? `${restaurant.value.name} - Zozo Booking` : 'Restaurant - Zozo Booking',
  meta: [
    { name: 'description', content: restaurant.value?.description || 'View menu and order from this restaurant' }
  ]
}))
</script>