<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="/images/geneva-lake-switzerland-shutterstock.jpeg"
          alt="Alpine Accommodation"
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
            class="inline-block text-sm font-semibold uppercase tracking-wider text-alpine-400 mb-4"
          >
            Rest & Recovery
          </span>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-5xl md:text-6xl lg:text-7xl font-display text-white"
          >
            Accommodation
          </h1>
        </div>
      </div>
    </section>

    <!-- Accommodations List -->
    <section class="section bg-slate-950">
      <div class="container-wide max-w-5xl">
        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            class="glass-dark rounded-3xl overflow-hidden"
          >
            <!-- Table Header -->
            <div class="grid grid-cols-12 gap-6 p-6 border-b border-white/10 bg-white/5">
              <div class="col-span-1">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Day</span>
              </div>
              <div class="col-span-5">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Finish Town</span>
              </div>
              <div class="col-span-6">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Accommodation</span>
              </div>
            </div>

            <!-- Table Rows -->
            <div class="divide-y divide-white/5">
              <div
                v-for="(acc, index) in accommodations"
                :key="acc.day"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
                class="grid grid-cols-12 gap-6 p-6 hover:bg-white/5 transition-colors group"
              >
                <!-- Day -->
                <div class="col-span-1">
                  <div class="w-10 h-10 rounded-xl bg-alpine-500/20 flex items-center justify-center group-hover:bg-alpine-500/30 transition-colors">
                    <span class="text-lg font-semibold text-alpine-400">{{ acc.day }}</span>
                  </div>
                </div>

                <!-- Town -->
                <div class="col-span-5">
                  <div class="flex items-center gap-3">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 text-summit-400 flex-shrink-0" />
                    <span class="text-lg font-semibold text-white">{{ acc.town }}</span>
                  </div>
                </div>

                <!-- Accommodation -->
                <div class="col-span-6">
                  <div class="flex items-center gap-3">
                    <Icon name="heroicons:home" class="w-5 h-5 text-glacier-400 flex-shrink-0" />
                    <span class="text-lg text-snow-300">{{ acc.name }}</span>
                  </div>
                  <p v-if="acc.notes" class="text-sm text-snow-500 mt-2 ml-8">
                    {{ acc.notes }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden space-y-4">
          <div
            v-for="(acc, index) in accommodations"
            :key="acc.day"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <!-- Day Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-alpine-500/20 flex items-center justify-center">
                <span class="text-xl font-semibold text-alpine-400">{{ acc.day }}</span>
              </div>
              <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">
                {{ acc.day === 0 ? 'Arrival' : acc.day === 7 ? 'Departure' : `Day ${acc.day}` }}
              </span>
            </div>

            <!-- Town -->
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-1">
                <Icon name="heroicons:map-pin" class="w-4 h-4 text-summit-400" />
                <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">Finish Town</span>
              </div>
              <p class="text-lg font-semibold text-white ml-6">{{ acc.town }}</p>
            </div>

            <!-- Accommodation -->
            <div>
              <div class="flex items-center gap-2 mb-1">
                <Icon name="heroicons:home" class="w-4 h-4 text-glacier-400" />
                <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">Accommodation</span>
              </div>
              <p class="text-lg text-snow-300 ml-6">{{ acc.name }}</p>
              <p v-if="acc.notes" class="text-sm text-snow-500 mt-2 ml-6">
                {{ acc.notes }}
              </p>
            </div>
          </div>
        </div>

        <!-- Info Note -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="mt-8 p-6 rounded-2xl bg-alpine-500/10 border border-alpine-500/30"
        >
          <div class="flex items-start gap-4">
            <Icon name="heroicons:information-circle" class="w-6 h-6 text-alpine-400 flex-shrink-0" />
            <div>
              <h4 class="font-semibold text-white mb-2">Accommodation Details</h4>
              <p class="text-snow-400">
                Accommodation bookings are currently being finalized. This page will be updated with
                specific hotel names, addresses, and contact information once confirmed. All accommodations
                will include secure bike storage and are selected for their proximity to the route.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { accommodations } from '~/data/route'

useHead({
  title: 'Accommodation',
})
</script>
