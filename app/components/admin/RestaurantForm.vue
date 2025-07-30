<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? $t('admin.editRestaurant') : $t('admin.addNewRestaurant') }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('restaurant.name') }} *
          </label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterRestaurantName')"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('restaurant.location') }} *
          </label>
          <input 
            v-model="form.location"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterLocation')"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.cuisine') }}
          </label>
          <select 
            v-model="form.cuisine"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="vietnamese">{{ $t('restaurant.cuisine.vietnamese') }}</option>
            <option value="italian">{{ $t('restaurant.cuisine.italian') }}</option>
            <option value="japanese">{{ $t('restaurant.cuisine.japanese') }}</option>
            <option value="chinese">{{ $t('restaurant.cuisine.chinese') }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.description') }}
          </label>
          <textarea 
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterDescription')"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.phone') }}
          </label>
          <input 
            v-model="form.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterPhone')"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.email') }}
          </label>
          <input 
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterEmail')"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('common.status') }}
          </label>
          <select 
            v-model="form.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Active">{{ $t('common.active') }}</option>
            <option value="Inactive">{{ $t('common.inactive') }}</option>
          </select>
        </div>

        <div class="flex space-x-3 pt-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {{ $t('common.cancel') }}
          </button>
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
          >
            {{ isSubmitting ? $t('common.saving') : (isEdit ? $t('common.update') : $t('common.save')) }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isVisible: Boolean,
  restaurant: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const form = ref({
  name: '',
  location: '',
  cuisine: 'vietnamese',
  description: '',
  phone: '',
  email: '',
  status: 'Active'
})

watch(() => props.restaurant, (newRestaurant) => {
  if (newRestaurant && props.isEdit) {
    form.value = {
      name: newRestaurant.name,
      location: newRestaurant.location,
      cuisine: newRestaurant.cuisine || 'vietnamese',
      description: newRestaurant.description || '',
      phone: newRestaurant.phone || '',
      email: newRestaurant.email || '',
      status: newRestaurant.status
    }
  } else {
    form.value = {
      name: '',
      location: '',
      cuisine: 'vietnamese',
      description: '',
      phone: '',
      email: '',
      status: 'Active'
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const restaurantData = {
      ...form.value,
      id: props.isEdit ? props.restaurant.id : form.value.name.toLowerCase().replace(/\s+/g, '-'),
      bookingsToday: props.isEdit ? props.restaurant.bookingsToday : 0
    }
    
    emit('save', restaurantData)
  } catch (error) {
    console.error('Error saving restaurant:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
