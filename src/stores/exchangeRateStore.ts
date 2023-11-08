import { filter, head } from 'lodash-es'
import { defineStore } from 'pinia'

import {
  ExchangeRate,
  exchangeRateService,
} from '@/services/data/exchangeRateService'

export const useExchangeRateStore = defineStore('exchangeRate', {
  state() {
    return {
      exchangeRates: [] as Array<ExchangeRate>,
      fetchError: false,
      fromCurrency: 'BTC',
      isLoading: false,
      toCurrency: 'USD',
    }
  },

  getters: {
    currentExchangeRates(): Array<ExchangeRate> {
      return filter(this.exchangeRates, {
        from_currency_code: this.fromCurrency,
        to_currency_code: this.toCurrency,
      })
    },
    latestExchangeRate(): ExchangeRate | undefined {
      return head(this.currentExchangeRates)
    },
  },

  actions: {
    fetchExchangeRate() {
      this.isLoading = true

      return exchangeRateService
        .get(this.fromCurrency, this.toCurrency)
        .then((res) => {
          if (res.last_refreshed !== this.latestExchangeRate?.last_refreshed) {
            this.exchangeRates.unshift(res)
          }

          this.fetchError = false

          return res
        })
        .catch((err) => {
          console.warn('err', err)
          this.fetchError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
