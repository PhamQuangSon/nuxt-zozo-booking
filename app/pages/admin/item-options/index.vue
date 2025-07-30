<template>
<div class="space-y-8">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.itemOptions') }}</h1>
    <button 
      @click="openForm()"
      class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
    >
      <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewOption') }}
    </button>
  </div>

  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4">{{ $t('admin.allItemOptions') }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.optionType') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.optionName') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.price') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.appliesTo') }}</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="option in itemOptions" :key="option.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ option.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ option.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ option.price.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ option.appliesTo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="openForm(option, true)"
                class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50" 
                :title="$t('common.edit')"
              >
                <Edit class="h-4 w-4" />
              </button>
              <button 
                @click="confirmDelete(option)"
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

  <!-- Item Option Form -->
  <ItemOptionForm
    :isVisible="showForm"
    :itemOption="selectedItemOption"
    :isEdit="isEdit"
    @close="closeForm"
    @save="saveItemOption"
  />

  <!-- Confirm Delete Dialog -->
  <ConfirmDialog
    :isVisible="showDeleteDialog"
    :itemName="selectedItemOption?.name || ''"
    :isDeleting="isDeleting"
    @cancel="closeDeleteDialog"
    @confirm="deleteItemOption"
  />
</div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import ItemOptionForm from '@/components/admin/ItemOptionForm.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'

definePageMeta({
  layout: 'admin',
})

const itemOptions = ref([
{ id: 1, type: "Size", name: "Small", price: 0.0, appliesTo: "Pizza, Drinks" },
{ id: 2, type: "Size", name: "Medium", price: 2.0, appliesTo: "Pizza, Drinks" },
{ id: 3, type: "Size", name: "Large", price: 4.0, appliesTo: "Pizza, Drinks" },
{ id: 4, type: "Topping", name: "Extra Cheese", price: 1.0, appliesTo: "Pizza, Pasta" },
{ id: 5, type: "Topping", name: "Pepperoni", price: 1.5, appliesTo: "Pizza" },
{ id: 6, type: "Topping", name: "Mushrooms", price: 1.0, appliesTo: "Pizza, Pasta" },
])

// Form state
const showForm = ref(false)
const selectedItemOption = ref(null)
const isEdit = ref(false)

// Delete state
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Form methods
const openForm = (option = null, edit = false) => {
selectedItemOption.value = option
isEdit.value = edit
showForm.value = true
}

const closeForm = () => {
showForm.value = false
selectedItemOption.value = null
isEdit.value = false
}

const saveItemOption = (optionData) => {
if (isEdit.value) {
  // Update existing option
  const index = itemOptions.value.findIndex(o => o.id === optionData.id)
  if (index !== -1) {
    itemOptions.value[index] = optionData
  }
} else {
  // Add new option
  itemOptions.value.push(optionData)
}
closeForm()
}

// Delete methods
const confirmDelete = (option) => {
selectedItemOption.value = option
showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
showDeleteDialog.value = false
selectedItemOption.value = null
}

const deleteItemOption = async () => {
isDeleting.value = true

try {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Remove from list
  itemOptions.value = itemOptions.value.filter(o => o.id !== selectedItemOption.value.id)
  
  closeDeleteDialog()
} catch (error) {
  console.error('Error deleting item option:', error)
} finally {
  isDeleting.value = false
}
}
</script>
