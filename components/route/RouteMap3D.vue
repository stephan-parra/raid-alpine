<template>
  <div class="relative w-full h-screen">
    <!-- Map container -->
    <div ref="mapContainer" class="w-full h-full" />

    <!-- Loading state -->
    <div
      v-if="!mapLoaded"
      class="absolute inset-0 flex items-center justify-center bg-slate-950"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 border-4 border-summit-500/30 border-t-summit-500 rounded-full animate-spin" />
        <span class="text-snow-300 text-lg font-medium">{{ loadingText }}</span>
        <span class="text-snow-500 text-sm">Preparing 3D terrain...</span>
      </div>
    </div>

    <!-- Flythrough controls -->
    <div v-if="mapLoaded" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div class="glass rounded-2xl px-6 py-4 flex items-center gap-6">
        <!-- Play/Pause button -->
        <button
          @click="toggleFlythrough"
          class="w-14 h-14 rounded-full bg-summit-500 hover:bg-summit-400 flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-summit-500/30"
          :aria-label="isPlaying ? 'Pause flythrough' : 'Play flythrough'"
        >
          <Icon
            :name="isPlaying ? 'heroicons:pause-solid' : 'heroicons:play-solid'"
            class="w-6 h-6 text-white"
            :class="{ 'ml-0.5': !isPlaying }"
          />
        </button>

        <!-- Progress bar -->
        <div class="flex-1 min-w-[200px] md:min-w-[300px]">
          <div class="flex items-center justify-between text-xs text-snow-400 mb-2">
            <span>{{ currentLocationName }}</span>
            <span>{{ Math.round(progress * 100) }}%</span>
          </div>
          <div class="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-alpine-500 to-summit-500 rounded-full transition-all duration-300"
              :style="{ width: `${progress * 100}%` }"
            />
          </div>
        </div>

        <!-- Restart button -->
        <button
          @click="restartFlythrough"
          class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Restart flythrough"
        >
          <Icon name="heroicons:arrow-path" class="w-5 h-5 text-white" />
        </button>

        <!-- Speed control -->
        <div class="hidden md:flex items-center gap-2">
          <span class="text-xs text-snow-500">Speed:</span>
          <button
            v-for="speed in [1, 2, 4]"
            :key="speed"
            @click="flythroughSpeed = speed"
            class="px-2 py-1 rounded text-xs transition-colors"
            :class="flythroughSpeed === speed
              ? 'bg-summit-500 text-white'
              : 'bg-white/10 text-snow-400 hover:bg-white/20'"
          >
            {{ speed }}x
          </button>
        </div>
      </div>
    </div>

    <!-- Day indicator -->
    <div v-if="mapLoaded && currentDay > 0" class="absolute top-20 left-6 z-10">
      <div class="glass rounded-xl p-4">
        <div class="text-xs text-summit-400 uppercase tracking-wider mb-1">Day {{ currentDay }}</div>
        <div class="text-lg font-semibold text-white">{{ currentStageName }}</div>
      </div>
    </div>

    <!-- Terrain exaggeration toggle -->
    <div v-if="mapLoaded" class="absolute top-20 left-1/2 -translate-x-1/2 z-10">
      <div class="glass rounded-xl p-2 flex gap-2">
        <button
          @click="terrainExaggeration = 1.0"
          class="px-3 py-1.5 rounded-lg text-xs transition-colors"
          :class="terrainExaggeration === 1.0
            ? 'bg-alpine-500 text-white'
            : 'text-snow-400 hover:bg-white/10'"
        >
          Realistic
        </button>
        <button
          @click="terrainExaggeration = 1.5"
          class="px-3 py-1.5 rounded-lg text-xs transition-colors"
          :class="terrainExaggeration === 1.5
            ? 'bg-alpine-500 text-white'
            : 'text-snow-400 hover:bg-white/10'"
        >
          Enhanced
        </button>
        <button
          @click="terrainExaggeration = 2.0"
          class="px-3 py-1.5 rounded-lg text-xs transition-colors"
          :class="terrainExaggeration === 2.0
            ? 'bg-alpine-500 text-white'
            : 'text-snow-400 hover:bg-white/10'"
        >
          Dramatic
        </button>
      </div>
    </div>

    <!-- Distance display -->
    <div v-if="mapLoaded" class="absolute top-20 right-6 z-10">
      <div class="glass rounded-xl p-4 text-right">
        <div class="text-xs text-snow-500 uppercase tracking-wider mb-1">Distance</div>
        <div class="text-3xl font-bebas text-white">{{ currentDistance }}km</div>
      </div>
    </div>

    <!-- Exit button (mobile) -->
    <NuxtLink
      to="/route"
      class="absolute top-20 right-6 z-20 md:hidden glass rounded-full p-3"
      aria-label="Exit flythrough"
    >
      <Icon name="heroicons:x-mark" class="w-6 h-6 text-white" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { detailedRouteCoordinates } from '~/data/detailedRoute'
