<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
    class="glass-dark rounded-2xl p-6"
  >
    <div
      class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
      :class="iconBgClass"
    >
      <Icon :name="format.icon" class="w-6 h-6" :class="iconColorClass" />
    </div>
    <h3 class="text-lg font-semibold text-white mb-2">{{ format.name }}</h3>
    <p class="text-snow-400 text-sm mb-4">
      {{ format.description }}
    </p>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="app in format.compatibleWith.slice(0, 4)"
        :key="app"
        class="text-xs px-2 py-1 rounded-md bg-white/5 text-snow-500"
      >
        {{ app }}
      </span>
      <span
        v-if="format.compatibleWith.length > 4"
        class="text-xs px-2 py-1 rounded-md bg-white/5 text-snow-500"
      >
        +{{ format.compatibleWith.length - 4 }} more
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DownloadFormat } from '~/data/route'

const props = defineProps<{
  format: DownloadFormat
  index: number
}>()

const iconBgClass = computed(() => {
  const classes = {
    alpine: 'bg-alpine-500/20',
    summit: 'bg-summit-500/20',
    glacier: 'bg-glacier-500/20',
  }
  return classes[props.format.color]
})

const iconColorClass = computed(() => {
  const classes = {
    alpine: 'text-alpine-400',
    summit: 'text-summit-400',
    glacier: 'text-glacier-400',
  }
  return classes[props.format.color]
})
</script>
