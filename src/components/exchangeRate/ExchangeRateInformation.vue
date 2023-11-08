<script lang="ts" setup>
import { format } from 'date-fns'
import { onMounted, onUnmounted } from 'vue'

import LoadingIcon from '@/components/icons/LoadingIcon.vue'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import SlideTransitionGroup from '@/components/transitions/SlideTransitionGroup.vue'
import { useExchangeRateStore } from '@/stores/exchangeRateStore'

const exchangeRateStore = useExchangeRateStore()

onMounted(() => {
  exchangeRateStore.startPeriodicFetching()
})

onUnmounted(() => {
  exchangeRateStore.stopPeriodicFetching()
})
</script>

<template>
  <div v-if="!exchangeRateStore.latestExchangeRate">
    No values yet, please wait.
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

      <FadeTransition>
        <LoadingIcon
          v-if="exchangeRateStore.isLoading"
          class="h-6 animate-spin text-accent"
        />
      </FadeTransition>
    </div>

    <div class="mt-3 max-h-[300px] overflow-auto bg-theme-600/10">
      <table>
        <thead>
          <tr>
            <th>Fetched at</th>
            <th>Value</th>
          </tr>
        </thead>

        <SlideTransitionGroup tag="tbody">
          <tr
            v-for="er in exchangeRateStore.exchangeRates"
            :key="er.last_refreshed.toISOString()"
          >
            <td>{{ format(er.last_refreshed, 'yyyy/MM/dd HH:mm:ss') }}</td>

            <td>
              {{ new Intl.NumberFormat().format(er.exchange_rate) }}
              {{ er.to_currency_code }}
            </td>
          </tr>
        </SlideTransitionGroup>
      </table>
    </div>
  </div>
</template>
