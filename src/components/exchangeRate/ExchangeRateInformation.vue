<script lang="ts" setup>
import { format } from 'date-fns'
import { onMounted, onUnmounted } from 'vue'

import LoadingIcon from '@/components/icons/LoadingIcon.vue'
import { useExchangeRateStore } from '@/stores/exchangeRateStore'

const exchangeRateStore = useExchangeRateStore()

let intervalId: ReturnType<typeof setInterval> | undefined = undefined

onMounted(() => {
  exchangeRateStore.fetchExchangeRate()

  intervalId = setInterval(() => {
    exchangeRateStore.fetchExchangeRate()
  }, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div v-if="!exchangeRateStore.latestExchangeRate">
    No values to present yet...
  </div>

  <div v-else>
    <div class="mt-8 flex items-center gap-3 text-lg font-medium">
      1 {{ exchangeRateStore.fromCurrency }} =
      {{
        new Intl.NumberFormat().format(
          exchangeRateStore.latestExchangeRate.exchange_rate,
        )
      }}
      {{ exchangeRateStore.latestExchangeRate.to_currency_code }}

      <LoadingIcon
        v-if="exchangeRateStore.isLoading"
        class="h-6 animate-spin text-accent"
      />
    </div>

    <div class="mt-3 max-h-[200px] overflow-auto bg-theme-600/10">
      <table>
        <thead>
          <tr>
            <th>Fetched at</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(er, index) in exchangeRateStore.exchangeRates"
            :key="index"
          >
            <td>{{ format(er.last_refreshed, 'yyyy/MM/dd HH:mm:ss') }}</td>
            <td>
              {{ new Intl.NumberFormat().format(er.exchange_rate) }}
              {{ er.to_currency_code }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
