<script setup lang="ts">
  import { components } from "../../interfaces/nuxtus";
  type {$ collection | capitalize $} = components["schemas"]["Items{$ collection | capitalize $}"];
  const { getSingletonItem } = useDirectusItems();
  
  const {$ collection | lower $}: {$ collection | capitalize $} = await getSingletonItem<any>({
    collection: "{$ collection $}"
  });
</script>

<template>
  <h1>{$ collection | capitalize $}</h1>
  {{ {$ collection | lower $} }}
</template>