<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const { $directus, $readItems, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {}

const { data, error } = useAsyncData<{$ collection | camelcase $}[] | null>('{$ collection $}-list', () => {
  return $directus.request($readItems('{$ collection $}', query))
})
$checkError(error)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{$ collection | camelcase $}</h1>
    <div v-if="data && data.length > 0" class="space-y-8">
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
    <p v-else>Loading...</p>
  </div>
</template>
