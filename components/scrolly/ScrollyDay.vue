<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <!-- Left: Day info -->
        <div
          class="transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
        >
          <!-- Day badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span class="text-summit-400 font-bold text-lg">Day {{ day.day }}</span>
            <span class="text-snow-400">•</span>
            <span class="text-snow-300 text-sm">{{ formatDate(day.date) }}</span>
          </div>

          <!-- Route info -->
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            {{ day.start }}
          </h2>
          <div class="flex items-center gap-2 text-snow-400 mb-4">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span class="text-xl">{{ day.finish }}</span>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap gap-6 mb-6">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-lg bg-alpine-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-alpine-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div class="text-white font-bold">{{ day.distance }}km</div>
                <div class="text-snow-500 text-xs">Distance</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-lg bg-summit-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-summit-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <div>
                <div class="text-white font-bold">{{ day.elevation.toLocaleString() }}m</div>
                <div class="text-snow-500 text-xs">Elevation</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-lg bg-glacier-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-glacier-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <div class="text-white font-bold">{{ day.cols.length }}</div>
                <div class="text-snow-500 text-xs">Cols</div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-snow-300 leading-relaxed mb-6">
            {{ day.description }}
          </p>

          <!-- Highlights -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="highlight in day.highlights"
              :key="highlight"
              class="px-3 py-1 rounded-full bg-white/10 text-snow-300 text-sm"
            >
              {{ highlight }}
            </span>
          </div>
        </div>

        <!-- Right: Cols -->
        <div
          class="transition-all duration-700 delay-200"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'"
        >
          <div class="space-y-4">
            <div
              v-for="(col, index) in day.cols"
              :key="col.name"
              class="glass rounded-xl p-4 transition-all duration-500"
              :style="{ transitionDelay: `${index * 100}ms` }"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-white font-bold text-lg">{{ col.name }}</h3>
                  <div class="flex items-center gap-3 text-sm text-snow-400 mt-1">
                    <span v-if="col.length">{{ col.length }}km</span>
                    <span v-if="col.avgGrade">{{ col.avgGrade }}% avg</span>
                    <span v-if="col.maxGrade" class="text-summit-400">{{ col.maxGrade }}% max</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-summit-400">{{ col.elevation }}m</div>
                  <div v-if="col.tourAppearances" class="text-xs text-snow-500">
                    {{ col.tourAppearances }}× Tour de France
                  </div>
                </div>
              </div>
              <p v-if="col.description" class="text-snow-400 text-sm mt-2">
                {{ col.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayStage } from '~/data/route'

defineProps<{
  day: DayStage
  isVisible: boolean
  dayIndex: number
}>()

const formatDate = (dateStr: string) => {
  const [day, month] = dateStr.split('/')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${parseInt(day)} ${months[parseInt(month) - 1]}`
}
</script>
