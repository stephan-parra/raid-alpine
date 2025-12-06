<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <div class="text-center">
      <div class="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-summit flex items-center justify-center shadow-glow">
        <Icon name="mdi:mountain" class="w-12 h-12 text-white" />
      </div>

      <h1 class="text-6xl md:text-8xl font-display text-white mb-4">
        {{ error?.statusCode || 404 }}
      </h1>

      <h2 class="text-2xl md:text-3xl font-display text-snow-400 mb-4">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h2>

      <p class="text-snow-500 max-w-md mx-auto mb-8">
        {{ error?.statusCode === 404
          ? "Looks like you've taken a wrong turn on the mountain. This page doesn't exist."
          : error?.message || "An unexpected error occurred."
        }}
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink to="/" class="btn-primary">
          <Icon name="heroicons:home" class="w-5 h-5" />
          Back to Home
        </NuxtLink>
        <NuxtLink to="/route" class="btn-secondary">
          <Icon name="heroicons:map" class="w-5 h-5" />
          View Route
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError()

useHead({
  title: error.value?.statusCode === 404 ? 'Page Not Found' : 'Error',
})
</script>
