<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
    class="glass-dark rounded-2xl p-5 hover:border-white/20 transition-colors"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div>
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-summit-400 uppercase tracking-wider">
          <span class="w-7 h-7 rounded-lg bg-summit-500/20 flex items-center justify-center text-summit-400 font-display text-base">
            {{ day.day }}
          </span>
          Day {{ day.day }}
        </span>
        <h3 class="text-lg font-display text-white mt-2">
          {{ day.start }}
          <Icon name="heroicons:arrow-long-right" class="w-4 h-4 mx-1 text-summit-500 inline" />
          {{ day.finish }}
        </h3>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex gap-4 mb-4 text-sm">
      <div class="flex items-center gap-1.5 text-snow-400">
        <Icon name="heroicons:map" class="w-4 h-4 text-alpine-400" />
        <span class="font-medium text-white">{{ day.distance }}km</span>
      </div>
      <div class="flex items-center gap-1.5 text-snow-400">
        <Icon name="mdi:elevation-rise" class="w-4 h-4 text-summit-400" />
        <span class="font-medium text-white">{{ day.elevation.toLocaleString() }}m</span>
      </div>
    </div>

    <!-- Download buttons -->
    <div class="flex items-center gap-2 pt-3 border-t border-white/5">
      <template v-if="hasDownloadForDay">
        <DownloadsDownloadButton :day="day.day" format="gpx" size="md" />
        <DownloadsDownloadButton :day="day.day" format="fit" size="md" />
        <DownloadsDownloadButton :day="day.day" format="tcx" size="md" />
      </template>
      <div v-else class="flex items-center gap-2 text-snow-500">
        <Icon name="heroicons:clock" class="w-4 h-4" />
        <span class="text-sm">Coming Soon</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DayStage } from '~/data/route'
import { hasDownload } from '~/data/route'

const props = defineProps<{
  day: DayStage
  index: number
}>()

const hasDownloadForDay = computed(() => hasDownload(props.day.day))
</script>
