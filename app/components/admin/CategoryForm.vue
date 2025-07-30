<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? $t('admin.editCategory') : $t('admin.addNewCategory') }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.categoryName') }} *
          </label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterCategoryName')"
          />
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
            {{ $t('admin.sortOrder') }}
          </label>
          <input 
            v-model="form.sortOrder"
            type="number" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterSortOrder')"
          />
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
  category: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const form = ref({
  name: '',
  description: '',
  sortOrder: 0
})

watch(() => props.category, (newCategory) => {
  if (newCategory && props.isEdit) {
    form.value = {
      name: newCategory.name,
      description: newCategory.description || '',
      sortOrder: newCategory.sortOrder || 0
    }
  } else {
    form.value = {
      name: '',
      description: '',
      sortOrder: 0
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const categoryData = {
      ...form.value,
      id: props.isEdit ? props.category.id : Date.now(),
      itemCount: props.isEdit ? props.category.itemCount : 0
    }
    
    emit('save', categoryData)
  } catch (error) {
    console.error('Error saving category:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
