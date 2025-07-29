import { defineStore } from 'pinia'

interface CurrencyState {
  currency: string
  exchangeRates: Record<string, number>
}

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    currency: 'USD',
    exchangeRates: {
      USD: 1,
      VND: 23000 // Example exchange rate
    }
  }),
  
  actions: {
    setCurrency(currency: string) {
      this.currency = currency
      localStorage.setItem('preferred_currency', currency)
    },
    
    formatPrice(price: number): string {
      const rate = this.exchangeRates[this.currency] ?? 1
      const amount = price * rate
      
      if (this.currency === 'USD') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)
      }
      
      if (this.currency === 'VND') {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 0
        }).format(amount)
      }
      
      return amount.toString()
    },
    
    async fetchExchangeRates() {
      try {
        // In a real app, this would fetch from an API
        // For now, we'll use hardcoded rates
        this.exchangeRates = {
          USD: 1,
          VND: 23000
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates', error)
      }
    },
    
    init() {
      const savedCurrency = localStorage.getItem('preferred_currency')
      if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'VND')) {
        this.currency = savedCurrency
      }
      
      this.fetchExchangeRates()
    }
  }
})