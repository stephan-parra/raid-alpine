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
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-summit-400">
            Day {{ col.day }}
          </span>
          <h3 class="text-2xl font-display text-white mt-1 group-hover:text-summit-300 transition-colors">
            {{ col.name }}
          </h3>
        </div>
        <div class="w-14 h-14 rounded-2xl bg-gradient-summit flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
          <span class="font-display text-lg text-white">{{ col.elevation }}</span>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-lg font-semibold text-white">{{ col.elevation }}m</div>
          <div class="text-xs text-snow-500 uppercase tracking-wider">Elevation</div>
        </div>
        <div v-if="col.length" class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-lg font-semibold text-white">{{ col.length }}km</div>
          <div class="text-xs text-snow-500 uppercase tracking-wider">Length</div>
        </div>
        <div v-if="col.avgGrade" class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-lg font-semibold text-white">{{ col.avgGrade }}%</div>
          <div class="text-xs text-snow-500 uppercase tracking-wider">Avg Grade</div>
        </div>
        <div v-if="col.maxGrade && !col.length" class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-lg font-semibold text-summit-400">{{ col.maxGrade }}%</div>
          <div class="text-xs text-snow-500 uppercase tracking-wider">Max Grade</div>
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
}

defineProps<{
  col: ColWithDay
  index: number
}>()
</script>
