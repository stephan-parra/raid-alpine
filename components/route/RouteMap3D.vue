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
            v-for="speed in [0.5, 1, 2]"
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

    <!-- Current elevation display -->
    <div v-if="mapLoaded" class="absolute top-6 right-6 z-10">
      <div class="glass rounded-xl p-4 text-right">
        <div class="text-xs text-snow-500 uppercase tracking-wider mb-1">Altitude</div>
        <div class="text-3xl font-bebas text-white">{{ currentElevation.toLocaleString() }}m</div>
      </div>
    </div>

    <!-- Day indicator -->
    <div v-if="mapLoaded && currentDay > 0" class="absolute top-6 left-6 z-10">
      <div class="glass rounded-xl p-4">
        <div class="text-xs text-summit-400 uppercase tracking-wider mb-1">Day {{ currentDay }}</div>
        <div class="text-lg font-semibold text-white">{{ currentStageName }}</div>
      </div>
    </div>

    <!-- Toggle terrain button -->
    <div v-if="mapLoaded" class="absolute top-6 left-1/2 -translate-x-1/2 z-10">
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

    <!-- Exit button -->
    <NuxtLink
      to="/route"
      class="absolute top-6 right-6 z-20 md:hidden glass rounded-full p-3"
      aria-label="Exit flythrough"
    >
      <Icon name="heroicons:x-mark" class="w-6 h-6 text-white" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { routeCoordinates, days } from '~/data/route'
import type { Map as MaplibreMap } from 'maplibre-gl'

const mapContainer = ref<HTMLElement | null>(null)
const mapLoaded = ref(false)
const loadingText = ref('Loading 3D terrain...')

// Flythrough state
const isPlaying = ref(false)
const progress = ref(0)
const flythroughSpeed = ref(1)
const terrainExaggeration = ref(1.5)
const currentElevation = ref(372) // Start at Lake Geneva elevation
const currentDay = ref(0)
const currentLocationName = ref('Thonon-les-Bains')
const currentStageName = ref('')

let map: MaplibreMap | null = null
let maplibreModule: typeof import('maplibre-gl') | null = null
let animationFrame: number | null = null
let lastTimestamp: number = 0

// Extended route with more interpolated points for smooth camera path
const extendedRoute = computed(() => {
  const points: [number, number, number][] = []

  // Interpolate between waypoints for smoother camera movement
  for (let i = 0; i < routeCoordinates.length - 1; i++) {
    const start = routeCoordinates[i]
    const end = routeCoordinates[i + 1]
    const steps = 50 // Points between each waypoint

    for (let j = 0; j <= steps; j++) {
      const t = j / steps
      const lng = start[0] + (end[0] - start[0]) * t
      const lat = start[1] + (end[1] - start[1]) * t
      // Estimate elevation based on route profile (simplified)
      const baseElevation = getEstimatedElevation(i, t)
      points.push([lng, lat, baseElevation])
    }
  }

  return points
})

// Rough elevation estimates for camera height
function getEstimatedElevation(segment: number, t: number): number {
  const elevations = [
    [372, 1200],   // Day 1: Thonon to La Clusaz
    [1200, 1800],  // Day 2: La Clusaz to Sainte-Foy
    [1800, 1500],  // Day 3: Sainte-Foy to Valloire (over Iseran 2770)
    [1500, 1800],  // Day 4: Valloire to Vars (over Galibier 2642)
    [1800, 1400],  // Day 5: Vars to Valberg (over Bonette 2802)
    [1400, 0],     // Day 6: Valberg to Nice
  ]

  if (segment >= elevations.length) return 0

  const [startElev, endElev] = elevations[segment]
  return startElev + (endElev - startElev) * t
}

