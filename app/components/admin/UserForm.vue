<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? $t('admin.editUser') : $t('admin.addNewUser') }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.userName') }} *
          </label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterUserName')"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.email') }} *
          </label>
          <input 
            v-model="form.email"
            type="email" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterEmail')"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.role') }} *
          </label>
          <select 
            v-model="form.role"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{{ $t('admin.selectRole') }}</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.phone') }}
          </label>
          <input 
            v-model="form.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterPhone')"
          />
        </div>

        <div v-if="!isEdit">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('admin.password') }} *
          </label>
          <input 
            v-model="form.password"
            type="password" 
            :required="!isEdit"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            :placeholder="$t('admin.enterPassword')"
          />
        </div>

        <div class="flex space-x-3 pt-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {{ $t('common.cancel') }}
          </button>
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
          >
            {{ isSubmitting ? $t('common.saving') : (isEdit ? $t('common.update') : $t('common.save')) }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isVisible: Boolean,
  user: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const form = ref({
  name: '',
  email: '',
  role: '',
  phone: '',
  password: ''
})

watch(() => props.user, (newUser) => {
  if (newUser && props.isEdit) {
    form.value = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone || '',
      password: ''
    }
  } else {
    form.value = {
      name: '',
      email: '',
      role: '',
      phone: '',
      password: ''
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData = {
      ...form.value,
      id: props.isEdit ? props.user.id : Date.now(),
      lastLogin: props.isEdit ? props.user.lastLogin : new Date().toISOString().slice(0, 16).replace('T', ' ')
    }
    
    // Don't include password in the response for security
    if (props.isEdit) {
      delete userData.password
    }
    
    emit('save', userData)
  } catch (error) {
    console.error('Error saving user:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
