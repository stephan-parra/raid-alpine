<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <!-- Animated gradient orbs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-summit-500/20 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-alpine-500/20 rounded-full blur-3xl animate-float animation-delay-1000" />

      <!-- Content -->
      <div class="relative z-10 container-wide text-center pt-20">
        <!-- Eyebrow -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span class="text-sm text-snow-300">11/07/2026 - 18/07/2026 | Lake Geneva to Nice</span>
        </div>

        <!-- Main title -->
        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          class="text-display-lg md:text-display-xl lg:text-display-2xl font-display tracking-tight"
        >
          <span class="text-white">RAID</span>
          <span class="text-gradient"> ALPINE</span>
        </h1>

        <!-- Subtitle -->
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
          class="text-xl md:text-2xl text-snow-400 max-w-2xl mx-auto mt-6 text-balance"
        >
          A 763km cycling adventure through the French Alps.
          Conquer legendary cols from the shores of Lake Geneva to the Mediterranean coast.
        </p>

        <!-- Stats row -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 800 } }"
          class="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
        >
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-display text-white">763</div>
            <div class="text-sm text-snow-500 uppercase tracking-wider mt-1">Kilometres</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-display text-gradient">17,360</div>
            <div class="text-sm text-snow-500 uppercase tracking-wider mt-1">Meters Climbing</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-display text-white">6</div>
            <div class="text-sm text-snow-500 uppercase tracking-wider mt-1">Riding Days</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-display text-gradient">2,802</div>
            <div class="text-sm text-snow-500 uppercase tracking-wider mt-1">Highest Point (m)</div>
          </div>
        </div>

        <!-- Countdown Timer -->
        <div class="max-w-4xl mx-auto">
          <UiCountdownTimer />
        </div>

        <!-- CTA buttons -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 1000 } }"
          class="flex flex-wrap justify-center gap-4 mt-12"
        >
          <NuxtLink to="/route" class="btn-primary">
            <Icon name="heroicons:map" class="w-5 h-5" />
            Explore the Route
          </NuxtLink>
          <NuxtLink to="/cols" class="btn-secondary">
            <Icon name="mdi:mountain" class="w-5 h-5" />
            View the Cols
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator - positioned at bottom of hero section -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 1500 } }"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div class="flex flex-col items-center gap-2 text-snow-500">
          <span class="text-xs uppercase tracking-wider">Scroll to explore</span>
          <Icon name="heroicons:chevron-down" class="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>

    <!-- Elevation Profile Section -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="The Challenge"
          title="18,000m of Climbing"
          description="Six days of relentless ascents through the French Alps, featuring some of the most iconic cols in cycling history."
        />

        <!-- Elevation visualization -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :visibleOnce="{ opacity: 1, scale: 1 }"
          class="glass-dark rounded-3xl p-6 md:p-8"
        >
          <RouteElevationProfile />

          <!-- Day markers -->
          <div class="flex justify-between mt-6 px-4">
            <div v-for="day in days" :key="day.day" class="text-center">
              <div class="text-xs text-snow-500 uppercase tracking-wider">Day {{ day.day }}</div>
              <div class="text-sm font-semibold text-white mt-1">{{ day.finish }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Route Overview Section -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="The Journey"
          title="Day by Day"
          description="From the shores of Lake Geneva through pine forests, over legendary alpine passes, to the Mediterranean coast."
        />

        <!-- Day cards grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RouteDayCard
            v-for="(day, index) in days"
            :key="day.day"
            :day="day"
            :index="index"
          />
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
          <NuxtLink to="/route" class="btn-primary">
            <Icon name="heroicons:map" class="w-5 h-5" />
            View Full Route Details
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Cols Section -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Legendary Climbs"
          title="Famous Cols"
          description="These iconic mountain passes have defined cycling history. Now it's your turn to conquer them."
        />

        <!-- Featured cols grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ColColCard
            v-for="(col, index) in featuredCols.slice(0, 6)"
            :key="col.name"
            :col="col"
            :index="index"
          />
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
          <NuxtLink to="/cols" class="btn-secondary">
            <Icon name="mdi:mountain" class="w-5 h-5" />
            View All Cols
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="The Route"
          title="Lake Geneva to Nice"
          description="770km through the heart of the French Alps."
        />

        <!-- Map -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-white/5"
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

    <!-- Key Info Section -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Essential Info"
          title="Plan Your Adventure"
          description="Everything you need to know to tackle this epic route."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UiStatCard
            :value="770"
            suffix="km"
            label="Total Distance"
            icon="heroicons:map"
            variant="alpine"
            :delay="0"
          />
          <UiStatCard
            :value="'18,000'"
            suffix="m"
            label="Total Elevation"
            icon="mdi:elevation-rise"
            variant="summit"
            :delay="100"
          />
          <UiStatCard
            :value="6"
            label="Riding Days"
            icon="heroicons:calendar"
            variant="glacier"
            :delay="200"
          />
          <UiStatCard
            :value="2802"
            suffix="m"
            label="Highest Point"
            icon="mdi:mountain"
            variant="summit"
            :delay="300"
          />
        </div>

        <!-- Info cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 0 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:sun" class="w-8 h-8 text-summit-400 mb-4" />
            <h3 class="text-lg font-semibold text-white mb-2">Best Time</h3>
            <p class="text-snow-400 text-sm">
              June to September. High cols like Iseran and Bonette may be closed until mid-June due to snow.
            </p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:bolt" class="w-8 h-8 text-alpine-400 mb-4" />
            <h3 class="text-lg font-semibold text-white mb-2">Difficulty</h3>
            <p class="text-snow-400 text-sm">
              Challenging. Requires mountain cycling experience and excellent fitness for 6 consecutive big days.
            </p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:cloud" class="w-8 h-8 text-glacier-400 mb-4" />
            <h3 class="text-lg font-semibold text-white mb-2">Weather</h3>
            <p class="text-snow-400 text-sm">
              Expect cold at altitude (below 5°C at 2,800m even in summer). Weather changes quickly in the mountains.
            </p>
          </div>
        </div>

        <!-- Logistics CTA -->
        <div class="text-center mt-12">
          <NuxtLink to="/logistics" class="btn-primary">
            <Icon name="heroicons:clipboard-document-list" class="w-5 h-5" />
            View Full Logistics Guide
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { days, featuredCols } from '~/data/route'

useHead({
  title: 'RAID Alpine | Lake Geneva to Nice',
})
</script>
