<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-alpine" />
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
          class="h-[500px] md:h-[700px] rounded-3xl overflow-hidden border border-white/5"
        >
          <ClientOnly>
            <RouteRouteMap />
            <template #fallback>
              <div class="w-full h-full bg-slate-900 flex items-center justify-center">
                <div class="text-snow-500">Loading map...</div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>

    <!-- Elevation Profile -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Elevation Profile"
          title="The Challenge Ahead"
          description="18,000 meters of climbing across 6 days. Here's what you're up against."
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

    <!-- GPX Downloads placeholder -->
    <section class="section bg-slate-900/50">
      <div class="container-narrow text-center">
        <div class="glass-dark rounded-3xl p-8 md:p-12">
          <Icon name="heroicons:arrow-down-tray" class="w-16 h-16 text-summit-400 mx-auto mb-6" />
          <h2 class="text-3xl font-display text-white mb-4">GPX Files Coming Soon</h2>
          <p class="text-snow-400 max-w-md mx-auto">
            Individual stage GPX files and Strava routes will be available for download here.
            Check back soon for updates.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { days } from '~/data/route'

useHead({
  title: 'The Route',
})
</script>
