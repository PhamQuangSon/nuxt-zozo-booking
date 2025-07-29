import { defineStore } from 'pinia'

interface CartItem {
  id: string
  menuItemId: number
  name: string
  price: number
  quantity: number
  options: CartItemOption[]
  notes?: string
}

interface CartItemOption {
  id: number
  name: string
  choiceId: number
  choiceName: string
  priceAdjustment: number
}

interface CartState {
  items: CartItem[]
  restaurantId: number | null
  tableId: number | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    restaurantId: null,
    tableId: null
  }),
  
  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    subtotal: (state) => {
      return state.items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity
        const optionsTotal = item.options.reduce((optSum, opt) => optSum + opt.priceAdjustment, 0) * item.quantity
        return sum + itemTotal + optionsTotal
      }, 0)
    },
    
    tax: (state, getters: any) => getters.subtotal * 0.1, // 10% tax
    
    total: (state, getters: any) => getters.subtotal + getters.tax,
    
    isEmpty: (state) => state.items.length === 0
  },
  
  actions: {
    addItem(item: Omit<CartItem, 'id'>) {
      // Generate a unique ID for the cart item
      const id = Date.now().toString()
      
      // Check if the item already exists with the same options
      const existingItemIndex = this.items.findIndex(i => {
        if (i.menuItemId !== item.menuItemId) return false
        if (i.notes !== item.notes) return false
        
        // Check if options match
        if (i.options.length !== item.options.length) return false
        
        return i.options.every(opt1 => {
          return item.options.some(opt2 => 
            opt1.choiceId === opt2.choiceId && 
            opt1.id === opt2.id
          )
        })
      })
      
      if (existingItemIndex >= 0) {
        // Increment quantity of existing item
        this.items[existingItemIndex].quantity += item.quantity
      } else {
        // Add new item to cart
        this.items.push({ ...item, id })
      }
      
      this.saveToLocalStorage()
    },
    
    updateItemQuantity(id: string, quantity: number) {
      const index = this.items.findIndex(item => item.id === id)
      if (index >= 0) {
        if (quantity <= 0) {
          this.removeItem(id)
        } else {
          this.items[index].quantity = quantity
        }
        this.saveToLocalStorage()
      }
    },
    
    removeItem(id: string) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveToLocalStorage()
    },
    
    setRestaurantAndTable(restaurantId: number, tableId: number) {
      // If changing restaurants, clear the cart
      if (this.restaurantId !== null && this.restaurantId !== restaurantId) {
        this.clearCart()
      }
      
      this.restaurantId = restaurantId
      this.tableId = tableId
      this.saveToLocalStorage()
    },
    
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify({
        items: this.items,
        restaurantId: this.restaurantId,
        tableId: this.tableId
      }))
    },
    
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart)
          this.items = parsed.items || []
          this.restaurantId = parsed.restaurantId
          this.tableId = parsed.tableId
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e)
        }
      }
    }
  }
})