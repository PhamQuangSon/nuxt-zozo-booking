<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('admin.itemOptions') }}</h1>
      <button class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center">
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
                <button class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50" :title="$t('common.edit')">
                  <Edit class="h-4 w-4" />
                </button>
                <button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" :title="$t('common.delete')">
                  <Trash2 class="h-4 w-4" />
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

const itemOptions = ref([
  { id: 1, type: "Size", name: "Small", price: 0.0, appliesTo: "Pizza, Drinks" },
  { id: 2, type: "Size", name: "Medium", price: 2.0, appliesTo: "Pizza, Drinks" },
  { id: 3, type: "Size", name: "Large", price: 4.0, appliesTo: "Pizza, Drinks" },
  { id: 4, type: "Topping", name: "Extra Cheese", price: 1.0, appliesTo: "Pizza, Pasta" },
  { id: 5, type: "Topping", name: "Pepperoni", price: 1.5, appliesTo: "Pizza" },
  { id: 6, type: "Topping", name: "Mushrooms", price: 1.0, appliesTo: "Pizza, Pasta" },
])
</script>
