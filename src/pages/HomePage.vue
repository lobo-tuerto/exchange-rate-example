<script lang="ts" setup>
import PageContent from '@/components/content/PageContent.vue'
import ExchangeRateInformation from '@/components/exchangeRate/ExchangeRateInformation.vue'
import ExchangeIcon from '@/components/icons/ExchangeIcon.vue'
import { useExchangeRateStore } from '@/stores/exchangeRateStore'

const exchangeRateStore = useExchangeRateStore()
</script>

<template>
  <PageContent>
    <div class="text-lg font-medium">Exchange Rate</div>

    <div class="mt-3 flex flex-wrap items-center gap-x-3 text-2xl">
      <div class="flex flex-col">
        <div>{{ exchangeRateStore.fromCurrency }}</div>

        <div class="text-sm">
          {{ exchangeRateStore.latestExchangeRate?.from_currency_name }}
        </div>
      </div>

      <ExchangeIcon class="h-6 shrink-0" />

      <div class="flex flex-col">
        <div>{{ exchangeRateStore.toCurrency }}</div>

        <div class="text-sm">
          {{ exchangeRateStore.latestExchangeRate?.to_currency_name }}
        </div>
      </div>
    </div>

    <ExchangeRateInformation />
  </PageContent>
</template>
