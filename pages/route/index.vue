<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="/images/raid-alpine-6.jpg"
          alt="Alpine mountain scenery"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- Dark overlay with gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90" />
      <div class="absolute inset-0 bg-grid opacity-20" />

      <div class="relative container-wide">
        <div class="max-w-3xl">
          <span
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            class="inline-block text-sm font-semibold uppercase tracking-wider text-summit-400 mb-4"
          >
            The Route
          </span>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-5xl md:text-6xl lg:text-7xl font-display text-white"
          >
            770km Through the Alps
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="text-xl text-snow-400 mt-6 max-w-2xl"
          >
            From the shores of Lake Geneva to the Mediterranean coast in Nice.
            Six days of epic climbing through some of the most beautiful and challenging
            terrain in the cycling world.
          </p>
        </div>

        <!-- Quick stats -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="flex flex-wrap gap-8 mt-10"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-alpine-500/20 flex items-center justify-center">
              <Icon name="heroicons:map" class="w-6 h-6 text-alpine-400" />
            </div>
            <div>
              <div class="text-2xl font-display text-white">770km</div>
              <div class="text-xs text-snow-500 uppercase tracking-wider">Distance</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-summit-500/20 flex items-center justify-center">
              <Icon name="mdi:elevation-rise" class="w-6 h-6 text-summit-400" />
            </div>
            <div>
              <div class="text-2xl font-display text-white">18,000m</div>
              <div class="text-xs text-snow-500 uppercase tracking-wider">Elevation</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-glacier-500/20 flex items-center justify-center">
              <Icon name="mdi:mountain" class="w-6 h-6 text-glacier-400" />
            </div>
            <div>
              <div class="text-2xl font-display text-white">20+</div>
              <div class="text-xs text-snow-500 uppercase tracking-wider">Cols</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Map -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Interactive Map"
          title="The Journey"
          description="Follow the route from Lake Geneva south through the heart of the French Alps."
        />

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.98 }"
          :visibleOnce="{ opacity: 1, scale: 1 }"
          class="rounded-3xl overflow-hidden border border-white/5"
        >
          <ClientOnly>
            <RouteRouteMap />
            <template #fallback>
              <div class="w-full h-[500px] md:h-[700px] bg-slate-900 flex items-center justify-center rounded-2xl">
                <div class="text-snow-500">Loading map...</div>
              </div>
            </template>
          </ClientOnly>
        </div>

        <!-- 3D Flythrough CTA -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="mt-8"
        >
          <NuxtLink
            to="/flythrough"
            class="group block relative overflow-hidden rounded-2xl border border-white/10 hover:border-summit-500/50 transition-all duration-300"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-alpine-500/10 via-summit-500/10 to-glacier-500/10 group-hover:opacity-100 opacity-50 transition-opacity" />
            <div class="relative px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-summit-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name="mdi:rotate-3d-variant" class="w-7 h-7 text-summit-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white group-hover:text-summit-400 transition-colors">
                    Experience in 3D
                  </h3>
                  <p class="text-sm text-snow-500">
                    Fly through the Alps in the immersive 3D terrain viewer
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-summit-400 group-hover:translate-x-1 transition-transform">
                <span class="text-sm font-medium">Launch Flythrough</span>
                <Icon name="heroicons:arrow-right" class="w-5 h-5" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Elevation Profile -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Elevation Profile"
          title="The Challenge Ahead"
          description="18,000 metres of climbing across 6 days. Here's what you're up against."
        />

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="glass-dark rounded-3xl p-8"
        >
          <RouteElevationProfile />

          <!-- Key peaks annotations -->
          <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 rounded-xl bg-white/5">
              <div class="text-sm text-summit-400 font-semibold">Day 3</div>
              <div class="text-lg font-display text-white">Col de l'Iseran</div>
              <div class="text-sm text-snow-500">2,770m</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-white/5">
              <div class="text-sm text-summit-400 font-semibold">Day 4</div>
              <div class="text-lg font-display text-white">Col du Galibier</div>
              <div class="text-sm text-snow-500">2,642m</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-white/5">
              <div class="text-sm text-summit-400 font-semibold">Day 4</div>
              <div class="text-lg font-display text-white">Col d'Izoard</div>
              <div class="text-sm text-snow-500">2,361m</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-white/5">
              <div class="text-sm text-summit-400 font-semibold">Day 5</div>
              <div class="text-lg font-display text-white">Cime de la Bonette</div>
              <div class="text-sm text-snow-500">2,802m</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Day by Day Breakdown -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Stage by Stage"
          title="The Full Itinerary"
          description="Detailed breakdown of each day's riding with cols, distances, and elevation."
        />

        <div class="space-y-8">
          <RouteDayCard
            v-for="(day, index) in days"
            :key="day.day"
            :day="day"
            :index="index"
          />
        </div>
      </div>
    </section>

    <!-- GPX Downloads -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Downloads"
          title="GPX Files"
          description="Download individual stage routes for your GPS device or cycling app."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="day in ridingDays"
            :key="day.day"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="text-sm text-summit-400 font-semibold">Day {{ day.day }}</span>
                <h3 class="text-lg font-display text-white">{{ day.start }} to {{ day.finish }}</h3>
                <p class="text-sm text-snow-500">{{ day.distance }}km / {{ day.elevation.toLocaleString() }}m</p>
              </div>
              <div class="w-10 h-10 rounded-lg bg-alpine-500/20 flex items-center justify-center">
                <Icon name="mdi:map-marker-path" class="w-5 h-5 text-alpine-400" />
              </div>
            </div>

            <div v-if="hasDownload(day.day)" class="flex gap-2">
              <a
                :href="getDownloadUrl(day.day, 'gpx')"
                download
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-alpine-500/20 hover:bg-alpine-500/30 text-alpine-400 rounded-lg text-sm font-medium transition-colors"
              >
                <Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
                GPX
              </a>
            </div>

            <div v-else class="flex items-center gap-2 text-snow-500 text-sm">
              <Icon name="heroicons:clock" class="w-4 h-4" />
              <span>Coming soon</span>
            </div>
          </div>
        </div>

        <p class="text-center text-snow-500 text-sm mt-6">
          Compatible with Garmin, Wahoo, Strava, Komoot, and most GPS cycling computers.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { days, ridingDays, getDownloadUrl, hasDownload } from '~/data/route'

useHead({
  title: 'The Route',
})
</script>
