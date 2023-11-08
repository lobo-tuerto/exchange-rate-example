<script lang="ts" setup>
import { onMounted } from 'vue'

import PageContent from '@/components/content/PageContent.vue'
import ExchangeIcon from '@/components/icons/ExchangeIcon.vue'
import { useExchangeRateStore } from '@/stores/exchangeRateStore'

const exchangeRateStore = useExchangeRateStore()

onMounted(() => {
  exchangeRateStore.currentExchangeRate().then((exchangeRate) => {
    console.log('exchangeRate', exchangeRate)
  })
})
</script>

<template>
  <PageContent>
    <div class="flex flex-wrap items-center gap-x-3 text-2xl">
      <div>US Dollar</div>
      <ExchangeIcon class="h-6 shrink-0" />
      <div>Bitcoin</div>
    </div>

    <div>Exchange Rate</div>

    <table class="mt-8">
      <thead>
        <tr>
          <th>Datetime</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2023</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>
  </PageContent>
</template>
