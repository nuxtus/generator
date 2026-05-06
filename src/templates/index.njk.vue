<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const { $directus, $readItems, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {}

const { data, pending, error } = useAsyncData<{$ collection | camelcase $}[] | null>('{$ collection $}-list', () => {
  return $directus.request($readItems('{$ collection $}', query))
})
watch(() => error.value, (err) => { if (err) $checkError(err) })
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{$ collection | camelcase $}</h1>

    <div v-if="pending" class="flex justify-center py-12">
      <div class="spinner" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Failed to load items.</p>
    </div>

    <div v-else-if="data && data.length > 0" class="space-y-8">
      <article v-for="item in data" :key="item.id" class="border-b border-gray-200 pb-8">
        <NuxtLink :to="`/{$ collection $}/${item.id}`" class="group">
          <h2 class="text-xl font-semibold group-hover:text-blue-600 transition-colors">
            <template v-if="item.title">{{ item.title }}</template>
            <template v-else-if="item.name">{{ item.name }}</template>
            <template v-else>{{ item.id }}</template>
          </h2>
        </NuxtLink>
      </article>
    </div>

    <p v-else-if="data && data.length === 0" class="text-gray-500">No {$ collection $} found.</p>
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
