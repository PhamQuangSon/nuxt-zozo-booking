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
            <option value="">{{ $t('restaurants.allCuisines') }}</option>
            <option value="vietnamese">{{ $t('restaurants.cuisine.vietnamese') }}</option>
            <option value="italian">{{ $t('restaurants.cuisine.italian') }}</option>
            <option value="japanese">{{ $t('restaurants.cuisine.japanese') }}</option>
            <option value="chinese">{{ $t('restaurants.cuisine.chinese') }}</option>
          </select>
          
          <select v-model="sortBy" class="border rounded-lg px-4 py-2">
            <option value="rating">{{ $t('restaurants.sort.rating') }}</option>
            <option value="delivery">{{ $t('restaurants.sort.delivery') }}</option>
            <option value="name">{{ $t('restaurants.sort.name') }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Restaurant List -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">{{ $t('restaurants.loading') }}</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RestaurantCard 
            v-for="restaurant in filteredRestaurants" 
            :key="restaurant.id"
            :restaurant="restaurant"
          />
        </div>
        
        <div v-if="!loading && filteredRestaurants.length === 0" class="text-center py-12">
          <p class="text-gray-600">{{ $t('restaurants.noResults') }}</p>
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
  title: `${$t('restaurants.title')} - Zozo Booking`,
  meta: [
    { name: 'description', content: $t('restaurants.metaDescription') }
  ]
})
</script>