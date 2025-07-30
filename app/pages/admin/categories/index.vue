<template>
<div class="space-y-8">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.menuCategories') }}</h1>
    <button 
      @click="openForm()"
      class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
    >
      <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewCategory') }}
    </button>
  </div>

  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4">{{ $t('admin.categoryList') }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.categoryName') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.itemsCount') }}</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ category.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.itemCount }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="openForm(category, true)"
                class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50" 
                :title="$t('common.edit')"
              >
                <Edit class="h-4 w-4" />
              </button>
              <button 
                @click="confirmDelete(category)"
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

  <!-- Category Form -->
  <CategoryForm
    :isVisible="showForm"
    :category="selectedCategory"
    :isEdit="isEdit"
    @close="closeForm"
    @save="saveCategory"
  />

  <!-- Confirm Delete Dialog -->
  <ConfirmDialog
    :isVisible="showDeleteDialog"
    :itemName="selectedCategory?.name || ''"
    :isDeleting="isDeleting"
    @cancel="closeDeleteDialog"
    @confirm="deleteCategory"
  />
</div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusCircle, Edit, Trash2 } from 'lucide-vue-next'
import { definePageMeta } from '#imports'
import CategoryForm from '@/components/admin/CategoryForm.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'

definePageMeta({
  layout: 'admin',
})

const categories = ref([
{ id: 1, name: "Appetizers", itemCount: 25, description: "Small dishes to start your meal.", sortOrder: 1 },
{ id: 2, name: "Main Courses", itemCount: 40, description: "Hearty main dishes.", sortOrder: 2 },
{ id: 3, name: "Desserts", itemCount: 15, description: "Sweet treats to finish.", sortOrder: 4 },
{ id: 4, name: "Beverages", itemCount: 30, description: "Drinks of all kinds.", sortOrder: 5 },
])

// Form state
const showForm = ref(false)
const selectedCategory = ref(null)
const isEdit = ref(false)

// Delete state
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Form methods
const openForm = (category = null, edit = false) => {
selectedCategory.value = category
isEdit.value = edit
showForm.value = true
}

const closeForm = () => {
showForm.value = false
selectedCategory.value = null
isEdit.value = false
}

const saveCategory = (categoryData) => {
if (isEdit.value) {
  // Update existing category
  const index = categories.value.findIndex(c => c.id === categoryData.id)
  if (index !== -1) {
    categories.value[index] = categoryData
  }
} else {
  // Add new category
  categories.value.push(categoryData)
}
closeForm()
}

// Delete methods
const confirmDelete = (category) => {
selectedCategory.value = category
showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
showDeleteDialog.value = false
selectedCategory.value = null
}

const deleteCategory = async () => {
isDeleting.value = true

try {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Remove from list
  categories.value = categories.value.filter(c => c.id !== selectedCategory.value.id)
  
  closeDeleteDialog()
} catch (error) {
  console.error('Error deleting category:', error)
} finally {
  isDeleting.value = false
}
}
</script>
