<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Hero Section -->
    <section class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-summit-500/10 via-transparent to-transparent" />

      <div class="relative container-wide">
        <div class="max-w-3xl">
          <h1 class="font-display text-5xl md:text-6xl text-white mb-6">
            Site<span class="text-summit-400">map</span>
          </h1>
          <p class="text-xl text-snow-400 leading-relaxed">
            Navigate to all pages of the RAID Alpine website.
          </p>
        </div>
      </div>
    </section>

    <!-- Sitemap Content -->
    <section class="py-16">
      <div class="container-wide">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Main Pages -->
          <div class="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-gradient-summit rounded-xl flex items-center justify-center">
                <Icon name="heroicons:home" class="w-5 h-5 text-white" />
              </div>
              <h2 class="font-display text-2xl text-white">Main Pages</h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/journey" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  The Journey
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/flythrough" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  Flythrough
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Route Pages -->
          <div class="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-gradient-summit rounded-xl flex items-center justify-center">
                <Icon name="heroicons:map" class="w-5 h-5 text-white" />
              </div>
              <h2 class="font-display text-2xl text-white">Route</h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/route" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  Route Overview
                </NuxtLink>
              </li>
              <li v-for="day in 6" :key="day">
                <NuxtLink :to="`/route/day/${day}`" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  Day {{ day }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Information Pages -->
          <div class="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-gradient-summit rounded-xl flex items-center justify-center">
                <Icon name="heroicons:information-circle" class="w-5 h-5 text-white" />
              </div>
              <h2 class="font-display text-2xl text-white">Information</h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/cols" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  Famous Cols
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/logistics" class="text-snow-400 hover:text-summit-400 transition-colors flex items-center gap-2">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                  Logistics
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Sitemap | RAID Alpine',
  meta: [
    { name: 'description', content: 'Navigate to all pages of the RAID Alpine website - a 770km cycling adventure through the French Alps.' }
  ]
})
</script>
