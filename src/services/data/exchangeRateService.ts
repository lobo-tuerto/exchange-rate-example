import { zonedTimeToUtc } from 'date-fns-tz'
import { cloneDeep } from 'lodash-es'

import { baseService } from './baseService'

interface OriginalExchangeRate {
  Information?: string
  'Realtime Currency Exchange Rate': {
    '1. From_Currency Code': string
    '2. From_Currency Name': string
    '3. To_Currency Code': string
    '4. To_Currency Name': string
    '5. Exchange Rate': string
    '6. Last Refreshed': string
    '7. Time Zone': string
    '8. Bid Price': string
    '9. Ask Price': string
  }
}

export interface ExchangeRate {
  from_currency_code: string
  from_currency_name: string
  to_currency_code: string
  to_currency_name: string
  exchange_rate: number
  last_refreshed: Date
  time_zone: string
  bid_price: number
  ask_price: number
}

function exampleExchangeRate() {
  const newDate = new Date().toISOString().replace('Z', '')

  const currentExample = cloneDeep(example)
  currentExample['Realtime Currency Exchange Rate']['6. Last Refreshed'] =
    newDate

  return currentExample
}

export function massageExchangeRate(er: OriginalExchangeRate): ExchangeRate {
  // NOTE: we hit the rate limit for the API_KEY, return an example value
  if (!er['Realtime Currency Exchange Rate'] && er.Information) {
    er = exampleExchangeRate()
  }

  return {
    from_currency_code:
      er['Realtime Currency Exchange Rate']['1. From_Currency Code'],
    from_currency_name:
      er['Realtime Currency Exchange Rate']['2. From_Currency Name'],
    to_currency_code:
      er['Realtime Currency Exchange Rate']['3. To_Currency Code'],
    to_currency_name:
      er['Realtime Currency Exchange Rate']['4. To_Currency Name'],
    exchange_rate: parseFloat(
      er['Realtime Currency Exchange Rate']['5. Exchange Rate'],
    ),
    last_refreshed: zonedTimeToUtc(
      er['Realtime Currency Exchange Rate']['6. Last Refreshed'],
      er['Realtime Currency Exchange Rate']['7. Time Zone'],
    ),
    time_zone: er['Realtime Currency Exchange Rate']['7. Time Zone'],
    bid_price: parseFloat(
      er['Realtime Currency Exchange Rate']['8. Bid Price'],
    ),
    ask_price: parseFloat(
      er['Realtime Currency Exchange Rate']['9. Ask Price'],
    ),
  }
}

const exchangeRateService = {
  get(fromCurrency: string, toCurrency: string) {
    return baseService
      .get('query', {
        params: {
          function: 'CURRENCY_EXCHANGE_RATE',
          from_currency: fromCurrency,
          to_currency: toCurrency,
          apikey: import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        return massageExchangeRate(res.data)
      })
  },
}

export { exchangeRateService }

// NOTE: non-premium API_KEYs are limited to 25 requests per day
// Let's define a backup data example
const example: OriginalExchangeRate = {
  'Realtime Currency Exchange Rate': {
    '1. From_Currency Code': 'BTC',
    '2. From_Currency Name': 'Bitcoin',
    '3. To_Currency Code': 'USD',
    '4. To_Currency Name': 'United States Dollar',
    '5. Exchange Rate': '35255.33000000',
    '6. Last Refreshed': '2023-11-08 15:19:01',
    '7. Time Zone': 'UTC',
    '8. Bid Price': '35255.33000000',
    '9. Ask Price': '35255.34000000',
  },
}
