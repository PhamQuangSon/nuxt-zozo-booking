<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t('restaurants.title') }}
        </h1>
        <p class="text-gray-600">
          {{ $t('restaurants.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-wrap gap-4">
          <select v-model="selectedCuisine" class="border rounded-lg px-4 py-2">
            <option value="">All Cuisines</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
          </select>
          
          <select v-model="sortBy" class="border rounded-lg px-4 py-2">
            <option value="rating">Sort by Rating</option>
            <option value="delivery">Sort by Delivery Time</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Restaurant List -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading restaurants...</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RestaurantCard 
            v-for="restaurant in filteredRestaurants" 
            :key="restaurant.id"
            :restaurant="restaurant"
          />
        </div>
        
        <div v-if="!loading && filteredRestaurants.length === 0" class="text-center py-12">
          <p class="text-gray-600">No restaurants found matching your criteria.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const loading = ref(true)
const selectedCuisine = ref('')
const sortBy = ref('rating')

// Sample data - replace with actual API call
const restaurants = ref([
  {
    id: 1,
    name: "Pho Saigon",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "vietnamese",
    rating: 4.8,
    deliveryTime: "25-35 min",
    description: "Authentic Vietnamese cuisine with fresh ingredients"
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "italian",
    rating: 4.6,
    deliveryTime: "20-30 min",
    description: "Wood-fired pizzas and Italian classics"
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "japanese",
    rating: 4.9,
    deliveryTime: "30-40 min",
    description: "Fresh sushi and traditional Japanese dishes"
  },
  {
    id: 4,
    name: "Dragon Palace",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "chinese",
    rating: 4.7,
    deliveryTime: "30-45 min",
    description: "Traditional Chinese dishes and dim sum"
  }
])

const filteredRestaurants = computed(() => {
  let filtered = restaurants.value
  
  if (selectedCuisine.value) {
    filtered = filtered.filter(r => r.cuisine === selectedCuisine.value)
  }
  
  // Sort restaurants
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating':
        return b.rating - a.rating
      case 'delivery':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })
  
  return filtered
})

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

// SEO
useHead({
  title: 'Restaurants - Zozo Booking',
  meta: [
    { name: 'description', content: 'Browse and order from the best restaurants in your area.' }
  ]
})
</script>