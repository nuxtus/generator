<script setup lang="ts">
  import { components } from "../../interfaces/nuxtus";
  type {$ collection | ucfirst $} = components["schemas"]["Items{$ collection | ucfirst $}"];
  const { getSingletonItem } = useDirectusItems();
  
  const {$ collection | lower $}: {$ collection | ucfirst $} = await getSingletonItem<any>({
    collection: "{$ collection $}"
  });
</script>

<template>
  <h1>{$ collection | ucfirst $}</h1>
  {{ {$ collection | lower $} }}
</template>