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
      <p v-if="${$ collection $}.description" class="text-gray-600 mb-6">{{ {$ collection $}.description }}</p>
      <div v-if="${$ collection $}.content" class="prose max-w-none" v-html="{$ collection $}.content"></div>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.prose :deep(h1) { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
.prose :deep(h2) { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
.prose :deep(h3) { font-size: 1.25rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; }
.prose :deep(p) { margin-bottom: 1rem; line-height: 1.75; }
.prose :deep(ul) { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
.prose :deep(ol) { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
.prose :deep(a) { color: #2563eb; text-decoration: underline; }
.prose :deep(blockquote) { border-left: 4px solid #e5e7eb; padding-left: 1rem; font-style: italic; color: #6b7280; margin-bottom: 1rem; }
.prose :deep(img) { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5rem 0; }
.prose :deep(code) { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; }
.prose :deep(pre) { background: #1f2937; color: #e5e7eb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
.prose :deep(pre code) { background: transparent; padding: 0; color: inherit; }
</style>
