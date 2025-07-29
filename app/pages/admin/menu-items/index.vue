<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Menu Items</h1>
      <button class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center">
        <PlusCircle class="mr-2 h-4 w-4" /> Add New Item
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">All Menu Items</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in menuItems" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ item.price.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.restaurant }}</td>
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
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'admin',
})

const menuItems = ref([
  { id: 1, name: "Spaghetti Carbonara", category: "Main Courses", price: 18.5, restaurant: "Pasta Paradise" },
  { id: 2, name: "California Roll", category: "Sushi", price: 12.0, restaurant: "Sushi Symphony" },
  { id: 3, name: "Cheeseburger", category: "Main Courses", price: 14.0, restaurant: "Burger Bliss" },
  { id: 4, name: "Tiramisu", category: "Desserts", price: 8.0, restaurant: "Pasta Paradise" },
])
</script>
