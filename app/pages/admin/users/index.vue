<template>
<div class="space-y-8">
  <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.userManagement') }}</h1>
  <button 
    @click="openForm()"
    class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
  >
    <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewUser') }}
  </button>

  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4">{{ $t('admin.allUsers') }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.userName') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.email') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.role') }}</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.lastLogin') }}</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.lastLogin }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="openForm(user, true)"
                class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50" 
                :title="$t('common.edit')"
              >
                <Edit class="h-4 w-4" />
              </button>
              <button 
                @click="confirmDelete(user)"
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

  <!-- User Form -->
  <UserForm
    :isVisible="showForm"
    :user="selectedUser"
    :isEdit="isEdit"
    @close="closeForm"
    @save="saveUser"
  />

  <!-- Confirm Delete Dialog -->
  <ConfirmDialog
    :isVisible="showDeleteDialog"
    :itemName="selectedUser?.name || ''"
    :isDeleting="isDeleting"
    @cancel="closeDeleteDialog"
    @confirm="deleteUser"
  />
</div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import UserForm from '@/components/admin/UserForm.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'

definePageMeta({
  layout: 'admin',
})

const users = ref([
{ id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", lastLogin: "2025-07-25 10:00", phone: "111-111-1111" },
{ id: 2, name: "Regular Customer", email: "customer@example.com", role: "Customer", lastLogin: "2025-07-24 15:30", phone: "222-222-2222" },
{ id: 3, name: "Restaurant Manager", email: "manager@example.com", role: "Manager", lastLogin: "2025-07-25 09:00", phone: "333-333-3333" },
])

// Form state
const showForm = ref(false)
const selectedUser = ref(null)
const isEdit = ref(false)

// Delete state
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Form methods
const openForm = (user = null, edit = false) => {
selectedUser.value = user
isEdit.value = edit
showForm.value = true
}

const closeForm = () => {
showForm.value = false
selectedUser.value = null
isEdit.value = false
}

const saveUser = (userData) => {
if (isEdit.value) {
  // Update existing user
  const index = users.value.findIndex(u => u.id === userData.id)
  if (index !== -1) {
    users.value[index] = userData
  }
} else {
  // Add new user
  users.value.push(userData)
}
closeForm()
}

// Delete methods
const confirmDelete = (user) => {
selectedUser.value = user
showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
showDeleteDialog.value = false
selectedUser.value = null
}

const deleteUser = async () => {
isDeleting.value = true

try {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Remove from list
  users.value = users.value.filter(u => u.id !== selectedUser.value.id)
  
  closeDeleteDialog()
} catch (error) {
  console.error('Error deleting user:', error)
} finally {
  isDeleting.value = false
}
}
</script>
