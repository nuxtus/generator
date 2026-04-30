<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const route = useRoute()
const { $directus, $readItem, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {}

const { data, error } = useAsyncData<{$ collection | camelcase $} | null>('{$ collection $}-detail', () => {
  return $directus.request($readItem('{$ collection $}', route.params.id as string, query))
})
$checkError(error)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <NuxtLink :to="`/{$ collection $}`" class="text-blue-600 hover:underline text-sm">&larr; Back to {$ collection $}</NuxtLink>

    <template v-if="data">
      <h1 class="text-3xl font-bold mt-4 mb-2">
        <template v-if="data.title">{{ data.title }}</template>
        <template v-else-if="data.name">{{ data.name }}</template>
        <template v-else>{{ data.id }}</template>
      </h1>
    </template>

    <template v-else-if="!error">
      <h1 class="text-3xl font-bold mt-4">Not found</h1>
      <p class="text-gray-500 mt-2">This item could not be found.</p>
      <NuxtLink :to="`/{$ collection $}`" class="text-blue-600 hover:underline text-sm mt-4 inline-block">&larr; Back to {$ collection $}</NuxtLink>
    </template>
  </div>
</template>
