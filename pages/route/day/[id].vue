<template>
  <div v-if="day">
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-alpine" />
      <div class="absolute inset-0 bg-grid opacity-20" />

      <div class="relative container-wide">
        <!-- Breadcrumb -->
        <nav
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0 }"
          class="flex items-center gap-2 text-sm text-snow-500 mb-8"
        >
          <NuxtLink to="/route" class="hover:text-white transition-colors">Route</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          <span class="text-white">Day {{ day.day }}</span>
        </nav>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0 }"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-summit-500/20 text-summit-400 font-semibold text-sm"
              >
                <span class="w-2 h-2 rounded-full bg-summit-500" />
                Day {{ day.day }}
              </span>
              <span
                v-if="day.isTransitDay"
                class="px-3 py-1 rounded-full bg-glacier-500/20 text-glacier-400 text-sm font-medium"
              >
                Transit Day
              </span>
            </div>

            <!-- Date -->
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 50 } }"
              class="flex items-center gap-2 mb-4"
            >
              <Icon name="heroicons:calendar" class="w-5 h-5 text-summit-400" />
              <span class="text-lg text-snow-300">{{ day.date }}</span>
            </div>

            <h1
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
              class="text-4xl md:text-5xl lg:text-6xl font-display text-white"
            >
              {{ day.start }}
              <Icon name="heroicons:arrow-long-right" class="w-8 h-8 mx-3 text-summit-500 inline" />
              {{ day.finish }}
            </h1>

            <p
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
              class="text-xl text-snow-400 mt-6"
            >
              {{ day.description }}
            </p>

            <!-- Stats (only for riding days) -->
            <div
              v-if="!day.isTransitDay"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
              class="flex flex-wrap gap-6 mt-8"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-alpine-500/20 flex items-center justify-center">
                  <Icon name="heroicons:map" class="w-6 h-6 text-alpine-400" />
                </div>
                <div>
                  <div class="text-2xl font-display text-white">{{ day.distance }}km</div>
                  <div class="text-xs text-snow-500 uppercase tracking-wider">Distance</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-summit-500/20 flex items-center justify-center">
                  <Icon name="mdi:elevation-rise" class="w-6 h-6 text-summit-400" />
                </div>
                <div>
                  <div class="text-2xl font-display text-white">{{ day.elevation.toLocaleString() }}m</div>
                  <div class="text-xs text-snow-500 uppercase tracking-wider">Elevation</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-glacier-500/20 flex items-center justify-center">
                  <Icon name="mdi:mountain" class="w-6 h-6 text-glacier-400" />
                </div>
                <div>
                  <div class="text-2xl font-display text-white">{{ day.cols.filter(c => c.elevation > 0).length }}</div>
                  <div class="text-xs text-snow-500 uppercase tracking-wider">Cols</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RideWithGPS Interactive Map -->
    <section v-if="day.rideWithGPSEmbed" class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Interactive Route"
          title="Ride With GPS"
          description="Explore the detailed route with elevation profile, distance markers, and turn-by-turn navigation."
        />

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="glass-dark rounded-3xl overflow-hidden"
        >
          <iframe
            :src="day.rideWithGPSEmbed"
            class="w-full border-0"
            style="min-height: 700px;"
            loading="lazy"
            :title="`Day ${day.day} route on Ride With GPS`"
          />
        </div>
      </div>
    </section>

    <!-- Cols Section (only for riding days with cols) -->
    <section v-if="day.cols.filter(c => c.elevation > 0).length > 0" class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="The Climbs"
          :title="`${day.cols.filter(c => c.elevation > 0).length} Cols to Conquer`"
          description="Here's what you'll be climbing today."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(col, index) in day.cols.filter(c => c.elevation > 0)"
            :key="col.name"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-display text-white">{{ col.name }}</h3>
              <div class="px-3 py-1 rounded-lg bg-summit-500/20 text-summit-400 font-semibold">
                {{ col.elevation }}m
              </div>
            </div>

            <div v-if="col.length || col.avgGrade" class="grid grid-cols-2 gap-4 mb-4">
              <div v-if="col.length" class="text-center p-3 rounded-xl bg-white/5">
                <div class="text-lg font-semibold text-white">{{ col.length }}km</div>
                <div class="text-xs text-snow-500">Length</div>
              </div>
              <div v-if="col.avgGrade" class="text-center p-3 rounded-xl bg-white/5">
                <div class="text-lg font-semibold text-white">{{ col.avgGrade }}%</div>
                <div class="text-xs text-snow-500">Avg Grade</div>
              </div>
            </div>

            <p v-if="col.description" class="text-sm text-snow-400">
              {{ col.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="section" :class="day.cols.filter(c => c.elevation > 0).length > 0 ? 'bg-slate-900/50' : 'bg-slate-950'">
      <div class="container-narrow">
        <UiSectionHeading
          eyebrow="Don't Miss"
          title="Stage Highlights"
        />

        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="(highlight, index) in day.highlights"
            :key="highlight"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: index * 100 } }"
            class="px-6 py-3 rounded-full glass text-white font-medium"
          >
            {{ highlight }}
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <div class="flex justify-between items-center">
          <NuxtLink
            v-if="prevRidingDay"
            :to="`/route/day/${prevRidingDay.day}`"
            class="btn-ghost"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5" />
            Day {{ prevRidingDay.day }}: {{ prevRidingDay.start }}
          </NuxtLink>
          <div v-else />

          <NuxtLink to="/route" class="btn-secondary">
            <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
            All Stages
          </NuxtLink>

          <NuxtLink
            v-if="nextRidingDay"
            :to="`/route/day/${nextRidingDay.day}`"
            class="btn-ghost"
          >
            Day {{ nextRidingDay.day }}: {{ nextRidingDay.finish }}
            <Icon name="heroicons:arrow-right" class="w-5 h-5" />
          </NuxtLink>
          <div v-else />
        </div>
      </div>
    </section>
  </div>

  <!-- 404 state -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-display text-white mb-4">Stage Not Found</h1>
      <p class="text-snow-400 mb-8">This stage doesn't exist.</p>
      <NuxtLink to="/route" class="btn-primary">
        View All Stages
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { days, ridingDays } from '~/data/route'

const route = useRoute()
const dayId = computed(() => parseInt(route.params.id as string))

const day = computed(() => days.find(d => d.day === dayId.value))

// Get prev/next riding days (skip transit days for navigation)
const prevRidingDay = computed(() => {
  const currentIndex = ridingDays.findIndex(d => d.day === dayId.value)
  if (currentIndex > 0) {
    return ridingDays[currentIndex - 1]
  }
  return null
})

const nextRidingDay = computed(() => {
  const currentIndex = ridingDays.findIndex(d => d.day === dayId.value)
  if (currentIndex >= 0 && currentIndex < ridingDays.length - 1) {
    return ridingDays[currentIndex + 1]
  }
  return null
})

useHead({
  title: () => day.value ? `Day ${day.value.day}: ${day.value.start} to ${day.value.finish}` : 'Stage Not Found',
})
</script>
