<template>
  <article
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
    class="group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-white/5
           hover:border-summit-500/30 transition-all duration-500"
  >
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-alpine-950/50 via-transparent to-summit-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <!-- Content -->
    <div class="relative p-6">
      <!-- Video Thumbnail -->
      <div class="mb-4">
        <ColColVideoThumbnail
          :video="col.video"
          :col-name="col.name"
          :elevation="col.elevation"
        />
      </div>

      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-summit-400">
            Day {{ col.day }}
          </span>
          <h3 class="text-xl font-display text-white mt-1 group-hover:text-summit-300 transition-colors">
            {{ col.name }}
          </h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-summit flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow flex-shrink-0">
          <span class="font-display text-sm text-white">{{ col.elevation }}m</span>
        </div>
      </div>

      <!-- Stats row -->
      <div class="flex items-center gap-3 mb-4 text-sm">
        <div v-if="col.length" class="flex items-center gap-1.5 text-snow-400">
          <Icon name="heroicons:arrow-long-right" class="w-4 h-4 text-alpine-400" />
          <span>{{ col.length }}km</span>
        </div>
        <div v-if="col.avgGrade" class="flex items-center gap-1.5 text-snow-400">
          <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 text-summit-400" />
          <span>{{ col.avgGrade }}%</span>
        </div>
        <div v-if="col.maxGrade" class="flex items-center gap-1.5 text-snow-400">
          <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 text-orange-400" />
          <span>{{ col.maxGrade }}% max</span>
        </div>
      </div>

      <!-- Description -->
      <p v-if="col.description" class="text-snow-400 text-sm leading-relaxed mb-4">
        {{ col.description }}
      </p>

      <!-- Tour history -->
      <div v-if="col.tourAppearances" class="flex items-center gap-4 pt-4 border-t border-white/5">
        <div class="flex items-center gap-2">
          <Icon name="mdi:trophy" class="w-4 h-4 text-yellow-500" />
          <span class="text-sm text-snow-400">
            <span class="text-white font-semibold">{{ col.tourAppearances }}</span> Tour appearances
          </span>
        </div>
        <div v-if="col.firstCrossed" class="flex items-center gap-2">
          <Icon name="heroicons:calendar" class="w-4 h-4 text-alpine-400" />
          <span class="text-sm text-snow-400">
            Since <span class="text-white font-semibold">{{ col.firstCrossed }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Hover effect line -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-summit scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </article>
</template>

<script setup lang="ts">
import type { ColVideo } from '~/data/route'

interface ColWithDay {
  name: string
  elevation: number
  length?: number
  avgGrade?: number
  maxGrade?: number
  description?: string
  tourAppearances?: number
  firstCrossed?: number
  day: number
  video?: ColVideo
}

defineProps<{
  col: ColWithDay
  index: number
}>()
</script>
