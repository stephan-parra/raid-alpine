<template>
  <div class="container mx-auto px-4 text-center">
    <!-- Mountain silhouette layers -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        class="absolute bottom-0 w-full h-[60vh] transition-transform duration-1000"
        :class="{ 'translate-y-20 opacity-0': !isVisible }"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <!-- Far mountains -->
        <path
          d="M0,400 L0,280 Q180,180 360,250 Q540,150 720,220 Q900,100 1080,180 Q1260,80 1440,150 L1440,400 Z"
          fill="rgba(255,255,255,0.05)"
          class="animate-float"
          style="animation-delay: 0s"
        />
        <!-- Mid mountains -->
        <path
          d="M0,400 L0,300 Q120,220 240,280 Q420,180 600,250 Q780,160 960,230 Q1140,150 1320,200 L1440,180 L1440,400 Z"
          fill="rgba(255,255,255,0.08)"
          class="animate-float"
          style="animation-delay: 0.5s"
        />
        <!-- Near mountains -->
        <path
          d="M0,400 L0,320 Q200,250 400,300 Q600,220 800,280 Q1000,200 1200,260 L1440,220 L1440,400 Z"
          fill="rgba(255,255,255,0.12)"
          class="animate-float"
          style="animation-delay: 1s"
        />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto">
      <p
        class="text-alpine-400 text-lg md:text-xl mb-4 transition-all duration-700 delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        July 11-18, 2026
      </p>

      <h1
        class="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 transition-all duration-700 delay-200"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <span class="text-gradient">RAID</span> Alpine
      </h1>

      <p
        class="text-xl md:text-2xl text-snow-300 mb-8 transition-all duration-700 delay-300"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        770km across the French Alps
      </p>

      <!-- Stats row -->
      <div
        class="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 transition-all duration-700 delay-500"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.totalDistance }}</div>
          <div class="text-snow-500 text-sm">Kilometers</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.totalElevation.toLocaleString() }}</div>
          <div class="text-snow-500 text-sm">Meters Climbed</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.ridingDays }}</div>
          <div class="text-snow-500 text-sm">Epic Days</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.highestPoint }}</div>
          <div class="text-snow-500 text-sm">Peak Altitude</div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="transition-all duration-700 delay-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="flex flex-col items-center text-snow-500">
          <span class="text-sm mb-2">Scroll to begin the journey</span>
          <div class="w-6 h-10 border-2 border-snow-500 rounded-full flex justify-center">
            <div class="w-1.5 h-3 bg-snow-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeStats } from '~/data/route'

defineProps<{
  isVisible: boolean
}>()
</script>

<style scoped>
.text-gradient {
  @apply bg-gradient-to-r from-alpine-400 via-summit-400 to-alpine-400 bg-clip-text text-transparent;
  background-size: 200% auto;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
