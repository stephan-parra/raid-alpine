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

    <!-- Radius indicator -->
    <div
      v-if="mapLoaded"
      class="absolute top-2 right-2 z-10"
    >
      <div class="bg-slate-900/90 backdrop-blur-sm rounded-lg px-2 py-1">
        <span class="text-[10px] text-snow-300">{{ radiusMiles }}mi radius</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createCirclePolygon } from '~/utils/geoCircle'
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
          // Use OSM tiles which show town/village labels clearly
          'osm': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: props.coordinates,
      zoom,
      attributionControl: false,
      fadeDuration: 0,
    })

    // Add zoom controls
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      'bottom-right'
    )

    map.on('load', () => {
      if (!map || !maplibreModule) return

      const maplibregl = maplibreModule.default || maplibreModule

      // Add the radius circle
      const circleGeoJSON = createCirclePolygon(props.coordinates, props.radiusMiles)

      map.addSource('radius-circle', {
        type: 'geojson',
        data: circleGeoJSON as GeoJSON.Feature
      })

      // Circle fill - more visible on light map
      map.addLayer({
        id: 'radius-circle-fill',
        type: 'fill',
        source: 'radius-circle',
        paint: {
          'fill-color': '#0ea5e9',
          'fill-opacity': 0.2,
        },
      })

      // Circle stroke - bolder for visibility
      map.addLayer({
        id: 'radius-circle-stroke',
        type: 'line',
        source: 'radius-circle',
        paint: {
          'line-color': '#0284c7',
          'line-width': 3,
          'line-opacity': 0.8,
        },
      })

      // Add center marker (the finish town)
      const centerMarker = document.createElement('div')
      centerMarker.style.cssText = `
        width: 14px;
        height: 14px;
        background: #f19333;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `

      new maplibregl.Marker({ element: centerMarker })
        .setLngLat(props.coordinates)
        .addTo(map)

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
