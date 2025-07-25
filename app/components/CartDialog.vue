<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full flex flex-col h-[90vh] relative">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold">Your Cart ({{ cartItemsCount }} items)</h2>
        <button @click="$emit('close')" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Cart Items List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <div v-if="cartItems.length === 0" class="text-center py-12 text-gray-500">
          <ShoppingCart class="h-16 w-16 mx-auto mb-4" />
          <p class="text-lg">Your cart is empty.</p>
          <p class="text-sm">Add some delicious items!</p>
        </div>
        <div 
          v-for="(item, index) in cartItems" 
          :key="item.id + '-' + index + '-' + JSON.stringify(item.options)" 
          class="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0"
        >
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-20 h-20 object-cover rounded-md flex-shrink-0"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
            <p v-if="item.options?.size" class="text-sm text-gray-600">Size: {{ item.options.size.name }}</p>
            <p v-if="item.options?.toppings?.length" class="text-sm text-gray-600">
              Toppings: {{ item.options.toppings.map(t => t.name).join(', ') }}
            </p>
            <p v-if="item.options?.instructions" class="text-sm text-gray-600 italic line-clamp-1">
              "{{ item.options.instructions }}"
            </p>
            <p class="text-sm text-gray-800 font-medium">${{ item.unitPrice.toFixed(2) }}</p>
          </div>
          <div class="flex items-center space-x-2 flex-shrink-0">
            <button 
              @click="decreaseQuantity(item)"
              class="w-7 h-7 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50"
            >
              <Minus class="h-4 w-4" />
            </button>
            <span class="font-semibold min-w-[1.5rem] text-center">{{ item.quantity }}</span>
            <button 
              @click="increaseQuantity(item)"
              class="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
            >
              <Plus class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-semibold">Total:</span>
          <span class="text-2xl font-bold text-orange-600">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button 
          @click="$emit('proceed-to-checkout')"
          :disabled="cartItems.length === 0"
          :class="[
            'w-full py-3 rounded-lg font-semibold transition-colors duration-200',
            cartItems.length > 0
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { X, ShoppingCart, Plus, Minus } from 'lucide-vue-next'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  cartItems: {
    type: Array,
    required: true
  },
  cartTotal: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'update-item-quantity', 'proceed-to-checkout'])

const cartItemsCount = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.quantity, 0)
})

const increaseQuantity = (item) => {
  emit('update-item-quantity', { item, quantity: item.quantity + 1 })
}

const decreaseQuantity = (item) => {
  emit('update-item-quantity', { item, quantity: item.quantity - 1 })
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>