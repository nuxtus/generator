<script setup lang="ts">
  import { components } from "../../interfaces/nuxtus";
  type {$ collection | ucfirst $} = components["schemas"]["Items{$ collection | ucfirst $}"];
  const route = useRoute()
  const { getItemById } = useDirectusItems();
  const {$ collection | lower $}: {$ collection | ucfirst $} = await getItemById({
    collection: "{$ collection $}",
    id: route.params.id,
  });
</script>

<template>
  <div>
    <h1>{$ collection | ucfirst $}</h1>
    <div>{{ {$ collection | lower $} }}</div>
  </div>
</template>