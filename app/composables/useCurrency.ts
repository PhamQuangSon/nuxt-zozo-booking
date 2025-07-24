export const useCurrency = () => {
  const currencyStore = useCurrencyStore()

  const formatCurrency = (amount: number) => {
    const { currency, exchangeRate } = currencyStore
    
    if (currency === 'VND') {
      const vndAmount = amount * exchangeRate
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(vndAmount)
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }
  }

  return {
    formatCurrency
  }
}