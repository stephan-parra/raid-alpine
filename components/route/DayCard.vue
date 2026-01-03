<template>
  <article
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
    class="day-card"
    :class="{ 'opacity-75': day.isTransitDay }"
  >
    <!-- Header with day number -->
    <div class="relative p-6 pb-4">
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2 text-sm font-semibold text-summit-400 uppercase tracking-wider">
              <span class="w-8 h-8 rounded-lg bg-summit-500/20 flex items-center justify-center text-summit-400 font-display text-lg">
                {{ day.day }}
              </span>
              Day {{ day.day }}
            </span>
            <span v-if="day.isTransitDay" class="px-2 py-0.5 rounded-full bg-glacier-500/20 text-glacier-400 text-xs font-medium">
              Transit
            </span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <Icon name="heroicons:calendar" class="w-4 h-4 text-snow-500" />
            <span class="text-sm text-snow-500">{{ day.date }}</span>
          </div>
          <h3 class="text-2xl md:text-3xl font-display text-white mt-3">
            {{ day.start }}
            <Icon name="heroicons:arrow-long-right" class="w-6 h-6 mx-2 text-summit-500 inline" />
            {{ day.finish }}
          </h3>
        </div>
      </div>

      <!-- Stats (only for riding days) -->
      <div v-if="!day.isTransitDay" class="flex gap-6 mt-4">
        <div class="flex items-center gap-2 text-snow-400">
          <Icon name="heroicons:map" class="w-5 h-5 text-alpine-400" />
          <span class="font-semibold text-white">{{ day.distance }}km</span>
        </div>
        <div class="flex items-center gap-2 text-snow-400">
          <Icon name="mdi:elevation-rise" class="w-5 h-5 text-summit-400" />
          <span class="font-semibold text-white">{{ day.elevation.toLocaleString() }}m</span>
        </div>
        <div class="flex items-center gap-2 text-snow-400">
          <Icon name="mdi:mountain" class="w-5 h-5 text-glacier-400" />
          <span class="font-semibold text-white">{{ day.cols.length }} cols</span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="px-6 pb-4">
      <p class="text-snow-400 leading-relaxed">
        {{ day.description }}
      </p>
    </div>

    <!-- Cols list (only for riding days) -->
    <div v-if="day.cols.length > 0" class="px-6 pb-4">
      <div class="flex flex-wrap gap-2">
        <UiColBadge
          v-for="col in day.cols.filter(c => c.elevation > 0)"
          :key="col.name"
          :name="col.name"
          :elevation="col.elevation"
        />
      </div>
    </div>

    <!-- Highlights -->
    <div class="px-6 pb-6 pt-2 border-t border-white/5">
      <div class="flex flex-wrap gap-3">
        <span
          v-for="highlight in day.highlights"
          :key="highlight"
          class="text-xs text-snow-500 flex items-center gap-1.5"
        >
          <span class="w-1 h-1 rounded-full bg-summit-500" />
          {{ highlight }}
        </span>
      </div>
    </div>

    <!-- Link to detailed view (only for riding days) -->
    <NuxtLink
      v-if="!day.isTransitDay"
      :to="`/route/day/${day.day}`"
      class="block px-6 py-4 bg-white/5 hover:bg-summit-500/10 transition-colors
             border-t border-white/5 group"
    >
      <span class="flex items-center justify-between text-sm font-medium text-snow-400 group-hover:text-summit-400 transition-colors">
        <span>View stage details</span>
        <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </NuxtLink>

    <!-- Download buttons (only for riding days) -->
    <div
      v-if="!day.isTransitDay"
      class="px-6 py-4 bg-white/[0.02] border-t border-white/5"
    >
      <div class="flex items-center justify-between">
        <span class="flex items-center gap-2 text-sm text-snow-500">
          <Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
          <span>Download route</span>
        </span>
        <div class="flex items-center gap-2">
          <template v-if="hasDownloadForDay">
            <DownloadsDownloadButton :day="day.day" format="gpx" />
            <DownloadsDownloadButton :day="day.day" format="fit" />
            <DownloadsDownloadButton :day="day.day" format="tcx" />
          </template>
          <span v-else class="text-xs text-snow-500 bg-white/5 px-3 py-1.5 rounded-lg">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { DayStage } from '~/data/route'
import { hasDownload } from '~/data/route'
import { computed } from 'vue'

const props = defineProps<{
  day: DayStage
  index: number
}>()

const hasDownloadForDay = computed(() => hasDownload(props.day.day))
</script>
