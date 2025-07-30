<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex items-center mb-4">
        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
          <AlertTriangle class="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ $t('admin.confirmDelete') }}</h3>
        </div>
      </div>
      
      <p class="text-gray-600 mb-6">
        {{ $t('admin.deleteConfirmMessage', { item: itemName }) }}
      </p>

      <div class="flex space-x-3">
        <button 
          @click="$emit('cancel')"
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          {{ $t('common.cancel') }}
        </button>
        <button 
          @click="$emit('confirm')"
          :disabled="isDeleting"
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
        >
          {{ isDeleting ? $t('common.deleting') : $t('common.delete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  isVisible: Boolean,
  itemName: String,
  isDeleting: Boolean
})

defineEmits(['cancel', 'confirm'])
</script>