import { days } from '~/data/route'
import type { Map as MaplibreMap } from 'maplibre-gl'

const mapContainer = ref<HTMLElement | null>(null)
const mapLoaded = ref(false)
const loadingText = ref('Loading 3D terrain...')

// Flythrough state
const isPlaying = ref(false)
const progress = ref(0)
const flythroughSpeed = ref(2) // Default to 2x speed
const terrainExaggeration = ref(1.5)
const currentDay = ref(0)
const currentLocationName = ref('Thonon-les-Bains')
const currentStageName = ref('')
const currentDistance = ref(0)

let map: MaplibreMap | null = null
let maplibreModule: typeof import('maplibre-gl') | null = null
let animationFrame: number | null = null
let lastTimestamp: number = 0

// Total route distance
const totalDistance = 763

// Use detailed route coordinates from GPX files
const routePoints = detailedRouteCoordinates

// Day boundaries (approximate indices in the route)
const dayBoundaries = [
  { index: 0, day: 1, name: 'Thonon-les-Bains → La Clusaz' },
  { index: 171, day: 2, name: 'La Clusaz → Sainte-Foy' },
  { index: 358, day: 3, name: 'Sainte-Foy → Valloire' },
  { index: 481, day: 4, name: 'Valloire → Vars' },
  { index: 604, day: 5, name: 'Vars → Valberg' },
  { index: 726, day: 6, name: 'Valberg → Nice' },
]

// Get day info based on route index
function updateDayInfo(routeIndex: number) {
  let currentDayInfo = dayBoundaries[0]
  for (const boundary of dayBoundaries) {
    if (routeIndex >= boundary.index) {
      currentDayInfo = boundary
    }
  }
  currentDay.value = currentDayInfo.day
  currentStageName.value = currentDayInfo.name
  currentDistance.value = Math.round((routeIndex / routePoints.length) * totalDistance)

  // Update location name based on progress
  const locations = ['Thonon-les-Bains', 'La Clusaz', 'Sainte-Foy', 'Valloire', 'Vars', 'Valberg', 'Nice']
  const dayIdx = Math.min(currentDayInfo.day - 1, locations.length - 1)
  currentLocationName.value = locations[dayIdx]
}

const initMap = async () => {
  if (!mapContainer.value) return

  try {
    loadingText.value = 'Loading map library...'

    maplibreModule = await import('maplibre-gl')
    const maplibregl = maplibreModule.default || maplibreModule

    loadingText.value = 'Initializing 3D terrain...'

    // Calculate initial bearing
    const initialBearing = calculateBearing(
      routePoints[0][0],
      routePoints[0][1],
      routePoints[10][0],
      routePoints[10][1]
    )

    map = new maplibregl.Map({
      container: mapContainer.value,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          'satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '&copy; Esri',
            maxzoom: 18,
          },
          'terrainSource': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          'hillshadeSource': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
        },
        layers: [
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite',
            minzoom: 0,
            maxzoom: 18,
          },
          {
            id: 'hillshade',
            type: 'hillshade',
            source: 'hillshadeSource',
            paint: {
              'hillshade-exaggeration': 0.3,
              'hillshade-shadow-color': '#000000',
              'hillshade-highlight-color': '#ffffff',
              'hillshade-accent-color': '#4a90d9',
            },
          },
        ],
        sky: {
          'sky-color': '#87CEEB',
          'horizon-color': '#ffffff',
          'fog-color': '#ffffff',
          'sky-horizon-blend': 0.5,
          'horizon-fog-blend': 0.5,
          'fog-ground-blend': 0.5,
        },
        terrain: {
          source: 'terrainSource',
          exaggeration: terrainExaggeration.value,
        },
      },
      center: routePoints[0],
      zoom: 13,
      pitch: 45, // More forward-looking angle
      bearing: initialBearing,
      attributionControl: false,
      maxPitch: 85,
    })

    map.on('load', () => {
      if (!map || !maplibreModule) return

      loadingText.value = 'Adding route...'

      // Add detailed route source
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routePoints,
          },
        },
      })

      // Route glow outer
      map.addLayer({
        id: 'route-glow-outer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f19333',
          'line-width': 24,
          'line-opacity': 0.3,
          'line-blur': 12,
        },
      })

      // Route glow inner
      map.addLayer({
        id: 'route-glow',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f19333',
          'line-width': 12,
          'line-opacity': 0.5,
          'line-blur': 4,
        },
      })

      // Main route line
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f19333',
          'line-width': 6,
        },
      })

      mapLoaded.value = true

      // Brief pause then start
      setTimeout(() => {
        startFlythrough()
      }, 1500)
    })

    map.on('error', (e) => {
      console.error('Map error:', e)
      loadingText.value = 'Map error - check console'
    })

  } catch (error) {
    console.error('Failed to initialize map:', error)
    loadingText.value = 'Failed to load 3D map'
  }
}

