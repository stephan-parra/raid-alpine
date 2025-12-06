<template>
  <div class="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden">
    <!-- Map container -->
    <div ref="mapContainer" class="absolute inset-0" />

    <!-- Loading state -->
    <div
      v-if="!mapLoaded"
      class="absolute inset-0 flex items-center justify-center bg-slate-900"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-summit-500/30 border-t-summit-500 rounded-full animate-spin" />
        <span class="text-snow-500 text-sm">{{ loadingText }}</span>
      </div>
    </div>

    <!-- Map controls overlay -->
    <div v-if="mapLoaded" class="absolute top-4 left-4 z-10">
      <div class="glass rounded-xl p-3 flex flex-col gap-2">
        <button
          @click="zoomIn"
          class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Zoom in"
        >
          <Icon name="heroicons:plus" class="w-4 h-4 text-white" />
        </button>
        <button
          @click="zoomOut"
          class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Zoom out"
        >
          <Icon name="heroicons:minus" class="w-4 h-4 text-white" />
        </button>
        <div class="w-full h-px bg-white/10" />
        <button
          @click="fitBounds"
          class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Fit route"
        >
          <Icon name="heroicons:arrows-pointing-out" class="w-4 h-4 text-white" />
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div v-if="mapLoaded" class="absolute bottom-4 left-4 z-10">
      <div class="glass rounded-xl p-4">
        <h4 class="text-xs font-semibold text-snow-400 uppercase tracking-wider mb-3">Route</h4>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-green-500" />
            <span class="text-xs text-snow-300">Start: Thonon-les-Bains</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-summit-500" />
            <span class="text-xs text-snow-300">Finish: Nice</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-0.5 bg-gradient-to-r from-alpine-500 to-summit-500" />
            <span class="text-xs text-snow-300">770km route</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeCoordinates } from '~/data/route'
import type { Map as MaplibreMap, LngLatBounds } from 'maplibre-gl'

const mapContainer = ref<HTMLElement | null>(null)
const mapLoaded = ref(false)
const loadingText = ref('Loading map...')

let map: MaplibreMap | null = null
let maplibreModule: typeof import('maplibre-gl') | null = null

const initMap = async () => {
  if (!mapContainer.value) return

  try {
    loadingText.value = 'Loading map library...'

    // Dynamically import maplibre-gl
    maplibreModule = await import('maplibre-gl')
    const maplibregl = maplibreModule.default || maplibreModule

    loadingText.value = 'Initializing map...'

    map = new maplibregl.Map({
      container: mapContainer.value,
      style: {
        version: 8,
        sources: {
          'carto-dark': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: 'carto-dark-layer',
            type: 'raster',
            source: 'carto-dark',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [6.7, 45.2],
      zoom: 7,
      attributionControl: false,
    })

    map.on('load', () => {
      if (!map || !maplibreModule) return

      const maplibregl = maplibreModule.default || maplibreModule

      mapLoaded.value = true

      // Add route line
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

      // Route line glow
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
          'line-opacity': 0.3,
          'line-blur': 8,
        },
      })

      // Route line
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
          'line-width': 4,
        },
      })

      // Add markers for each stop
      const stops = [
        { coords: routeCoordinates[0], name: 'Thonon-les-Bains', day: 'Start', color: '#22c55e' },
        { coords: routeCoordinates[1], name: 'La Clusaz', day: 'Day 1', color: '#0ea5e9' },
        { coords: routeCoordinates[2], name: 'Sainte-Foy-Tarentaise', day: 'Day 2', color: '#0ea5e9' },
        { coords: routeCoordinates[3], name: 'Valloire', day: 'Day 3', color: '#0ea5e9' },
        { coords: routeCoordinates[4], name: 'Vars', day: 'Day 4', color: '#0ea5e9' },
        { coords: routeCoordinates[5], name: 'Valberg', day: 'Day 5', color: '#0ea5e9' },
        { coords: routeCoordinates[6], name: 'Nice', day: 'Finish', color: '#f19333' },
      ]

      stops.forEach(stop => {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.cssText = `
          width: 16px;
          height: 16px;
          background: ${stop.color};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        `

        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(`
            <div style="color: white; padding: 4px;">
              <div style="font-size: 10px; color: #f19333; text-transform: uppercase; letter-spacing: 0.05em;">${stop.day}</div>
              <div style="font-weight: 600; font-size: 14px;">${stop.name}</div>
            </div>
          `)

        new maplibregl.Marker({ element: el })
          .setLngLat(stop.coords as [number, number])
          .setPopup(popup)
          .addTo(map!)
      })

      // Fit to route bounds
      fitBounds()
    })

    map.on('error', (e) => {
      console.error('Map error:', e)
      loadingText.value = 'Map error - check console'
    })

  } catch (error) {
    console.error('Failed to initialize map:', error)
    loadingText.value = 'Failed to load map'
  }
}

const zoomIn = () => {
  if (map) map.zoomIn()
}

const zoomOut = () => {
  if (map) map.zoomOut()
}

const fitBounds = () => {
  if (!map || !maplibreModule) return

  const maplibregl = maplibreModule.default || maplibreModule
  const bounds = new maplibregl.LngLatBounds()
  routeCoordinates.forEach(coord => bounds.extend(coord as [number, number]))
  map.fitBounds(bounds, { padding: 60 })
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>
