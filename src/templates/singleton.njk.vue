<script setup lang="ts">
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const { $directus, $readSingleton, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {
  // Add your filters and query customisations here
}

const { data: {$ collection $}, error } = useAsyncData < {$ collection | camelcase $} | null > ('{$ collection $}', () => {
  return $directus.request($readSingleton('{$ collection $}', query))
})
$checkError(error)
</script>

<template>
  <h1>{$ collection | camelcase $}</h1>
  {{ {$ collection $} }}
</template>