function startFlythrough() {
  if (!map) return
  isPlaying.value = true
  lastTimestamp = performance.now()
  animateFlythrough()
}

function animateFlythrough() {
  if (!map || !isPlaying.value) return

  const now = performance.now()
  const delta = (now - lastTimestamp) / 1000
  lastTimestamp = now

  // Faster base speed - completes in ~60 seconds at 1x
  const baseSpeed = 0.015
  progress.value += delta * baseSpeed * flythroughSpeed.value

  if (progress.value >= 1) {
    progress.value = 1
    isPlaying.value = false
    return
  }

  // Get current position on route
  const routeIndex = progress.value * (routePoints.length - 1)
  const currentIdx = Math.floor(routeIndex)
  const nextIdx = Math.min(currentIdx + 1, routePoints.length - 1)
  const t = routeIndex - currentIdx

  const current = routePoints[currentIdx]
  const next = routePoints[nextIdx]

  // Interpolate position
  const lng = current[0] + (next[0] - current[0]) * t
  const lat = current[1] + (next[1] - current[1]) * t

  updateDayInfo(currentIdx)

  // Calculate bearing - look ahead several points for smoother direction
  const lookAheadIdx = Math.min(currentIdx + 5, routePoints.length - 1)
  const lookAhead = routePoints[lookAheadIdx]
  const bearing = calculateBearing(current[0], current[1], lookAhead[0], lookAhead[1])

  // Fixed high altitude, directly over the route, looking forward
  map.easeTo({
    center: [lng, lat],
    zoom: 13,
    pitch: 45, // Lower pitch = looking more forward/horizontal
    bearing: bearing,
    duration: 0,
  })

  animationFrame = requestAnimationFrame(animateFlythrough)
}

function calculateBearing(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const dLng = (lng2 - lng1) * Math.PI / 180
  const lat1Rad = lat1 * Math.PI / 180
  const lat2Rad = lat2 * Math.PI / 180

  const y = Math.sin(dLng) * Math.cos(lat2Rad)
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng)

  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

function toggleFlythrough() {
  if (isPlaying.value) {
    isPlaying.value = false
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  } else {
    if (progress.value >= 1) {
      progress.value = 0
    }
    startFlythrough()
  }
}

function restartFlythrough() {
  progress.value = 0
  currentDay.value = 1
  currentLocationName.value = 'Thonon-les-Bains'
  currentDistance.value = 0

  const initialBearing = calculateBearing(
    routePoints[0][0],
    routePoints[0][1],
    routePoints[10][0],
    routePoints[10][1]
  )

  if (map) {
    map.easeTo({
      center: routePoints[0],
      zoom: 13,
      pitch: 45,
      bearing: initialBearing,
      duration: 1000,
    })
  }

  setTimeout(() => {
    startFlythrough()
  }, 1200)
}

watch(terrainExaggeration, (newValue) => {
  if (map) {
    map.setTerrain({
      source: 'terrainSource',
      exaggeration: newValue,
    })
  }
})

onMounted(async () => {
  await nextTick()
  initMap()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
