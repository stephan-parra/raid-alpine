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
            The Cols
          </span>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-5xl md:text-6xl lg:text-7xl font-display text-white"
          >
            Legendary Climbs
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="text-xl text-snow-400 mt-6 max-w-2xl"
          >
            From the highest paved pass in the Alps to iconic Tour de France climbs,
            these mountain passes have defined cycling history for over a century.
          </p>
        </div>

        <!-- Stats -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="flex flex-wrap gap-8 mt-10"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-summit-500/20 flex items-center justify-center">
              <Icon name="mdi:mountain" class="w-6 h-6 text-summit-400" />
            </div>
            <div>
              <div class="text-2xl font-display text-white">20+</div>
              <div class="text-xs text-snow-500 uppercase tracking-wider">Total Cols</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-alpine-500/20 flex items-center justify-center">
              <Icon name="heroicons:arrow-trending-up" class="w-6 h-6 text-alpine-400" />
            </div>
            <div>
              <div class="text-2xl font-display text-white">2,802m</div>
              <div class="text-xs text-snow-500 uppercase tracking-wider">Highest Point</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-glacier-500/20 flex items-center justify-center">
              <Icon name="mdi:trophy" class="w-6 h-6 text-glacier-400" />
            </div>
            <div>
              <div class="text-2xl font-display text-white">100+</div>
              <div class="text-xs text-snow-500 uppercase tracking-wider">Tour Appearances</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Cols -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="The Legends"
          title="Featured Cols"
          description="These iconic mountain passes are the highlights of the RAID Alpine route."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ColColCard
            v-for="(col, index) in featuredCols"
            :key="col.name"
            :col="col"
            :index="index"
          />
        </div>
      </div>
    </section>

    <!-- All Cols by Day -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Complete List"
          title="All Cols by Stage"
          description="Every climb on the RAID Alpine route, organized by day."
        />

        <div class="space-y-12">
          <div v-for="day in days" :key="day.day">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gradient-summit flex items-center justify-center font-display text-xl text-white">
                {{ day.day }}
              </div>
              <div>
                <h3 class="text-xl font-display text-white">Day {{ day.day }}</h3>
                <p class="text-sm text-snow-500">{{ day.start }} → {{ day.finish }}</p>
              </div>
              <div class="ml-auto text-right">
                <div class="text-lg font-semibold text-white">{{ day.elevation.toLocaleString() }}m</div>
                <div class="text-xs text-snow-500">elevation</div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div
                v-for="col in day.cols"
                :key="col.name"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :visibleOnce="{ opacity: 1, y: 0 }"
                class="glass-dark rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div class="flex items-center justify-between mb-2">
                  <Icon name="mdi:mountain" class="w-5 h-5 text-summit-400" />
                  <span class="text-sm font-semibold text-alpine-400">{{ col.elevation }}m</span>
                </div>
                <h4 class="font-semibold text-white text-sm">{{ col.name }}</h4>
                <div v-if="col.length" class="text-xs text-snow-500 mt-1">
                  {{ col.length }}km @ {{ col.avgGrade }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Col Facts -->
    <section class="section bg-slate-950">
      <div class="container-narrow">
        <UiSectionHeading
          eyebrow="Did You Know?"
          title="Col Facts"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0 }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-summit-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:trophy" class="w-6 h-6 text-summit-400" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-2">Tour de France History</h3>
                <p class="text-sm text-snow-400">
                  The Col du Galibier has featured in 61 Tour de France editions since 1911,
                  making it one of the most climbed passes in professional cycling history.
                </p>
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 100 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-alpine-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:arrow-trending-up" class="w-6 h-6 text-alpine-400" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-2">Highest in Europe</h3>
                <p class="text-sm text-snow-400">
                  The Cime de la Bonette at 2,802m is the highest paved road in Europe,
                  offering breathtaking 360° views of the Maritime Alps.
                </p>
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-glacier-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:clock" class="w-6 h-6 text-glacier-400" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-2">Epic Climb</h3>
                <p class="text-sm text-snow-400">
                  The Col de l'Iseran climb from the valley floor is 36km long -
                  one of the longest continuous climbs you'll ever face.
                </p>
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 300 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:star" class="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-2">Cycling Legends</h3>
                <p class="text-sm text-snow-400">
                  The Col d'Izoard features monuments to Fausto Coppi and Louison Bobet -
                  two of cycling's greatest champions who conquered this climb.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { days, featuredCols } from '~/data/route'

useHead({
  title: 'The Cols',
})
</script>
