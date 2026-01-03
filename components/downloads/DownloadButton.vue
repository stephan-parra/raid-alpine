<template>
  <a
    v-if="!disabled"
    :href="downloadUrl"
    :download="fileName"
    :aria-label="`Download Day ${day} route in ${format.toUpperCase()} format`"
    class="download-btn"
    :class="[
      variantClasses,
      sizeClasses
    ]"
  >
    <Icon :name="icon" class="w-4 h-4" />
    <span v-if="showLabel">{{ format.toUpperCase() }}</span>
  </a>
  <span
    v-else
    class="download-btn opacity-50 cursor-not-allowed"
    :class="[
      variantClasses,
      sizeClasses
    ]"
    :aria-label="`Day ${day} route coming soon`"
  >
    <Icon :name="icon" class="w-4 h-4" />
    <span v-if="showLabel">{{ format.toUpperCase() }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getDownloadUrl, downloadFormats, hasDownload } from '~/data/route'

const props = withDefaults(defineProps<{
  day: number
  format: 'gpx' | 'fit' | 'tcx'
  size?: 'sm' | 'md'
  showLabel?: boolean
}>(), {
  size: 'sm',
  showLabel: true
})

const formatConfig = computed(() => {
  return downloadFormats.find(f => f.id === props.format)!
})

const icon = computed(() => formatConfig.value.icon)

const downloadUrl = computed(() => getDownloadUrl(props.day, props.format))

const fileName = computed(() => `RAID_Alpine_Day_${props.day}.${props.format}`)

const disabled = computed(() => !hasDownload(props.day))

const variantClasses = computed(() => {
  const color = formatConfig.value.color
  const base = {
    alpine: 'bg-alpine-500/20 text-alpine-400 hover:bg-alpine-500/30 hover:text-alpine-300 border-alpine-500/30',
    summit: 'bg-summit-500/20 text-summit-400 hover:bg-summit-500/30 hover:text-summit-300 border-summit-500/30',
    glacier: 'bg-glacier-500/20 text-glacier-400 hover:bg-glacier-500/30 hover:text-glacier-300 border-glacier-500/30',
  }
  return base[color]
})

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'px-3 py-1.5 text-xs gap-1.5'
    : 'px-4 py-2 text-sm gap-2'
})
</script>

<style scoped>
.download-btn {
  @apply inline-flex items-center font-medium rounded-lg border
         transition-all duration-200;
}

.download-btn:not(.cursor-not-allowed):hover {
  @apply scale-105;
}
</style>
