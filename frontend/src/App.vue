<script setup lang="ts">
import { onMounted } from 'vue'
import { api } from './plugin/api'

onMounted(async () => {
  const { data: data2 } = await api.get('/run-test-task')
  const { data } = await api.get('/hello')
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
