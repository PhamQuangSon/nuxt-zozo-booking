<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft class="h-5 w-5 mr-2" />
            Back
          </button>
          <div class="text-center">
            <h1 class="text-lg font-semibold">{{ restaurant.name }}</h1>
            <p class="text-sm text-gray-500">Table {{ bookingData?.tableNumber }} • {{ bookingData?.date }} • {{ bookingData?.time }}</p>
          </div>
          <button @click="showCartDialog = true" class="relative p-2">
            <ShoppingCart class="h-6 w-6 text-gray-600" />
            <span v-if="cartItemsCount > 0" class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartItemsCount }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-3">
          <button 
            @click="selectedCategory = 'all'"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              selectedCategory === 'all' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            All Items
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              selectedCategory === category.id 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- Search -->
        <div class="mt-4 relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search menu items..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <!-- Menu Items -->
      <div class="space-y-4">
        <div 
          v-for="item in filteredMenuItems" 
          :key="item.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex">
            <div class="flex-1 p-6 cursor-pointer" @click="openMenuItemDetail(item)">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ item.name }}</h3>
                  <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ item.description }}</p>
                  
                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span 
                      v-for="tag in item.tags" 
                      :key="tag"
                      class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <span class="text-xl font-bold text-orange-600">${{ item.price.toFixed(2) }}</span>
                      <div class="flex items-center text-sm text-gray-500">
                        <Star class="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{{ item.rating }}</span>
                        <span class="ml-1">({{ item.reviews }})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Food Image and Add/Remove -->
            <div class="w-32 h-32 flex-shrink-0 relative">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="w-full h-full object-cover"
              />
              <!-- Quick Add button if no options or default options are selected -->
              <div class="absolute bottom-2 right-2">
                <div v-if="!item.sizes && !item.toppings">
                  <div v-if="getItemQuantity(item.id) === 0">
                    <button 
                      @click="addToCart(item)"
                      class="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <div v-else class="flex items-center space-x-1 bg-white rounded-lg shadow-md p-1">
                    <button 
                      @click="decreaseQuantity(item.id)"
                      class="w-6 h-6 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50"
                    >
                      <Minus class="h-3 w-3" />
                    </button>
                    <span class="font-semibold text-sm min-w-[1.5rem] text-center">{{ getItemQuantity(item.id) }}</span>
                    <button 
                      @click="increaseQuantity(item.id)"
                      class="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                    >
                      <Plus class="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div v-else>
                  <!-- If item has options, always open dialog for adding -->
                  <button 
                    @click="openMenuItemDetail(item)"
                    class="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors duration-200"
                  >
                    Select Options
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredMenuItems.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <Search class="h-16 w-16 mx-auto" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p class="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    </div>

    <!-- Floating Cart Button -->
    <div v-if="cartItemsCount > 0" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <button 
        @click="showCartDialog = true"
        class="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-200 flex items-center space-x-2"
      >
        <ShoppingCart class="h-5 w-5" />
        <span>{{ cartItemsCount }} items • ${{ cartTotal.toFixed(2) }}</span>
        <span>Checkout</span>
      </button>
    </div>

    <!-- Registration Popup -->
    <div v-if="showRegistrationPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User class="h-8 w-8 text-orange-500" />
          </div>
          <h3 class="text-lg font-semibold mb-2">Complete Your Order</h3>
          <p class="text-gray-600">Please provide your details to continue</p>
        </div>

        <form @submit.prevent="completeRegistration" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input 
              v-model="userInfo.name"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input 
              v-model="userInfo.email"
              type="email" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input 
              v-model="userInfo.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div class="flex space-x-3 pt-4">
            <button 
              type="button"
              @click="showRegistrationPopup = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="!userInfo.name || !userInfo.email"
              :class="[
                'flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200',
                userInfo.name && userInfo.email
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Order Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="h-8 w-8 text-green-500" />
          </div>
          <h3 class="text-lg font-semibold mb-2">Order Confirmed!</h3>
          <p class="text-gray-600 mb-4">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <p class="text-sm text-gray-500 mb-6">
            Order ID: #{{ orderId }}
          </p>
          <button 
            @click="goToHome"
            class="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Item Detail Dialog -->
    <MenuItemDetailDialog 
      :isVisible="showMenuItemDetailDialog"
      :menuItem="selectedMenuItem"
      :initialQuantity="selectedMenuItem ? getItemQuantity(selectedMenuItem.id, selectedMenuItemOptions) : 0"
      :initialSelectedSize="selectedMenuItemOptions?.size?.name"
      :initialSelectedToppings="selectedMenuItemOptions?.toppings?.map(t => t.name) || []"
      :initialSpecialInstructions="selectedMenuItemOptions?.instructions || ''"
      @close="closeMenuItemDetail"
      @update-cart="updateCartFromDialog"
      v-if="selectedMenuItem"
    />

    <!-- Cart Dialog -->
    <CartDialog
      :isVisible="showCartDialog"
      :cartItems="cart"
      :cartTotal="cartTotal"
      @close="showCartDialog = false"
      @update-item-quantity="updateCartItemQuantity"
      @proceed-to-checkout="handleProceedToCheckoutFromCart"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeft, ShoppingCart, Search, Star, Plus, Minus, 
  User, CheckCircle 
} from 'lucide-vue-next'
import MenuItemDetailDialog from '@/components/MenuItemDetailDialog.vue'
import CartDialog from '@/components/CartDialog.vue' // Import the new CartDialog

