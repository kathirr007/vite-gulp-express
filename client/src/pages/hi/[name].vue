<script setup lang="ts">
const params = useRoute('/hi/[name]').params
const router = useRouter()
</script>

<template>
  <div>
    <div text-4xl inline-block i-carbon-pedestrian />
    <p>
      Hi, {{ params.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button text-sm m-3 btn mt-8 @click="router.back()">
        Back
      </button>
    </div>
  </div>
</template>
