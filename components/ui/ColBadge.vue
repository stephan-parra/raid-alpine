<template>
  <span class="col-badge">
    <Icon name="mdi:mountain" class="w-4 h-4" />
    <span>{{ name }}</span>
    <span class="text-alpine-400 font-semibold">{{ elevation }}m</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  elevation: number
}>()
</script>
