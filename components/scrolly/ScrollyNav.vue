<template>
  <nav class="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50">
    <ul class="flex flex-col gap-3">
      <li v-for="section in sections" :key="section.id">
        <button
          @click="$emit('navigate', section.id)"
          class="group flex items-center gap-3"
          :aria-label="`Navigate to ${section.label}`"
        >
          <!-- Label (shows on hover or active) -->
          <span
            class="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            :class="{ '!opacity-100': currentSection === section.id }"
          >
            {{ section.label }}
          </span>

          <!-- Dot -->
          <span
            class="w-3 h-3 rounded-full border-2 transition-all duration-300"
            :class="[
              currentSection === section.id
                ? 'bg-summit-400 border-summit-400 scale-125'
                : 'border-white/50 group-hover:border-white group-hover:scale-110'
            ]"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Section {
  id: string
  label: string
}

defineProps<{
  currentSection: string
  sections: Section[]
}>()

defineEmits<{
  navigate: [sectionId: string]
}>()
</script>
