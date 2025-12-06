<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :visibleOnce="{ opacity: 1, y: 0 }"
    class="text-center mb-16"
  >
    <span
      v-if="eyebrow"
      class="inline-block text-sm font-semibold uppercase tracking-wider text-summit-400 mb-4"
    >
      {{ eyebrow }}
    </span>
    <h2 class="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
      {{ title }}
    </h2>
    <p v-if="description" class="text-lg text-snow-400 max-w-2xl mx-auto text-balance">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>
