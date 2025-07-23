import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER'
  image?: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isStaff: (state) => state.user?.role === 'STAFF' || state.user?.role === 'ADMIN'
  },
  
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        
        this.user = response.user
        this.token = response.token
        
        // Store token in localStorage
        localStorage.setItem('auth_token', response.token)
        
        return { success: true }
      } catch (error: any) {
        this.error = error.message || 'Failed to login'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    
    async register(name: string, email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: { name, email, password }
        })
        
        return { success: true }
      } catch (error: any) {
        this.error = error.message || 'Failed to register'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    
    async fetchUser() {
      if (!localStorage.getItem('auth_token')) return
      
      this.loading = true
      
      try {
        // In a real app, this would be an API call
        const user = await $fetch('/api/auth/me')
        this.user = user
        this.token = localStorage.getItem('auth_token')
      } catch (error) {
        this.logout()
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('auth_token')
    }
  }
})