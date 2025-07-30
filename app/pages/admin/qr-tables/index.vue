<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.qrTableManagement') }}</h1>
      <button class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center">
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
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.status') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.qrCode') }}</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="table in qrTables" :key="table.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ table.tableNumber }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ table.location }}</td>
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
                <button class="text-gray-600 hover:text-gray-900 mr-2 p-2 rounded-md hover:bg-gray-100" :title="$t('admin.downloadQR')">
                  <Download class="h-4 w-4" />
                </button>
                <button class="text-orange-600 hover:text-orange-900 p-2 rounded-md hover:bg-orange-50">
                  {{ $t('common.edit') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'admin',
})

const qrTables = ref([
  {
    id: 1,
    tableNumber: 1,
    location: "Window",
    status: "Active",
    qrCodeUrl: "/placeholder.svg?height=100&width=100&text=QR1",
  },
  {
    id: 2,
    tableNumber: 2,
    location: "Center",
    status: "Active",
    qrCodeUrl: "/placeholder.svg?height=100&width=100&text=QR2",
  },
  {
    id: 3,
    tableNumber: 3,
    location: "Outdoor",
    status: "Inactive",
    qrCodeUrl: "/placeholder.svg?height=100&width=100&text=QR3",
  },
])
</script>
