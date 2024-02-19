<script setup lang="ts">
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const route = useRoute()
const { $directus, $readItem, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {
  // Add your filters and query customisations here
}

const { data: {$ collection $}, error } = useAsyncData < {$ collection | camelcase $} | null > ('{$ collection $}', () => {
  return $directus.request($readItem('{$ collection $}', route.params.id, query))
})
$checkError(error)
</script>

<template>
  <div>
    <h1>{$ collection | camelcase $}</h1>
    <div>{{ {$ collection $} }}</div>
  </div>
</template>