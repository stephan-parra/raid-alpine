<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Full-screen 3D map experience -->
    <ClientOnly>
      <RouteMap3D />
      <template #fallback>
        <div class="w-full h-screen flex items-center justify-center bg-slate-950">
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-4 border-summit-500/30 border-t-summit-500 rounded-full animate-spin" />
            <span class="text-snow-300 text-lg">Loading 3D Experience...</span>
          </div>
        </div>
      </template>
    </ClientOnly>

    <!-- Back navigation (desktop) -->
    <NuxtLink
      to="/route"
      class="hidden md:flex fixed top-6 left-6 z-30 items-center gap-2 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group"
    >
      <Icon name="heroicons:arrow-left" class="w-5 h-5 text-snow-400 group-hover:text-white transition-colors" />
      <span class="text-snow-400 group-hover:text-white transition-colors">Back to Route</span>
    </NuxtLink>

    <!-- Title overlay -->
    <div class="fixed bottom-32 md:bottom-8 right-6 z-20 text-right pointer-events-none">
      <h1 class="text-2xl md:text-4xl font-bebas text-white/80 tracking-wide">RAID ALPINE</h1>
      <p class="text-sm text-snow-500">3D Route Flythrough</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'fullscreen',
})

useHead({
  title: '3D Flythrough | RAID Alpine',
  meta: [
    {
      name: 'description',
      content: 'Experience the RAID Alpine route in stunning 3D. Fly through 770km of the French Alps from Lake Geneva to Nice.',
    },
  ],
})
</script>

<style scoped>
.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
