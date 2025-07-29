<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden relative">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10"
      >
        <X class="h-5 w-5" />
      </button>

      <!-- Image -->
      <div class="h-64 w-full">
        <img 
          :src="menuItem.image" 
          :alt="menuItem.name" 
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content -->
      <div class="p-6 pb-0">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ menuItem.name }}</h2>
        <p class="text-gray-700 mb-4">{{ menuItem.description }}</p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in menuItem.tags" 
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span class="text-3xl font-bold text-orange-600">${{ basePrice.toFixed(2) }}</span>
          <div class="flex items-center text-sm text-gray-500">
            <Star class="h-5 w-5 text-yellow-400 mr-1" />
            <span>{{ menuItem.rating }}</span>
            <span class="ml-1">({{ menuItem.reviews }})</span>
          </div>
        </div>
      </div>

      <!-- Options Section -->
      <div class="p-6 pt-0 space-y-6 max-h-[calc(100vh-30rem)] overflow-y-auto custom-scrollbar">
        <!-- Size Options -->
        <div v-if="menuItem.sizes && menuItem.sizes.length > 0">
          <h3 class="text-lg font-semibold mb-3">Size <span class="text-red-500">*</span></h3>
          <div class="space-y-2">
            <label 
              v-for="sizeOption in menuItem.sizes" 
              :key="sizeOption.name"
              :class="[
                'flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors duration-200',
                selectedSize?.name === sizeOption.name ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
              ]"
            >
              <div class="flex items-center">
                <input 
                  type="radio" 
                  :name="`size-${menuItem.id}`" 
                  :value="sizeOption.name" 
                  v-model="selectedSizeName"
                  class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <span class="ml-3 text-gray-800 font-medium">{{ sizeOption.name }}</span>
              </div>
              <span v-if="sizeOption.price > 0" class="text-gray-600">+${{ sizeOption.price.toFixed(2) }}</span>
            </label>
          </div>
        </div>

        <!-- Toppings Options -->
        <div v-if="menuItem.toppings && menuItem.toppings.length > 0">
          <h3 class="text-lg font-semibold mb-3">Toppings</h3>
          <div class="space-y-2">
            <label 
              v-for="toppingOption in menuItem.toppings" 
              :key="toppingOption.name"
              :class="[
                'flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors duration-200',
                selectedToppings.includes(toppingOption.name) ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
              ]"
            >
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  :value="toppingOption.name" 
                  v-model="selectedToppings"
                  class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span class="ml-3 text-gray-800 font-medium">{{ toppingOption.name }}</span>
              </div>
              <span v-if="toppingOption.price > 0" class="text-gray-600">+${{ toppingOption.price.toFixed(2) }}</span>
            </label>
          </div>
        </div>

        <!-- Special Instructions -->
        <div>
          <h3 class="text-lg font-semibold mb-3">Special Instructions</h3>
          <textarea 
            v-model="specialInstructions"
            rows="3"
            placeholder="e.g., no onions, extra spicy, allergic to nuts..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>
      </div>

      <!-- Footer with Quantity and Add to Cart Button -->
      <div class="p-6 border-t border-gray-100 flex items-center justify-between">
        <!-- Quantity Controls -->
        <div class="flex items-center space-x-4">
          <button 
            @click="decreaseQuantity"
            :disabled="quantity === 0"
            class="w-10 h-10 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus class="h-5 w-5" />
          </button>
          <span class="text-2xl font-bold min-w-[3rem] text-center">{{ quantity }}</span>
          <button 
            @click="increaseQuantity"
            class="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
          >
            <Plus class="h-5 w-5" />
          </button>
        </div>

        <!-- Add to Cart Button -->
        <button 
          @click="addToCartAndClose"
          :disabled="!canAddToCart"
          :class="[
            'flex-1 ml-6 py-3 rounded-lg font-semibold transition-colors duration-200',
            canAddToCart
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          {{ quantity === 0 ? 'Add to Cart' : `Add ${quantity} to Cart - $${totalPrice.toFixed(2)}` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  menuItem: {
    type: Object,
    required: true
  },
  initialQuantity: {
    type: Number,
    default: 0
  },
  // New props for initial selections if editing an existing cart item
  initialSelectedSize: {
    type: String,
    default: null
  },
  initialSelectedToppings: {
    type: Array,
    default: () => []
  },
  initialSpecialInstructions: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'update-cart'])

const quantity = ref(props.initialQuantity)
const selectedSizeName = ref(props.initialSelectedSize)
const selectedToppings = ref([...props.initialSelectedToppings])
const specialInstructions = ref(props.initialSpecialInstructions)

// Reset state when dialog opens for a new item or initial quantity changes
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    quantity.value = props.initialQuantity
    selectedSizeName.value = props.initialSelectedSize || (props.menuItem.sizes && props.menuItem.sizes.length > 0 ? props.menuItem.sizes[0].name : null)
    selectedToppings.value = [...props.initialSelectedToppings]
    specialInstructions.value = props.initialSpecialInstructions
  }
})

// Computed properties for price calculation
const basePrice = computed(() => props.menuItem.price)

const selectedSize = computed(() => {
  return props.menuItem.sizes?.find(s => s.name === selectedSizeName.value) || null
})

const sizePrice = computed(() => {
  return selectedSize.value?.price || 0
})

const toppingsPrice = computed(() => {
  return selectedToppings.value.reduce((sum, toppingName) => {
    const topping = props.menuItem.toppings?.find(t => t.name === toppingName)
    return sum + (topping?.price || 0)
  }, 0)
})

const itemUnitPrice = computed(() => {
  return basePrice.value + sizePrice.value + toppingsPrice.value
})

const totalPrice = computed(() => {
  return itemUnitPrice.value * quantity.value
})

const canAddToCart = computed(() => {
  if (quantity.value === 0) return false;
  // If sizes are available, a size must be selected
  if (props.menuItem.sizes && props.menuItem.sizes.length > 0 && !selectedSizeName.value) {
    return false;
  }
  return true;
});

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 0) {
    quantity.value--
  }
}

const addToCartAndClose = () => {
  if (!canAddToCart.value) return;

  emit('update-cart', { 
    item: props.menuItem, 
    quantity: quantity.value,
    options: {
      size: selectedSize.value,
      toppings: selectedToppings.value.map(name => props.menuItem.toppings.find(t => t.name === name)),
      instructions: specialInstructions.value
    },
    unitPrice: itemUnitPrice.value // Pass the calculated unit price
  })
  emit('close')
}
</script>

<style scoped>
/* Custom scrollbar for options section */
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
</style>