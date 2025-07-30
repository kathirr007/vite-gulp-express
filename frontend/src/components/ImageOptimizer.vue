
<script setup>
import { ref } from 'vue'

const files = ref([])
const optimizedImages = ref([])
const loading = ref(false)
const error = ref('')

function onFileChange(e) {
  files.value = Array.from(e.target.files)
  optimizedImages.value = []
  error.value = ''
}

async function uploadImages() {
  if (!files.value.length) return
  loading.value = true
  error.value = ''
  optimizedImages.value = []

  const formData = new FormData()
  files.value.forEach(file => formData.append('images', file))

  try {
    const res = await fetch('/api/optimize-images', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data.success) {
      optimizedImages.value = data.images
    } else {
      error.value = data.error || 'Optimization failed'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div flex flex-col items-center>
    <h2 class="text-xl font-medium">Optimize Images</h2>
    <input type="file" multiple accept="image/*" @change="onFileChange" />
    <button class="m-3 text-sm btn" :disabled="!files.length || loading" @click="uploadImages">
      {{ loading ? 'Optimizing...' : 'Optimize Images' }}
    </button>

    <div v-if="optimizedImages.length">
      <h3>Optimized Images</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <div v-for="img in optimizedImages" :key="img.filename">
          <p>{{ img.filename }}</p>
          <img :src="`data:image/*;base64,${img.data}`" style="max-width: 200px; max-height: 200px; height: 100%; width: 100%;" alt="" />
        </div>
      </div>
    </div>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </div>
</template>
