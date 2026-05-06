<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const route = useRoute()
const { $directus, $readItem, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {}

const { data, pending, error } = useAsyncData<{$ collection | camelcase $} | null>('{$ collection $}-detail', () => {
  return $directus.request($readItem('{$ collection $}', route.params.id as string, query))
})
watch(() => error.value, (err) => { if (err) $checkError(err) })
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <NuxtLink :to="`/{$ collection $}`" class="text-blue-600 hover:underline text-sm">&larr; Back to {$ collection $}</NuxtLink>

    <div v-if="pending" class="flex justify-center py-12">
      <div class="spinner" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Failed to load item.</p>
      <NuxtLink :to="`/{$ collection $}`" class="text-blue-600 hover:underline text-sm mt-4 inline-block">&larr; Back to {$ collection $}</NuxtLink>
    </div>

    <template v-else-if="data">
      <h1 class="text-3xl font-bold mt-4 mb-2">
        <template v-if="data.title">{{ data.title }}</template>
        <template v-else-if="data.name">{{ data.name }}</template>
        <template v-else>{{ data.id }}</template>
      </h1>
    </template>

    <div v-else class="text-center py-12">
      <h1 class="text-3xl font-bold">Not found</h1>
      <p class="text-gray-500 mt-2">This item could not be found.</p>
      <NuxtLink :to="`/{$ collection $}`" class="text-blue-600 hover:underline text-sm mt-4 inline-block">&larr; Back to {$ collection $}</NuxtLink>
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
