<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold text-gray-900">{{ $t('admin.listTables') }}</h2>

    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold">{{ $t('admin.tableList') }} {{ $t('admin.pastaParadise') }}</h3>
      <button class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center">
        <PlusCircle class="mr-2 h-4 w-4" /> {{ $t('admin.addNewTable') }}
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.tableNumber') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.seats') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('admin.tableLocation') }}</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.status') }}</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="table in tables" :key="table.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ table.number }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ table.seats }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ table.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    table.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : table.status === 'Occupied'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ $t(table.status === 'Available' ? 'admin.available' : table.status === 'Occupied' ? 'admin.occupied' : 'admin.booked') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-gray-600 hover:text-gray-900 mr-2 p-2 rounded-md hover:bg-gray-100" :title="$t('admin.qrCode')">
                  <QrCode class="h-4 w-4" />
                </button>
                <button class="text-orange-600 hover:text-orange-900 p-2 rounded-md hover:bg-orange-50" :title="$t('common.edit')">
                  <Edit class="h-4 w-4" />
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
import { PlusCircle, Edit, QrCode } from 'lucide-vue-next'

const tables = ref([
  { id: 1, number: 1, seats: 2, location: "Window", status: "Occupied" },
  { id: 2, number: 2, seats: 4, location: "Center", status: "Available" },
  { id: 3, number: 3, seats: 6, location: "Private Room", status: "Booked" },
  { id: 4, number: 4, seats: 2, location: "Bar Area", status: "Available" },
])
</script>
