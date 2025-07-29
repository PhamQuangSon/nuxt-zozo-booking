<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold text-gray-900">Menu Builder</h2>

    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold">Menu Items for Pasta Paradise</h3>
      <button class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center">
        <PlusCircle class="mr-2 h-4 w-4" /> Add New Menu Item
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-orange-600 hover:text-orange-900 mr-2 p-2 rounded-md hover:bg-orange-50">
                  <Edit class="h-4 w-4" />
                </button>
                <button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50">
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

const menuItems = ref([
  { id: 1, name: "Spaghetti Carbonara", category: "Main Courses", price: 18.5, status: "Active" },
  { id: 2, name: "Fettuccine Alfredo", category: "Main Courses", price: 17.0, status: "Active" },
  { id: 3, name: "Garlic Bread", category: "Appetizers", price: 6.0, status: "Active" },
  { id: 4, name: "Tiramisu", category: "Desserts", price: 8.0, status: "Active" },
  { id: 5, name: "Seasonal Salad", category: "Appetizers", price: 10.0, status: "Inactive" },
])
</script>