const route = useRoute()
const router = useRouter()

// Reactive data
const bookingData = ref(null)
const selectedCategory = ref('all')
const searchQuery = ref('')
const cart = ref([])
const showRegistrationPopup = ref(false)
const showSuccessModal = ref(false)
const orderId = ref('')
const isUserRegistered = ref(false)

const userInfo = ref({
  name: '',
  email: '',
  phone: ''
})

const restaurant = ref({
  name: 'Sakura Japanese Restaurant',
  location: 'Downtown District'
})

// Dialog specific states
const showMenuItemDetailDialog = ref(false)
const selectedMenuItem = ref(null)
const selectedMenuItemOptions = ref(null) // To store options of the item being edited/viewed

// Cart Dialog specific state
const showCartDialog = ref(false)

// Categories
const categories = ref([
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'sushi', name: 'Sushi & Sashimi' },
  { id: 'mains', name: 'Main Dishes' },
  { id: 'noodles', name: 'Noodles & Rice' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Beverages' }
])

// Menu items (updated with sizes and toppings)
const menuItems = ref([
  {
    id: 1,
    name: 'Salmon Teriyaki',
    description: 'Grilled salmon glazed with our signature teriyaki sauce, served with steamed rice and vegetables. A perfect blend of sweet and savory flavors.',
    price: 24.99,
    image: '/placeholder.svg?height=120&width=120&text=Salmon Teriyaki',
    category: 'mains',
    rating: 4.8,
    reviews: 124,
    tags: ['Popular', 'Gluten-free option'],
    sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 5.00 }
    ],
    toppings: [
      { name: 'Extra Teriyaki Sauce', price: 1.00 },
      { name: 'Avocado Slices', price: 2.50 }
    ]
  },
  {
    id: 2,
    name: 'Dragon Roll',
    description: 'Tempura shrimp, cucumber, topped with eel, avocado, and a drizzle of sweet eel sauce. A visually stunning and delicious sushi roll.',
    price: 16.99,
    image: '/placeholder.svg?height=120&width=120&text=Dragon Roll',
    category: 'sushi',
    rating: 4.9,
    reviews: 89,
    tags: ['Chef Special', 'Popular'],
    toppings: [
      { name: 'Extra Eel Sauce', price: 0.50 },
      { name: 'Spicy Mayo', price: 0.75 }
    ]
  },
  {
    id: 3,
    name: 'Chicken Gyoza',
    description: 'Pan-fried dumplings filled with seasoned ground chicken and finely chopped vegetables, served with a savory dipping sauce.',
    price: 8.99,
    image: '/placeholder.svg?height=120&width=120&text=Chicken Gyoza',
    category: 'appetizers',
    rating: 4.7,
    reviews: 156,
    tags: ['Appetizer', 'Crispy']
  },
  {
    id: 4,
    name: 'Beef Ramen',
    description: 'Rich and creamy tonkotsu broth with tender slices of slow-cooked beef, a perfectly soft-boiled egg, fresh scallions, and bamboo shoots.',
    price: 18.99,
    image: '/placeholder.svg?height=120&width=120&text=Beef Ramen',
    category: 'noodles',
    rating: 4.6,
    reviews: 203,
    tags: ['Comfort Food', 'Hearty'],
    sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 4.00 }
    ],
    toppings: [
      { name: 'Extra Beef', price: 3.00 },
      { name: 'Extra Egg', price: 1.50 },
      { name: 'Nori Seaweed', price: 1.00 }
    ]
  },
  {
    id: 5,
    name: 'Miso Soup',
    description: 'Traditional Japanese soup made from fermented soybean paste, delicate tofu cubes, fresh seaweed, and thinly sliced green onions.',
    price: 4.99,
    image: '/placeholder.svg?height=120&width=120&text=Miso Soup',
    category: 'appetizers',
    rating: 4.5,
    reviews: 78,
    tags: ['Traditional', 'Vegetarian']
  },
  {
    id: 6,
    name: 'Mochi Ice Cream',
    description: 'A delightful dessert featuring sweet, chewy rice cake (mochi) wrapped around a scoop of premium ice cream. Available in multiple flavors.',
    price: 6.99,
    image: '/placeholder.svg?height=120&width=120&text=Mochi Ice Cream',
    category: 'desserts',
    rating: 4.8,
    reviews: 92,
    tags: ['Sweet', 'Cold']
  },
  {
    id: 7,
    name: 'Green Tea',
    description: 'Authentic Japanese green tea, brewed to perfection. Choose between a soothing hot cup or a refreshing iced version.',
    price: 3.99,
    image: '/placeholder.svg?height=120&width=120&text=Green Tea',
    category: 'drinks',
    rating: 4.4,
    reviews: 45,
    tags: ['Traditional', 'Healthy']
  },
  {
    id: 8,
    name: 'Chirashi Bowl',
    description: 'A vibrant assortment of fresh, thinly sliced sashimi (chef\'s choice) artfully arranged over a bed of perfectly seasoned sushi rice, accompanied by wasabi and pickled ginger.',
    price: 22.99,
    image: '/placeholder.svg?height=120&width=120&text=Chirashi Bowl',
    category: 'sushi',
    rating: 4.9,
    reviews: 67,
    tags: ['Fresh', 'Premium']
  }
])

