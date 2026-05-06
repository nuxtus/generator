<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const { $directus, $readItems, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {}

const { data: {$ collection $}, pending, error } = useAsyncData<{$ collection | camelcase $} | null>('{$ collection $}-singleton', async () => {
  const result = await $directus.request($readItems('{$ collection $}', query))
  return result[0] ?? null
})
watch(() => error.value, (err) => { if (err) $checkError(err) })
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div v-if="pending" class="flex justify-center py-12">
      <div class="spinner" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Failed to load {$ collection $}.</p>
    </div>

    <template v-else-if="{$ collection $}">
      <h1 class="text-3xl font-bold mb-4">
        <template v-if="{$ collection $}.title">{{ {$ collection $}.title }}</template>
        <template v-else-if="{$ collection $}.name">{{ {$ collection $}.name }}</template>
        <template v-else>{$ collection | camelcase $}</template>
      </h1>
    </template>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">No content found.</p>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #d1d5db;
  border-top-color: #3b82f6;
  border-radius: 9999px;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
