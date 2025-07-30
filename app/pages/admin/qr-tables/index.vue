<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.qrTableManagement') }}</h1>
      <button 
        @click="openForm()"
        class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
      >
        <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewQRTable') }}
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">{{ $t('admin.qrTableList') }}</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.tableNumber') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.tableLocation') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.seats') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.status') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.qrCode') }}</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="table in qrTables" :key="table.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ table.tableNumber }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ table.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ table.seats }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    table.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ $t(table.status === 'Active' ? 'common.active' : 'common.inactive') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <img
                  :src="table.qrCodeUrl || '/placeholder.svg'"
                  :alt="`QR for Table ${table.tableNumber}`"
                  class="h-16 w-16 object-contain"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="downloadQR(table)"
                  class="text-gray-600 hover:text-gray-900 mr-2 p-2 rounded-md hover:bg-gray-100" 
                  :title="$t('admin.downloadQR')"
                >
                  <Download class="h-4 w-4" />
                </button>
                <button 
                  @click="openForm(table, true)"
                  class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50"
                  :title="$t('common.edit')"
                >
                  <Edit class="h-4 w-4" />
                </button>
                <button 
                  @click="confirmDelete(table)"
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

    <!-- QR Table Form -->
    <QRTableForm
      :isVisible="showForm"
      :table="selectedTable"
      :isEdit="isEdit"
      @close="closeForm"
      @save="saveTable"
    />

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog
      :isVisible="showDeleteDialog"
      :itemName="selectedTable?.tableNumber ? `Table ${selectedTable.tableNumber}` : ''"
      :isDeleting="isDeleting"
      @cancel="closeDeleteDialog"
      @confirm="deleteTable"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import QRTableForm from '@/components/admin/QRTableForm.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'

definePageMeta({
  layout: 'admin',
})

const qrTables = ref([
  {
    id: 1,
    tableNumber: 1,
    location: "Window",
    seats: 2,
    status: "Active",
    qrCodeUrl: "/placeholder.svg?height=100&width=100&text=QR1",
  },
  {
    id: 2,
    tableNumber: 2,
    location: "Center",
    seats: 4,
    status: "Active",
    qrCodeUrl: "/placeholder.svg?height=100&width=100&text=QR2",
  },
  {
    id: 3,
    tableNumber: 3,
    location: "Outdoor",
    seats: 6,
    status: "Inactive",
    qrCodeUrl: "/placeholder.svg?height=100&width=100&text=QR3",
  },
])

// Form state
const showForm = ref(false)
const selectedTable = ref(null)
const isEdit = ref(false)

// Delete state
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Form methods
const openForm = (table = null, edit = false) => {
  selectedTable.value = table
  isEdit.value = edit
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedTable.value = null
  isEdit.value = false
}

const saveTable = (tableData) => {
  if (isEdit.value) {
    // Update existing table
    const index = qrTables.value.findIndex(t => t.id === tableData.id)
    if (index !== -1) {
      qrTables.value[index] = tableData
    }
  } else {
    // Add new table
    qrTables.value.push(tableData)
  }
  closeForm()
}

// Delete methods
const confirmDelete = (table) => {
  selectedTable.value = table
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  selectedTable.value = null
}

const deleteTable = async () => {
  isDeleting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Remove from list
    qrTables.value = qrTables.value.filter(t => t.id !== selectedTable.value.id)
    
    closeDeleteDialog()
  } catch (error) {
    console.error('Error deleting table:', error)
  } finally {
    isDeleting.value = false
  }
}

// Download QR code
const downloadQR = (table) => {
  // Simulate QR code download
  const link = document.createElement('a')
  link.href = table.qrCodeUrl
  link.download = `table-${table.tableNumber}-qr.png`
  link.click()
}
</script>