// Computed
const filteredMenuItems = computed(() => {
  let filtered = menuItems.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

const cartItemsCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.unitPrice * item.quantity), 0)
})

// Methods
// This function now needs to consider options to correctly identify a cart item
const getItemQuantity = (itemId, options = {}) => {
  const cartItem = cart.value.find(item => 
    item.id === itemId && 
    JSON.stringify(item.options || {}) === JSON.stringify(options || {})
  )
  return cartItem ? cartItem.quantity : 0
}

// For items without options, quick add/remove
const addToCart = (item) => {
  // For items without options, we can directly add/increment
  if (!item.sizes && !item.toppings) {
    const existingItem = cart.value.find(cartItem => cartItem.id === item.id && !cartItem.options)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...item, quantity: 1, unitPrice: item.price, options: {} })
    }
  } else {
    // If item has options, force opening the dialog
    openMenuItemDetail(item)
  }
}

const increaseQuantity = (itemId) => {
  // This is for items without options
  const cartItem = cart.value.find(item => item.id === itemId && !item.options)
  if (cartItem) {
    cartItem.quantity += 1
  }
}

const decreaseQuantity = (itemId) => {
  // This is for items without options
  const cartItem = cart.value.find(item => item.id === itemId && !item.options)
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1
    } else {
      cart.value = cart.value.filter(item => !(item.id === itemId && !item.options))
    }
  }
}

