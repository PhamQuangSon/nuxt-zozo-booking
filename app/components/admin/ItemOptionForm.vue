<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? $t('admin.editItemOption') : $t('admin.addNewOption') }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.optionType') }} *
          </label>
          <select 
            v-model="form.type"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{{ $t('admin.selectType') }}</option>
            <option value="Size">Size</option>
            <option value="Topping">Topping</option>
            <option value="Extra">Extra</option>
            <option value="Sauce">Sauce</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.optionName') }} *
          </label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterOptionName')"
          />
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
            {{ $t('admin.appliesTo') }}
          </label>
          <input 
            v-model="form.appliesTo"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterAppliesTo')"
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
  itemOption: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const form = ref({
  type: '',
  name: '',
  price: '',
  appliesTo: ''
})

watch(() => props.itemOption, (newItemOption) => {
  if (newItemOption && props.isEdit) {
    form.value = {
      type: newItemOption.type,
      name: newItemOption.name,
      price: newItemOption.price,
      appliesTo: newItemOption.appliesTo || ''
    }
  } else {
    form.value = {
      type: '',
      name: '',
      price: '',
      appliesTo: ''
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const itemOptionData = {
      ...form.value,
      id: props.isEdit ? props.itemOption.id : Date.now(),
      price: parseFloat(form.value.price)
    }
    
    emit('save', itemOptionData)
  } catch (error) {
    console.error('Error saving item option:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
