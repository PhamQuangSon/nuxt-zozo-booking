<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? $t('admin.editQRTable') : $t('admin.addNewQRTable') }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.tableNumber') }} *
          </label>
          <input 
            v-model="form.tableNumber"
            type="number" 
            required
            min="1"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterTableNumber')"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.tableLocation') }} *
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
            {{ $t('admin.seats') }} *
          </label>
          <input 
            v-model="form.seats"
            type="number" 
            required
            min="1"
            max="20"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterSeats')"
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
  table: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const form = ref({
  tableNumber: '',
  location: '',
  seats: '',
  status: 'Active'
})

// Watch for table prop changes to populate form
watch(() => props.table, (newTable) => {
  if (newTable && props.isEdit) {
    form.value = {
      tableNumber: newTable.tableNumber,
      location: newTable.location,
      seats: newTable.seats || '',
      status: newTable.status
    }
  } else {
    // Reset form for new table
    form.value = {
      tableNumber: '',
      location: '',
      seats: '',
      status: 'Active'
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const tableData = {
      ...form.value,
      tableNumber: parseInt(form.value.tableNumber),
      seats: parseInt(form.value.seats),
      id: props.isEdit ? props.table.id : Date.now(),
      qrCodeUrl: `/placeholder.svg?height=100&width=100&text=QR${form.value.tableNumber}`
    }
    
    emit('save', tableData)
  } catch (error) {
    console.error('Error saving table:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
