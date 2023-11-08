import { defineStore } from 'pinia'

import { exchangeRateService } from '@/services/data/exchangeRateService'

export const useExchangeRateStore = defineStore('exchangeRate', {
  state() {
    return {
      fromCurrency: 'BTC',
      toCurrency: 'USD',
    }
  },

  getters: {},

  actions: {
    currentExchangeRate() {
      return exchangeRateService.get(this.fromCurrency, this.toCurrency)
    },
  },
})
