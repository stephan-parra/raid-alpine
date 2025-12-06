<template>
  <div class="min-h-screen bg-slate-950">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global app setup
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | RAID Alpine` : 'RAID Alpine | Lake Geneva to Nice'
  },
})
</script>
