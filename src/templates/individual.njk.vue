<script setup lang="ts">
  import { components } from "../../interfaces/nuxtus";
  type {$ collection | capitalize $} = components["schemas"]["Items{$ collection | capitalize $}"];
  const route = useRoute()
  const { getItemById } = useDirectusItems();
  const {$ collection | lower $}: {$ collection | capitalize $} = await getItemById({
    collection: "{$ collection $}",
    id: route.params.id,
  });
</script>

<template>
  <div>
    <h1>{$ collection | capitalize $}</h1>
    <div>{{ {$ collection | lower $} }}</div>
  </div>
</template>