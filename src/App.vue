<script setup lang="ts">
import axios from 'axios'

onMounted(async () => {
  const { data } = await axios.get('/api/items')
  console.log(data)
})
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />
    <TheFooter />
  </main>
</template>
