<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'

onMounted(async () => {
  const { data:data2 } = await axios.get('/api/run-test-task')
  const { data } = await axios.get('/api/hello')
  console.log(data)
  console.log(data2)
})
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />
    <TheFooter />
  </main>
</template>
