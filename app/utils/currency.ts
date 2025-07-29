// import { useCurrencyStore } from '../stores/currency'

export function formatPrice(price: number): string {
  const currencyStore = useCurrencyStore()
  return currencyStore.formatPrice(price)
}

export function formatPriceWithCurrency(price: number, currency: string): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }
  
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price * 23000) // Example exchange rate
  }
  
  return price.toString()
}