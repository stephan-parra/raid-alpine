<template>
  <div class="relative w-full h-48 md:h-64">
    <svg
      viewBox="0 0 1000 300"
      class="w-full h-full"
      preserveAspectRatio="none"
    >
      <!-- Gradient definitions -->
      <defs>
        <linearGradient id="elevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f19333" stop-opacity="0.6" />
          <stop offset="50%" stop-color="#0ea5e9" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.05" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="50%" stop-color="#f19333" />
          <stop offset="100%" stop-color="#ee7712" />
        </linearGradient>
      </defs>

      <!-- Grid lines -->
      <g class="text-white/5">
        <line v-for="i in 5" :key="'h'+i" x1="0" :y1="i * 60" x2="1000" :y2="i * 60" stroke="currentColor" stroke-width="1" />
        <line v-for="i in 7" :key="'v'+i" :x1="i * 166.67" y1="0" :x2="i * 166.67" y2="300" stroke="currentColor" stroke-width="1" />
      </g>

      <!-- Elevation area fill -->
      <path
        :d="areaPath"
        fill="url(#elevationGradient)"
        class="transition-all duration-700"
      />

      <!-- Elevation line -->
      <path
        :d="linePath"
        fill="none"
        stroke="url(#lineGradient)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-all duration-700"
      />

      <!-- Peak markers -->
      <g v-for="(peak, index) in peaks" :key="index">
        <circle
          :cx="peak.x"
          :cy="peak.y"
          r="6"
          fill="#f19333"
          class="animate-pulse-slow"
        />
        <circle
          :cx="peak.x"
          :cy="peak.y"
          r="3"
          fill="white"
        />
      </g>
    </svg>

    <!-- Labels -->
    <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-snow-600 px-2">
      <span>0km</span>
      <span>{{ Math.round(totalDistance / 2) }}km</span>
      <span>{{ totalDistance }}km</span>
    </div>

    <!-- Elevation labels -->
    <div class="absolute top-0 bottom-0 left-0 flex flex-col justify-between text-xs text-snow-600 py-2">
      <span>{{ maxElevation }}m</span>
      <span>{{ Math.round(maxElevation / 2) }}m</span>
      <span>0m</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  elevationPoints?: number[]
  totalDistance?: number
  maxElevation?: number
}

const props = withDefaults(defineProps<Props>(), {
  // Default elevation profile representing the 6-day journey
  elevationPoints: () => [
    400, 600, 800, 1100, 1500, 1600, 1200, 900,  // Day 1
    1100, 1400, 1600, 1700, 1900, 2000, 1500, 900, // Day 2
    1000, 1500, 2000, 2400, 2700, 2770, 2000, 1500, 1200, 1566, 1200, // Day 3
    1200, 1800, 2200, 2500, 2642, 2000, 1500, 2000, 2361, 1800, 2109, 1800, // Day 4
    1800, 2105, 1900, 2200, 2500, 2802, 2000, 1200, 800, 1678, 1200, // Day 5
    1200, 876, 600, 1000, 1439, 800, 786, 400, 100, 0 // Day 6
  ],
  totalDistance: 770,
  maxElevation: 2802,
})

const width = 1000
const height = 300
const padding = 20

const points = computed(() => {
  const xStep = (width - padding * 2) / (props.elevationPoints.length - 1)
  return props.elevationPoints.map((elevation, index) => ({
    x: padding + index * xStep,
    y: height - padding - (elevation / props.maxElevation) * (height - padding * 2),
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

// Find local maxima for peak markers
const peaks = computed(() => {
  const result: { x: number; y: number }[] = []
  const threshold = 2500 // Only show peaks above this elevation
  for (let i = 1; i < props.elevationPoints.length - 1; i++) {
    const prev = props.elevationPoints[i - 1]
    const curr = props.elevationPoints[i]
    const next = props.elevationPoints[i + 1]
    if (curr > prev && curr > next && curr >= threshold) {
      result.push(points.value[i])
    }
  }
  return result
})
</script>
