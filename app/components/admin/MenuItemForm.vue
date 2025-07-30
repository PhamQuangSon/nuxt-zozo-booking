<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? $t('admin.editMenuItem') : $t('admin.addNewItem') }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.itemName') }} *
          </label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterItemName')"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.category') }} *
          </label>
          <select 
            v-model="form.category"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{{ $t('admin.selectCategory') }}</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Main Courses">Main Courses</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
            <option value="Sushi">Sushi</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.price') }} *
          </label>
          <input 
            v-model="form.price"
            type="number" 
            step="0.01"
            min="0"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterPrice')"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('restaurant.name') }} *
          </label>
          <select 
            v-model="form.restaurant"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{{ $t('admin.selectRestaurant') }}</option>
            <option value="Pasta Paradise">Pasta Paradise</option>
            <option value="Sushi Symphony">Sushi Symphony</option>
            <option value="Burger Bliss">Burger Bliss</option>
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
            {{ $t('admin.imageUrl') }}
          </label>
          <input 
            v-model="form.imageUrl"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterImageUrl')"
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
  menuItem: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const form = ref({
  name: '',
  category: '',
  price: '',
  restaurant: '',
  description: '',
  imageUrl: '',
  status: 'Active'
})

watch(() => props.menuItem, (newMenuItem) => {
  if (newMenuItem && props.isEdit) {
    form.value = {
      name: newMenuItem.name,
      category: newMenuItem.category,
      price: newMenuItem.price,
      restaurant: newMenuItem.restaurant,
      description: newMenuItem.description || '',
      imageUrl: newMenuItem.imageUrl || '',
      status: newMenuItem.status || 'Active'
    }
  } else {
    form.value = {
      name: '',
      category: '',
      price: '',
      restaurant: '',
      description: '',
      imageUrl: '',
      status: 'Active'
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const menuItemData = {
      ...form.value,
      id: props.isEdit ? props.menuItem.id : Date.now(),
      price: parseFloat(form.value.price)
    }
    
    emit('save', menuItemData)
  } catch (error) {
    console.error('Error saving menu item:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
