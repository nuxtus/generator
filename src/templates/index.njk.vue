<script setup lang="ts">
import type { Query } from "@directus/sdk"
import type { components } from "../../interfaces/nuxtus"
type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"]
const { $directus, $readItems, $checkError } = useNuxtApp()

const query: Query<components, {$ collection | camelcase $}> = {
  // Add your filters and query customisations here
}

const { data, error } = useAsyncData <{$ collection | camelcase $}[] | null> ('{$ collection $}', () => {
  return $directus.request($readItems('{$ collection $}', query))
})
$checkError(error)
</script>

<template>
  <ul v-if="data === null || data.length > 0">
    <li v-for="{$ collection | lower $} in data" :key=" {$ collection | lower $}.id ">
      <NuxtLink :to=" `/{$ collection $}/${{$ collection | lower $}.id}`">
        {{ {$ collection | lower $}.id }}
      </NuxtLink>
    </li>
  </ul>
  <p v-else>No {$ collection $} found.</p>
</template>