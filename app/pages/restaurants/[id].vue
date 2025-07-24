<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <button @click="$router.go(-1)" class="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft class="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 class="text-lg font-semibold">Restaurant Details</h1>
          <div class="w-16"></div>
        </div>
      </div>
    </div>

    <!-- Restaurant Info -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div class="relative h-64">
          <img 
            :src="restaurant.image" 
            :alt="restaurant.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div class="p-6 text-white">
              <h1 class="text-3xl font-bold mb-2">{{ restaurant.name }}</h1>
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center">
                  <Star class="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{{ restaurant.rating }}</span>
                </div>
                <div class="flex items-center">
                  <MapPin class="h-4 w-4 mr-1" />
                  <span>{{ restaurant.location }}</span>
                </div>
                <div class="flex items-center">
                  <Clock class="h-4 w-4 mr-1" />
                  <span>{{ restaurant.openHours }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <p class="text-gray-600 mb-4">{{ restaurant.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="cuisine in restaurant.cuisines" 
              :key="cuisine"
              class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
            >
              {{ cuisine }}
            </span>
          </div>
        </div>
      </div>

      <!-- Date and Time Selection -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Select Date & Time</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input 
              v-model="selectedDate"
              type="date" 
              :min="today"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <select 
              v-model="selectedTime"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select time</option>
              <option v-for="time in availableTimes" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Table Selection -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-4">Select Table</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            v-for="table in tables" 
            :key="table.id"
            @click="selectTable(table)"
            :class="[
              'border-2 rounded-lg p-4 cursor-pointer transition-all duration-200',
              selectedTable?.id === table.id 
                ? 'border-orange-500 bg-orange-50' 
                : table.available 
                  ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50' 
                  : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
            ]"
          >
            <div class="text-center">
              <div class="flex items-center justify-center mb-2">
                <div 
                  :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold',
                    table.available ? 'bg-green-500' : 'bg-red-500'
                  ]"
                >
                  {{ table.number }}
                </div>
              </div>
              <p class="text-sm font-medium">Table {{ table.number }}</p>
              <p class="text-xs text-gray-500">{{ table.seats }} seats</p>
              <p class="text-xs text-gray-500">{{ table.location }}</p>
              <div class="mt-2">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    table.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ table.available ? 'Available' : 'Occupied' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Continue Button -->
        <div class="mt-8 flex justify-center">
          <button 
            @click="proceedToBooking"
            :disabled="!selectedTable || !selectedDate || !selectedTime"
            :class="[
              'px-8 py-3 rounded-lg font-semibold transition-all duration-200',
              selectedTable && selectedDate && selectedTime
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Continue to Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-vue-next'
import { navigateTo } from '#app' // Import navigateTo for Nuxt 3

const route = useRoute()
const router = useRouter()

// Reactive data
const selectedDate = ref('')
const selectedTime = ref('')
const selectedTable = ref(null)

// Mock restaurant data
const restaurant = ref({
  id: route.params.id,
  name: 'Sakura Japanese Restaurant',
  image: '/placeholder.svg?height=300&width=800',
  rating: 4.8,
  location: 'Downtown District',
  openHours: '11:00 AM - 10:00 PM',
  description: 'Experience authentic Japanese cuisine in an elegant atmosphere. Our skilled chefs prepare traditional dishes using the finest ingredients, creating an unforgettable dining experience.',
  cuisines: ['Japanese', 'Sushi', 'Asian Fusion']
})

// Available times
const availableTimes = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
]

// Mock table data
const tables = ref([
  { id: 1, number: 1, seats: 2, location: 'Window', available: true },
  { id: 2, number: 2, seats: 4, location: 'Center', available: true },
  { id: 3, number: 3, seats: 2, location: 'Corner', available: false },
  { id: 4, number: 4, seats: 6, location: 'Private', available: true },
  { id: 5, number: 5, seats: 4, location: 'Window', available: true },
  { id: 6, number: 6, seats: 2, location: 'Bar', available: false },
  { id: 7, number: 7, seats: 8, location: 'Private', available: true },
  { id: 8, number: 8, seats: 4, location: 'Center', available: true },
])

// Computed
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Methods
const selectTable = (table) => {
  if (table.available) {
    selectedTable.value = table
  }
}

const proceedToBooking = async () => {
  if (selectedTable.value && selectedDate.value && selectedTime.value) {
    try {
      // Store booking data in a way that can be accessed by the booking page
      const bookingData = {
        restaurantId: route.params.id,
        tableId: selectedTable.value.id,
        tableNumber: selectedTable.value.number,
        tableSeats: selectedTable.value.seats,
        tableLocation: selectedTable.value.location,
        date: selectedDate.value,
        time: selectedTime.value,
        restaurant: restaurant.value
      }
      
      // Store in sessionStorage for the booking page to access
      if (process.client) {
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
      }
      
      // Navigate to booking page - using navigateTo for Nuxt 3
      await navigateTo(`/booking?restaurantId=${route.params.id}&tableId=${selectedTable.value.id}&date=${selectedDate.value}&time=${selectedTime.value}`)
      
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback navigation
      router.push({
        path: '/booking',
        query: {
          restaurantId: route.params.id,
          tableId: selectedTable.value.id,
          date: selectedDate.value,
          time: selectedTime.value
        }
      })
    }
  }
}

// Set default date to today
onMounted(() => {
  selectedDate.value = today.value
})
</script>