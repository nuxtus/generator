<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const { $directus, $readItems, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {}

const { data: {$ collection $}, error } = useAsyncData<{$ collection | camelcase $} | null>('{$ collection $}-singleton', () => {
  return $directus.request($readItems('{$ collection $}', query))
})
$checkError(error)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <template v-if="{$ collection $}">
      <h1 class="text-3xl font-bold mb-4">
        <template v-if="${$ collection $}.title">{{ {$ collection $}.title }}</template>
        <template v-else-if="${$ collection $}.name">{{ {$ collection $}.name }}</template>
        <template v-else>{$ collection | camelcase $}</template>
      </h1>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>
