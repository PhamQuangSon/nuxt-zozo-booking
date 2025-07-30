<template>
<div class="space-y-8">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.restaurants') }}</h1>
    <button 
      @click="openForm()"
      class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
    >
      <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewRestaurant') }}
    </button>
  </div>

  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4">{{ $t('admin.restaurantList') }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('restaurant.name') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('restaurant.location') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.status') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('restaurant.bookingsToday') }}</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
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
                {{ $t(restaurant.status === 'Active' ? 'common.active' : 'common.inactive') }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ restaurant.bookingsToday }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <NuxtLink :to="localePath(`/admin/restaurants/${restaurant.id}`)">
                <button class="text-gray-600 hover:text-gray-900 mr-2 p-2 rounded-md hover:bg-gray-100" :title="$t('common.view')">
                  <Eye class="h-4 w-4" />
                </button>
              </NuxtLink>
              <button 
                @click="openForm(restaurant, true)"
                class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50"
                :title="$t('common.edit')"
              >
                <Edit class="h-4 w-4" />
              </button>
              <button 
                @click="confirmDelete(restaurant)"
                class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                :title="$t('common.delete')"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Restaurant Form -->
  <RestaurantForm
    :isVisible="showForm"
    :restaurant="selectedRestaurant"
    :isEdit="isEdit"
    @close="closeForm"
    @save="saveRestaurant"
  />

  <!-- Confirm Delete Dialog -->
  <ConfirmDialog
    :isVisible="showDeleteDialog"
    :itemName="selectedRestaurant?.name || ''"
    :isDeleting="isDeleting"
    @cancel="closeDeleteDialog"
    @confirm="deleteRestaurant"
  />
</div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import { useNuxtApp } from '#app'
import RestaurantForm from '@/components/admin/RestaurantForm.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'

const nuxtApp = useNuxtApp()
const localePath = nuxtApp.$localePath

definePageMeta({
  layout: 'admin',
})

const restaurants = ref([
{ id: "pasta-paradise", name: "Pasta Paradise", location: "City Center", status: "Active", bookingsToday: 15, cuisine: "italian", description: "Authentic Italian pasta dishes.", phone: "123-456-7890", email: "pasta@example.com" },
{ id: "sushi-symphony", name: "Sushi Symphony", location: "Downtown", status: "Active", bookingsToday: 10, cuisine: "japanese", description: "Finest sushi and sashimi.", phone: "098-765-4321", email: "sushi@example.com" },
{ id: "burger-bliss", name: "Burger Bliss", location: "Suburbia", status: "Inactive", bookingsToday: 0, cuisine: "american", description: "Gourmet burgers and fries.", phone: "111-222-3333", email: "burger@example.com" },
])

// Form state
const showForm = ref(false)
const selectedRestaurant = ref(null)
const isEdit = ref(false)

// Delete state
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Form methods
const openForm = (restaurant = null, edit = false) => {
selectedRestaurant.value = restaurant
isEdit.value = edit
showForm.value = true
}

const closeForm = () => {
showForm.value = false
selectedRestaurant.value = null
isEdit.value = false
}

const saveRestaurant = (restaurantData) => {
if (isEdit.value) {
  // Update existing restaurant
  const index = restaurants.value.findIndex(r => r.id === restaurantData.id)
  if (index !== -1) {
    restaurants.value[index] = restaurantData
  }
} else {
  // Add new restaurant
  restaurants.value.push(restaurantData)
}
closeForm()
}

// Delete methods
const confirmDelete = (restaurant) => {
selectedRestaurant.value = restaurant
showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
showDeleteDialog.value = false
selectedRestaurant.value = null
}

const deleteRestaurant = async () => {
isDeleting.value = true

try {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Remove from list
  restaurants.value = restaurants.value.filter(r => r.id !== selectedRestaurant.value.id)
  
  closeDeleteDialog()
} catch (error) {
  console.error('Error deleting restaurant:', error)
} finally {
  isDeleting.value = false
}
}
</script>
