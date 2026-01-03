<template>
  <div class="container mx-auto px-4 text-center">
    <div class="max-w-4xl mx-auto">
      <!-- Mediterranean waves -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          class="absolute bottom-0 w-full h-[30vh]"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,100 Q360,60 720,100 Q1080,140 1440,100 L1440,200 Z"
            fill="rgba(14, 165, 233, 0.1)"
            class="animate-wave"
          />
          <path
            d="M0,200 L0,120 Q360,80 720,120 Q1080,160 1440,120 L1440,200 Z"
            fill="rgba(14, 165, 233, 0.15)"
            class="animate-wave"
            style="animation-delay: 0.5s"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <div
          class="transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <span class="text-4xl">🏁</span>
            <span class="text-white font-bold text-xl">Journey Complete</span>
          </div>
        </div>

        <h2
          class="text-5xl md:text-7xl font-display text-white mb-6 transition-all duration-700 delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          Welcome to <span class="text-gradient">Nice</span>
        </h2>

        <p
          class="text-xl md:text-2xl text-snow-300 mb-12 transition-all duration-700 delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          The Mediterranean awaits. 770km conquered.
        </p>

        <!-- Final stats -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-300"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="glass rounded-xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.totalDistance }}</div>
            <div class="text-snow-400">Kilometers</div>
          </div>
          <div class="glass rounded-xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.totalElevation.toLocaleString() }}</div>
            <div class="text-snow-400">Meters Climbed</div>
          </div>
          <div class="glass rounded-xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-summit-400">20+</div>
            <div class="text-snow-400">Cols Conquered</div>
          </div>
          <div class="glass rounded-xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-summit-400">{{ routeStats.ridingDays }}</div>
            <div class="text-snow-400">Epic Days</div>
          </div>
        </div>

        <!-- CTA -->
        <div
          class="flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <NuxtLink to="/route" class="btn-primary">
            Explore the Route
          </NuxtLink>
          <NuxtLink to="/flythrough" class="btn-secondary">
            3D Flythrough
          </NuxtLink>
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
  @apply bg-gradient-to-r from-alpine-400 via-cyan-400 to-alpine-400 bg-clip-text text-transparent;
}

.animate-wave {
  animation: wave 4s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-20px); }
}
</style>
