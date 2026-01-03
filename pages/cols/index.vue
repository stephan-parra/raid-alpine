<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-16 overflow-hidden">
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
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            class="text-5xl md:text-6xl font-display text-white"
          >
            The Cols
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-xl text-snow-400 mt-4 max-w-2xl"
          >
            22 mountain passes across 6 days. From iconic Tour de France climbs to
            Europe's highest paved road.
          </p>
        </div>

        <!-- Key Stats -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="flex flex-wrap gap-8 mt-8"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-summit-500/20 flex items-center justify-center">
              <Icon name="mdi:mountain" class="w-5 h-5 text-summit-400" />
            </div>
            <div>
              <div class="text-xl font-display text-white">22</div>
              <div class="text-xs text-snow-500">Cols</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-alpine-500/20 flex items-center justify-center">
              <Icon name="heroicons:arrow-trending-up" class="w-5 h-5 text-alpine-400" />
            </div>
            <div>
              <div class="text-xl font-display text-white">2,802m</div>
              <div class="text-xs text-snow-500">Highest</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-glacier-500/20 flex items-center justify-center">
              <Icon name="mdi:trophy" class="w-5 h-5 text-glacier-400" />
            </div>
            <div>
              <div class="text-xl font-display text-white">280+</div>
              <div class="text-xs text-snow-500">Tour appearances</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Cols -->
    <section class="py-16 bg-slate-950">
      <div class="container-wide">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-3xl font-display text-white">Featured Climbs</h2>
            <p class="text-snow-400 mt-2">The legendary cols that define this route</p>
          </div>
          <a
            href="https://www.youtube.com/@TheColCollective"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex items-center gap-2 text-sm text-snow-400 hover:text-white transition-colors"
          >
            <Icon name="mdi:youtube" class="w-5 h-5 text-red-500" />
            Videos by The Col Collective
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ColColCard
            v-for="(col, index) in featuredCols"
            :key="col.name"
            :col="col"
            :index="index"
          />
        </div>

        <div class="mt-6 sm:hidden">
          <a
            href="https://www.youtube.com/@TheColCollective"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 text-sm text-snow-400 hover:text-white transition-colors"
          >
            <Icon name="mdi:youtube" class="w-5 h-5 text-red-500" />
            Videos by The Col Collective
          </a>
        </div>
      </div>
    </section>

    <!-- All Cols by Day -->
    <section class="py-16 bg-slate-900">
      <div class="container-wide">
        <h2 class="text-3xl font-display text-white mb-8">All Cols by Stage</h2>

        <div class="space-y-8">
          <div
            v-for="day in ridingDays"
            :key="day.day"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            class="bg-slate-800/50 rounded-2xl overflow-hidden"
          >
            <!-- Day Header -->
            <div class="flex items-center gap-4 p-5 border-b border-white/5">
              <div class="w-10 h-10 rounded-lg bg-gradient-summit flex items-center justify-center font-display text-lg text-white flex-shrink-0">
                {{ day.day }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-display text-white truncate">
                  {{ day.start }} → {{ day.finish }}
                </h3>
                <p class="text-sm text-snow-500">
                  {{ day.distance }}km · {{ day.elevation.toLocaleString() }}m elevation
                </p>
              </div>
              <div class="hidden sm:block text-right">
                <span class="text-2xl font-display text-summit-400">{{ day.cols.length }}</span>
                <span class="text-sm text-snow-500 ml-1">cols</span>
              </div>
            </div>

            <!-- Cols List -->
            <div class="divide-y divide-white/5">
              <div
                v-for="col in day.cols"
                :key="col.name"
                class="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
              >
                <!-- Elevation badge -->
                <div class="w-16 text-center flex-shrink-0">
                  <span
                    v-if="col.elevation > 0"
                    class="text-lg font-semibold"
                    :class="getElevationColor(col.elevation)"
                  >
                    {{ col.elevation }}m
                  </span>
                  <span v-else class="text-sm text-snow-500">—</span>
                </div>

                <!-- Col info -->
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-white">{{ col.name }}</h4>
                  <div v-if="col.length || col.avgGrade" class="flex items-center gap-3 mt-1 text-sm text-snow-500">
                    <span v-if="col.length">{{ col.length }}km</span>
                    <span v-if="col.avgGrade">{{ col.avgGrade }}% avg</span>
                    <span v-if="col.maxGrade" class="text-orange-400">{{ col.maxGrade }}% max</span>
                  </div>
                </div>

                <!-- Tour appearances -->
                <div v-if="col.tourAppearances" class="hidden md:flex items-center gap-1.5 text-sm text-snow-400">
                  <Icon name="mdi:trophy" class="w-4 h-4 text-yellow-500" />
                  <span>{{ col.tourAppearances }}×</span>
                </div>

                <!-- Category indicator -->
                <div class="flex-shrink-0">
                  <span
                    :class="getCategoryClass(col)"
                    class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
                  >
                    {{ getCategoryLabel(col) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Facts -->
    <section class="py-16 bg-slate-950">
      <div class="container-narrow">
        <h2 class="text-2xl font-display text-white mb-6 text-center">Did You Know?</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start gap-4 p-4 rounded-xl bg-white/5">
            <Icon name="mdi:trophy" class="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm text-snow-300">
                <span class="text-white font-semibold">Col du Galibier</span> has featured in
                <span class="text-summit-400 font-semibold">61</span> Tour de France editions since 1911
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4 p-4 rounded-xl bg-white/5">
            <Icon name="heroicons:arrow-trending-up" class="w-6 h-6 text-alpine-400 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm text-snow-300">
                <span class="text-white font-semibold">Cime de la Bonette</span> at 2,802m is the
                <span class="text-summit-400 font-semibold">highest paved road</span> in Europe
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4 p-4 rounded-xl bg-white/5">
            <Icon name="heroicons:clock" class="w-6 h-6 text-glacier-400 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm text-snow-300">
                <span class="text-white font-semibold">Col de l'Iseran</span> at 36km is one of the
                <span class="text-summit-400 font-semibold">longest continuous climbs</span> in the Alps
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4 p-4 rounded-xl bg-white/5">
            <Icon name="heroicons:star" class="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm text-snow-300">
                <span class="text-white font-semibold">Col d'Izoard</span> features monuments to
                <span class="text-summit-400 font-semibold">Coppi & Bobet</span> at the Casse Déserte
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ridingDays, featuredCols, type Col } from '~/data/route'

useHead({
  title: 'The Cols',
})

function getElevationColor(elevation: number): string {
  if (elevation >= 2500) return 'text-summit-400'
  if (elevation >= 2000) return 'text-alpine-400'
  if (elevation >= 1500) return 'text-glacier-400'
  return 'text-snow-400'
}

function getCategoryLabel(col: Col): string {
  if (!col.length || !col.avgGrade) return '—'
  // Simplified category calculation based on length and grade
  const difficulty = col.length * col.avgGrade
  if (difficulty >= 150) return 'HC'
  if (difficulty >= 100) return '1'
  if (difficulty >= 60) return '2'
  if (difficulty >= 30) return '3'
  return '4'
}

function getCategoryClass(col: Col): string {
  const label = getCategoryLabel(col)
  switch (label) {
    case 'HC': return 'bg-summit-500/30 text-summit-300'
    case '1': return 'bg-alpine-500/30 text-alpine-300'
    case '2': return 'bg-glacier-500/30 text-glacier-300'
    case '3': return 'bg-white/10 text-snow-300'
    default: return 'bg-white/5 text-snow-500'
  }
}
</script>
