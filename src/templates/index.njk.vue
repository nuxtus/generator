<script setup lang="ts">
  import { components } from "../../interfaces/nuxtus";
  type {$ collection | ucfirst $} = components["schemas"]["Items{$ collection | ucfirst $}"];
  const { getItems } = useDirectusItems();
  const filters = {/* Put your filters here */};
  const items: {$ collection | ucfirst $}[] = await getItems<any>({
    collection: "{$ collection $}",
    params: {
      filter: filters,
    }
  });
</script>

<template>
  <ul v-if="items.length > 0">
    <li v-for="{$ collection | lower $} in items" :key="{$ collection | lower $}.id">
      <router-link :to="`/{$ collection $}/${{$ collection | lower $}.id}`">
        {{ {$ collection | lower $}.id }}
      </router-link>
    </li>
  </ul>
  <p v-else>No {$ collection $} found.</p>
</template>