// Get day info based on progress
function updateDayInfo(progressValue: number) {
  const segmentIndex = Math.floor(progressValue * (routeCoordinates.length - 1))
  const dayIndex = Math.min(segmentIndex + 1, days.length - 2) // +1 because day 0 is transit

  const locations = [
    'Thonon-les-Bains',
    'La Clusaz',
    'Sainte-Foy-Tarentaise',
    'Valloire',
    'Vars',
    'Valberg',
    'Nice'
  ]

  currentDay.value = dayIndex
  currentLocationName.value = locations[Math.min(segmentIndex, locations.length - 1)]

  if (dayIndex > 0 && dayIndex < days.length - 1) {
    const day = days[dayIndex]
    currentStageName.value = `${day.start} → ${day.finish}`
  }
}

const initMap = async () => {
  if (!mapContainer.value) return

  try {
    loadingText.value = 'Loading map library...'

    maplibreModule = await import('maplibre-gl')
    const maplibregl = maplibreModule.default || maplibreModule

    loadingText.value = 'Initializing 3D terrain...'

    // Create map with 3D terrain capabilities
    map = new maplibregl.Map({
      container: mapContainer.value,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          // Satellite imagery for terrain texture
          'satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '&copy; Esri',
            maxzoom: 18,
          },
          // Terrain DEM source
          'terrainSource': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          // Hillshade for depth
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
          // Satellite base layer
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite',
            minzoom: 0,
            maxzoom: 18,
          },
          // Hillshade overlay for depth
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
      center: [6.4793, 46.3706], // Start at Thonon-les-Bains
      zoom: 12,
      pitch: 75,
      bearing: 150,
      attributionControl: false,
      maxPitch: 85,
    })

    map.on('load', () => {
      if (!map || !maplibreModule) return

      loadingText.value = 'Adding route...'

      // Add route source
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates,
          },
        },
      })

      // Route line glow (outer)
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
          'line-width': 20,
          'line-opacity': 0.2,
          'line-blur': 10,
        },
      })

      // Route line glow (inner)
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
          'line-width': 10,
          'line-opacity': 0.4,
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
          'line-width': 5,
        },
      })

      mapLoaded.value = true

      // Start with a nice overview, then begin flythrough
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

// Camera animation along route
function startFlythrough() {
  if (!map) return
  isPlaying.value = true
  lastTimestamp = performance.now()
  animateFlythrough()
}

function animateFlythrough() {
  if (!map || !isPlaying.value) return

  const now = performance.now()
  const delta = (now - lastTimestamp) / 1000 // seconds
  lastTimestamp = now

  // Progress speed (adjust for desired flythrough duration)
  const baseSpeed = 0.008 // ~2 minutes for full route at 1x
  progress.value += delta * baseSpeed * flythroughSpeed.value

  if (progress.value >= 1) {
    progress.value = 1
    isPlaying.value = false
    return
  }

  // Get current position on route
  const routeProgress = progress.value * (extendedRoute.value.length - 1)
  const currentIndex = Math.floor(routeProgress)
  const nextIndex = Math.min(currentIndex + 1, extendedRoute.value.length - 1)
  const t = routeProgress - currentIndex

  const current = extendedRoute.value[currentIndex]
  const next = extendedRoute.value[nextIndex]

  // Interpolate position
  const lng = current[0] + (next[0] - current[0]) * t
  const lat = current[1] + (next[1] - current[1]) * t
  const elevation = current[2] + (next[2] - current[2]) * t

  currentElevation.value = Math.round(elevation)
  updateDayInfo(progress.value)

  // Calculate bearing based on direction of travel
  const bearing = calculateBearing(current[0], current[1], next[0], next[1])

  // Update camera position
  map.easeTo({
    center: [lng, lat],
    zoom: 13 + (elevation / 3000) * 1.5, // Zoom out at higher elevations
    pitch: 70 + Math.sin(progress.value * Math.PI * 4) * 10, // Subtle pitch variation
    bearing: bearing + 30, // Offset to show route ahead
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
  currentElevation.value = 372
  currentDay.value = 0
  currentLocationName.value = 'Thonon-les-Bains'

  if (map) {
    map.easeTo({
      center: routeCoordinates[0],
      zoom: 12,
      pitch: 75,
      bearing: 150,
      duration: 1000,
    })
  }

  setTimeout(() => {
    startFlythrough()
  }, 1200)
}

// Watch terrain exaggeration changes
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
