import { useAuthStore } from '../stores/auth'
import { useCurrencyStore } from '../stores/currency'
import { useCartStore } from '../stores/cart'

export default defineNuxtPlugin({
  name: 'init-app',
  async setup() {
    // Initialize auth store
    const authStore = useAuthStore()
    await authStore.fetchUser()
    
    // Initialize currency store
    const currencyStore = useCurrencyStore()
    currencyStore.init()
    
    // Initialize cart store
    const cartStore = useCartStore()
    cartStore.loadFromLocalStorage()
  }
})