<template>
  <div
    ref="containerRef"
    class="relative w-full rounded-xl overflow-hidden bg-slate-900"
    :style="{ height }"
  >
    <!-- Map container -->
    <div ref="mapContainer" class="w-full h-full" />

    <!-- Loading skeleton -->
    <div
      v-if="!mapLoaded"
      class="absolute inset-0 flex items-center justify-center bg-slate-900"
    >
      <div class="w-6 h-6 border-2 border-alpine-500/30 border-t-alpine-500 rounded-full animate-spin" />
    </div>

    <!-- Town label overlay -->
    <div
      v-if="mapLoaded"
      class="absolute bottom-2 left-2 right-2 z-10"
    >
      <div class="glass rounded-lg px-2 py-1 text-center">
        <span class="text-xs font-medium text-white">{{ townName }}</span>
      </div>
    </div>

    <!-- Radius indicator -->
    <div
      v-if="mapLoaded"
      class="absolute top-2 right-2 z-10"
    >
      <div class="glass rounded-lg px-2 py-1">
        <span class="text-[10px] text-snow-400">{{ radiusMiles }}mi radius</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { townCoordinates } from '~/data/route'
import { createCirclePolygon } from '~/utils/geoCircle'
import { findNearbyTowns } from '~/utils/geoDistance'
import type { Map as MaplibreMap } from 'maplibre-gl'

const props = withDefaults(defineProps<{
  coordinates: [number, number]
  townName: string
  radiusMiles?: number
  height?: string
}>(), {
  radiusMiles: 2,
  height: '150px'
})

const containerRef = ref<HTMLElement | null>(null)
const mapContainer = ref<HTMLElement | null>(null)
const mapLoaded = ref(false)
const isVisible = ref(false)

let map: MaplibreMap | null = null
let maplibreModule: typeof import('maplibre-gl') | null = null

// Lazy loading with IntersectionObserver
const setupObserver = () => {
  if (!containerRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          initMap()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(containerRef.value)

  onUnmounted(() => observer.disconnect())
}

const initMap = async () => {
  if (!mapContainer.value) return

  try {
    // Dynamically import maplibre-gl
    maplibreModule = await import('maplibre-gl')
    const maplibregl = maplibreModule.default || maplibreModule

    // Calculate appropriate zoom level for the radius
    // At zoom 12, roughly 2 miles fits in the view
    const zoom = 12

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
            tileSize: 512,
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
      center: props.coordinates,
      zoom,
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
    })

    map.on('load', () => {
      if (!map || !maplibreModule) return

      const maplibregl = maplibreModule.default || maplibreModule

      // Add the radius circle
      const circleGeoJSON = createCirclePolygon(props.coordinates, props.radiusMiles)

      map.addSource('radius-circle', {
        type: 'geojson',
        data: circleGeoJSON as GeoJSON.Feature
      })

      // Circle fill
      map.addLayer({
        id: 'radius-circle-fill',
        type: 'fill',
        source: 'radius-circle',
        paint: {
          'fill-color': '#0ea5e9',
          'fill-opacity': 0.15,
        },
      })

      // Circle stroke
      map.addLayer({
        id: 'radius-circle-stroke',
        type: 'line',
        source: 'radius-circle',
        paint: {
          'line-color': '#38bdf8',
          'line-width': 2,
          'line-opacity': 0.6,
          'line-dasharray': [3, 2],
        },
      })

      // Add center marker (the finish town)
      const centerMarker = document.createElement('div')
      centerMarker.style.cssText = `
        width: 12px;
        height: 12px;
        background: #f19333;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(241, 147, 51, 0.5);
      `

      new maplibregl.Marker({ element: centerMarker })
        .setLngLat(props.coordinates)
        .addTo(map)

      // Find and add nearby towns within the radius
      const nearbyTowns = findNearbyTowns(props.townName, townCoordinates, props.radiusMiles)

      nearbyTowns.forEach((town) => {
        const nearbyMarker = document.createElement('div')
        nearbyMarker.style.cssText = `
          width: 8px;
          height: 8px;
          background: #0ea5e9;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(14, 165, 233, 0.5);
        `

        new maplibregl.Marker({ element: nearbyMarker })
          .setLngLat(town.coords)
          .addTo(map!)
      })

      mapLoaded.value = true
    })

    map.on('error', (e) => {
      console.error('Mini map error:', e)
    })

  } catch (error) {
    console.error('Failed to initialize mini map:', error)
  }
}

onMounted(() => {
  nextTick(() => {
    setupObserver()
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>
