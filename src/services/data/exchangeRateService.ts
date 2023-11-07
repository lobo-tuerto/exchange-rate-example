import { baseService } from './baseService'

const exchangeRateService = {
  get() {
    return baseService.get('query', {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: 'BTC',
        to_currency: 'USD',
        apikey: import.meta.env.VITE_API_KEY,
      },
    })
  },
}

export { exchangeRateService }
