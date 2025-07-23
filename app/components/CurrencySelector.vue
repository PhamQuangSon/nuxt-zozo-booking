<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 text-sm text-gray-700 hover:text-primary focus:outline-none"
    >
      <span>{{ currentCurrency }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <button 
        v-for="currency in currencies" 
        :key="currency.code"
        @click="selectCurrency(currency.code)"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        :class="{ 'font-medium': currentCurrency === currency.code }"
      >
        {{ currency.code }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCurrencyStore } from '~/stores/currency'

const currencyStore = useCurrencyStore()
const isOpen = ref(false)

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'VND', symbol: '₫' }
]

const currentCurrency = computed(() => currencyStore.currency)

function selectCurrency(code) {
  currencyStore.setCurrency(code)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (isOpen.value && !event.target.closest('.currency-selector')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>