const openMenuItemDetail = (item, existingCartItem = null) => {
  selectedMenuItem.value = item
  // If editing an existing item, pass its options
  if (existingCartItem) {
    selectedMenuItemOptions.value = existingCartItem.options
  } else {
    // If adding a new item, set default options or null
    selectedMenuItemOptions.value = null
  }
  showMenuItemDetailDialog.value = true
}

const closeMenuItemDetail = () => {
  showMenuItemDetailDialog.value = false
  selectedMenuItem.value = null
  selectedMenuItemOptions.value = null
}

const updateCartFromDialog = ({ item, quantity, options, unitPrice }) => {
  // Find if an item with the exact same ID and options already exists in the cart
  const existingItemIndex = cart.value.findIndex(cartItem => 
    cartItem.id === item.id && 
    JSON.stringify(cartItem.options || {}) === JSON.stringify(options || {})
  )

  if (quantity > 0) {
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      cart.value[existingItemIndex].quantity = quantity
      cart.value[existingItemIndex].unitPrice = unitPrice // Update price in case options changed
    } else {
      // Add new item to cart
      cart.value.push({ ...item, quantity: quantity, options: options, unitPrice: unitPrice })
    }
  } else {
    // Remove item if quantity is 0
    if (existingItemIndex !== -1) {
      cart.value.splice(existingItemIndex, 1)
    }
  }
}

// New method to handle quantity updates from CartDialog
const updateCartItemQuantity = ({ item, quantity }) => {
  const existingItemIndex = cart.value.findIndex(cartItem => 
    cartItem.id === item.id && 
    JSON.stringify(cartItem.options || {}) === JSON.stringify(item.options || {})
  )

  if (existingItemIndex !== -1) {
    if (quantity > 0) {
      cart.value[existingItemIndex].quantity = quantity
    } else {
      cart.value.splice(existingItemIndex, 1)
    }
  }
}

const handleProceedToCheckoutFromCart = () => {
  showCartDialog.value = false // Close cart dialog
  proceedToCheckout() // Call the existing checkout logic
}

const proceedToCheckout = () => {
  if (!isUserRegistered.value) {
    showRegistrationPopup.value = true
  } else {
    completeOrder()
  }
}

const completeRegistration = () => {
  if (userInfo.value.name && userInfo.value.email) {
    isUserRegistered.value = true
    showRegistrationPopup.value = false
    completeOrder()
  }
}

const completeOrder = async () => {
  // Simulate order processing
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Generate order ID
  orderId.value = 'ORD' + Date.now().toString().slice(-6)
  
  // Clear cart
  cart.value = []
  
  // Show success modal
  showSuccessModal.value = true
}

const goBack = () => {
  if (bookingData.value) {
    router.push(`/restaurants/${bookingData.value.restaurantId}`)
  } else {
    router.go(-1)
  }
}

const goToHome = () => {
  router.push('/')
}

// Initialize booking data
onMounted(() => {
  // Try to get data from sessionStorage first
  const storedData = sessionStorage.getItem('bookingData')
  if (storedData) {
    bookingData.value = JSON.parse(storedData)
    return
  }
  
  // Fallback: construct from query parameters
  const { restaurantId, tableId, date, time } = route.query
  
  if (restaurantId && tableId && date && time) {
    bookingData.value = {
      restaurantId,
      tableId: parseInt(tableId),
      tableNumber: parseInt(tableId),
      date,
      time
    }
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>