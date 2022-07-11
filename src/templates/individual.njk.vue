<script setup lang="ts">
  import { components } from "../../interfaces/nuxtus";
  type {$ collection | camelcase $} = components["schemas"]["Items{$ collection | camelcase $}"];
  const route = useRoute()
  const { getItemById } = useDirectusItems();
  const {$ collection | lower $}: {$ collection | camelcase $} = await getItemById({
    collection: "{$ collection $}",
    id: route.params.id,
  });
</script>

<template>
  <div>
    <h1>{$ collection | camelcase $}</h1>
    <div>{{ {$ collection | lower $} }}</div>
  </div>
</template>