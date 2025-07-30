<template>
<div class="space-y-8">
  <h2 class="text-2xl font-bold text-gray-900">{{ $t('admin.menuBuilder') }}</h2>

  <div class="flex items-center justify-between">
    <h3 class="text-xl font-semibold">{{ $t('admin.menuItemsFor', { restaurant: restaurantName }) }}</h3>
    <button 
      @click="openForm()"
      class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
    >
      <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewMenuItem') }}
    </button>
  </div>

  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.itemName') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.category') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.price') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.status') }}</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in menuItems" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.category }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ item.price.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
              >
                {{ $t(item.status === 'Active' ? 'common.active' : 'common.inactive') }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="openForm(item, true)"
                class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50" 
                :title="$t('common.edit')"
              >
                <Edit class="h-4 w-4" />
              </button>
              <button 
                @click="confirmDelete(item)"
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

  <!-- Menu Item Form -->
  <MenuItemForm
    :isVisible="showForm"
    :menuItem="selectedMenuItem"
    :isEdit="isEdit"
    @close="closeForm"
    @save="saveMenuItem"
  />

  <!-- Confirm Delete Dialog -->
  <ConfirmDialog
    :isVisible="showDeleteDialog"
    :itemName="selectedMenuItem?.name || ''"
    :isDeleting="isDeleting"
    @cancel="closeDeleteDialog"
    @confirm="deleteMenuItem"
  />
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuItemForm from '@/components/admin/MenuItemForm.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'

const route = useRoute()

const restaurantId = computed(() => route.params.id)
const restaurantName = computed(() => {
if (!restaurantId.value) return ''
return String(restaurantId.value)
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
})

const menuItems = ref([
{ id: 1, name: "Spaghetti Carbonara", category: "Main Courses", price: 18.5, status: "Active", restaurant: "Pasta Paradise", description: "Classic Italian pasta dish.", imageUrl: "/placeholder.svg?height=120&width=120&text=Spaghetti" },
{ id: 2, name: "Fettuccine Alfredo", category: "Main Courses", price: 17.0, status: "Active", restaurant: "Pasta Paradise", description: "Creamy pasta dish.", imageUrl: "/placeholder.svg?height=120&width=120&text=Fettuccine" },
{ id: 3, name: "Garlic Bread", category: "Appetizers", price: 6.0, status: "Active", restaurant: "Pasta Paradise", description: "Toasted bread with garlic.", imageUrl: "/placeholder.svg?height=120&width=120&text=Garlic Bread" },
{ id: 4, name: "Tiramisu", category: "Desserts", price: 8.0, status: "Active", restaurant: "Pasta Paradise", description: "Italian coffee-flavored dessert.", imageUrl: "/placeholder.svg?height=120&width=120&text=Tiramisu" },
{ id: 5, name: "Seasonal Salad", category: "Appetizers", price: 10.0, status: "Inactive", restaurant: "Pasta Paradise", description: "Fresh seasonal salad.", imageUrl: "/placeholder.svg?height=120&width=120&text=Salad" },
])

// Filter menu items by current restaurant
const filteredMenuItems = computed(() => {
return menuItems.value.filter(item => item.restaurant.toLowerCase().replace(/\s+/g, '-') === restaurantId.value)
})

// Form state
const showForm = ref(false)
const selectedMenuItem = ref(null)
const isEdit = ref(false)

// Delete state
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Form methods
const openForm = (item = null, edit = false) => {
selectedMenuItem.value = item
isEdit.value = edit
showForm.value = true
}

const closeForm = () => {
showForm.value = false
selectedMenuItem.value = null
isEdit.value = false
}

const saveMenuItem = (itemData) => {
if (isEdit.value) {
  // Update existing item
  const index = menuItems.value.findIndex(i => i.id === itemData.id)
  if (index !== -1) {
    menuItems.value[index] = itemData
  }
} else {
  // Add new item
  menuItems.value.push(itemData)
}
closeForm()
}

// Delete methods
const confirmDelete = (item) => {
selectedMenuItem.value = item
showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
showDeleteDialog.value = false
selectedMenuItem.value = null
}

const deleteMenuItem = async () => {
isDeleting.value = true

try {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Remove from list
  menuItems.value = menuItems.value.filter(i => i.id !== selectedMenuItem.value.id)
  
  closeDeleteDialog()
} catch (error) {
  console.error('Error deleting menu item:', error)
} finally {
  isDeleting.value = false
}
}
</script>
