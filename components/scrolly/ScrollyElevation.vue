<template>
  <div class="h-32 md:h-40 px-4 pb-4">
    <div class="glass rounded-t-2xl p-4 h-full">
      <!-- Progress info bar -->
      <div class="flex justify-between items-center mb-2 text-xs text-snow-400">
        <span>{{ Math.round(progress * routeStats.totalDistance) }}km / {{ routeStats.totalDistance }}km</span>
        <span v-if="currentDay > 0 && currentDay <= 6">Day {{ currentDay }}</span>
        <span>{{ Math.round(progress * routeStats.totalElevation).toLocaleString() }}m climbed</span>
      </div>

      <!-- Elevation SVG -->
      <svg
        ref="svgRef"
        viewBox="0 0 1000 100"
        class="w-full h-full"
        preserveAspectRatio="none"
      >
        <!-- Gradient definitions -->
        <defs>
          <linearGradient id="scrollyElevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f19333" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#0ea5e9" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.1" />
          </linearGradient>
          <linearGradient id="scrollyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#f19333" />
            <stop offset="100%" stop-color="#ee7712" />
          </linearGradient>
          <!-- Clip path for progress -->
          <clipPath id="progressClip">
            <rect x="0" y="0" :width="progress * 1000" height="100" />
          </clipPath>
        </defs>

        <!-- Background line (unfilled) -->
        <path
          :d="linePath"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          stroke-width="2"
        />

        <!-- Filled area (clipped by progress) -->
        <g clip-path="url(#progressClip)">
          <path
            :d="areaPath"
            fill="url(#scrollyElevationGradient)"
          />
          <path
            :d="linePath"
            fill="none"
            stroke="url(#scrollyLineGradient)"
            stroke-width="2"
          />
        </g>

        <!-- Day markers -->
        <g v-for="(marker, index) in dayMarkers" :key="index">
          <line
            :x1="marker.x"
            :y1="0"
            :x2="marker.x"
            :y2="100"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="1"
            stroke-dasharray="4 4"
          />
          <text
            :x="marker.x"
            y="12"
            text-anchor="middle"
            class="fill-snow-500 text-[8px]"
          >
            D{{ marker.day }}
          </text>
        </g>

        <!-- Peak markers -->
        <g v-for="(peak, index) in peakMarkers" :key="'peak-' + index">
          <circle
            :cx="peak.x"
            :cy="peak.y"
            r="4"
            :fill="peak.x <= progress * 1000 ? '#f19333' : 'rgba(255,255,255,0.3)'"
            class="transition-colors duration-500"
          />
          <text
            v-if="peak.x <= progress * 1000"
            :x="peak.x"
            :y="peak.y - 8"
            text-anchor="middle"
            class="fill-white text-[6px] font-bold"
          >
            {{ peak.elevation }}m
          </text>
        </g>

        <!-- Current position marker -->
        <g :transform="`translate(${progress * 1000}, 0)`">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            stroke="#f19333"
            stroke-width="2"
          />
          <circle
            cx="0"
            :cy="currentElevationY"
            r="6"
            fill="#f19333"
            class="animate-pulse"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { routeStats } from '~/data/route'

const props = defineProps<{
  progress: number
  currentDay: number
}>()

const width = 1000
const height = 100
const padding = 5

// Simplified elevation points for the full journey
const elevationPoints = [
  // Day 1 - 110km
  400, 800, 1100, 1557, 1200, 1613, 900,
  // Day 2 - 109km
  1100, 1487, 1200, 1633, 1400, 1740, 1600, 1968, 1200, 800,
  // Day 3 - 129km
  1000, 1500, 2000, 2500, 2770, 2000, 1200, 1519, 1200, 1566, 1200,
  // Day 4 - 121km
  1400, 1800, 2200, 2642, 2000, 1500, 2000, 2361, 1700, 2109, 1800,
  // Day 5 - 134km
  1800, 2105, 2000, 2400, 2802, 2200, 1500, 1000, 600, 1678, 1200,
  // Day 6 - 160km
  1200, 876, 600, 900, 1439, 1000, 786, 400, 100, 0
]

const maxElevation = 2802

// Day start positions (percentage of total)
const dayPositions = [0, 0.14, 0.28, 0.45, 0.60, 0.78, 1.0]

const points = computed(() => {
  const xStep = (width - padding * 2) / (elevationPoints.length - 1)
  return elevationPoints.map((elevation, index) => ({
    x: padding + index * xStep,
    y: height - padding - (elevation / maxElevation) * (height - padding * 2),
  }))
})

const linePath = computed(() => {
  if (points.value.length === 0) return ''
  const first = points.value[0]
  let d = `M ${first.x} ${first.y}`
  for (let i = 1; i < points.value.length; i++) {
    const p = points.value[i]
    d += ` L ${p.x} ${p.y}`
  }
  return d
})

const areaPath = computed(() => {
  if (points.value.length === 0) return ''
  const first = points.value[0]
  const last = points.value[points.value.length - 1]
  let d = `M ${first.x} ${height - padding}`
  d += ` L ${first.x} ${first.y}`
  for (let i = 1; i < points.value.length; i++) {
    const p = points.value[i]
    d += ` L ${p.x} ${p.y}`
  }
  d += ` L ${last.x} ${height - padding}`
  d += ' Z'
  return d
})

// Day markers
const dayMarkers = computed(() => {
  return dayPositions.slice(1, -1).map((pos, index) => ({
    x: pos * width,
    day: index + 2
  }))
})

// Peak markers (major summits)
const peakMarkers = computed(() => {
  const peaks = [
    { elevation: 1613, name: 'Colombière', pos: 0.12 },
    { elevation: 1968, name: 'Roselend', pos: 0.26 },
    { elevation: 2770, name: 'Iseran', pos: 0.38 },
    { elevation: 2642, name: 'Galibier', pos: 0.52 },
    { elevation: 2361, name: 'Izoard', pos: 0.58 },
    { elevation: 2802, name: 'Bonette', pos: 0.72 },
  ]
  return peaks.map(peak => {
    const x = peak.pos * width
    const y = height - padding - (peak.elevation / maxElevation) * (height - padding * 2)
    return { x, y, elevation: peak.elevation, name: peak.name }
  })
})

// Current elevation at progress position
const currentElevationY = computed(() => {
  const index = Math.floor(props.progress * (elevationPoints.length - 1))
  const elevation = elevationPoints[Math.min(index, elevationPoints.length - 1)]
  return height - padding - (elevation / maxElevation) * (height - padding * 2)
})
</script>
