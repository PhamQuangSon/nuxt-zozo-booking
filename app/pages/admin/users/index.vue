<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">User Management</h1>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4">All Users</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.lastLogin }}</td>
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

const users = ref([
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", lastLogin: "2025-07-25 10:00" },
  { id: 2, name: "Regular Customer", email: "customer@example.com", role: "Customer", lastLogin: "2025-07-24 15:30" },
  { id: 3, name: "Restaurant Manager", email: "manager@example.com", role: "Manager", lastLogin: "2025-07-25 09:00" },
])
</script>
