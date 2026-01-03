<template>
  <div ref="containerRef" class="scrolly-container">
    <!-- Fixed background image -->
    <div class="fixed inset-0 -z-20">
      <img
        src="/images/raid-alpine-6.jpg"
        alt="Alpine mountain scenery"
        class="w-full h-full object-cover opacity-30"
      />
    </div>
    <!-- Fixed background gradient that transitions -->
    <div
      class="fixed inset-0 transition-colors duration-1000 -z-10"
      :style="{ background: currentGradient }"
    />
    <!-- Grid overlay for visual consistency -->
    <div class="fixed inset-0 bg-grid opacity-10 -z-10" />

    <!-- Fixed elevation profile -->
    <div class="fixed bottom-0 left-0 right-0 z-20 pointer-events-none">
      <ScrollyElevation :progress="scrollProgress" :current-day="currentDay" />
    </div>

    <!-- Chapter navigation -->
    <ScrollyNav
      :current-section="currentSection"
      :sections="sections"
      @navigate="scrollToSection"
    />

    <!-- Hero section -->
    <section ref="heroRef" data-section="intro" class="min-h-screen flex items-center justify-center relative">
      <ScrollyHero :is-visible="currentSection === 'intro'" />
    </section>

    <!-- Day sections -->
    <section
      v-for="day in ridingDays"
      :key="day.day"
      :ref="el => setDayRef(el, day.day)"
      :data-section="`day-${day.day}`"
      class="min-h-screen flex items-center relative py-20"
    >
      <ScrollyDay
        :day="day"
        :is-visible="currentSection === `day-${day.day}`"
        :day-index="day.day"
      />
    </section>

    <!-- Finale section -->
    <section ref="finaleRef" data-section="finale" class="min-h-screen flex items-center justify-center relative">
      <ScrollyFinale :is-visible="currentSection === 'finale'" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ridingDays, routeStats } from '~/data/route'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

definePageMeta({
  layout: 'fullscreen'
})

useHead({
  title: 'The Journey | RAID Alpine',
  meta: [
    { name: 'description', content: 'Experience the RAID Alpine route through an immersive scrolling journey across the French Alps.' }
  ]
})

// Refs
const containerRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const finaleRef = ref<HTMLElement | null>(null)
const dayRefs = ref<Record<number, HTMLElement | null>>({})

// State
const scrollProgress = ref(0)
const currentSection = ref('intro')
const currentDay = ref(0)

// Sections for navigation
const sections = computed(() => [
  { id: 'intro', label: 'Start' },
  ...ridingDays.map(d => ({ id: `day-${d.day}`, label: `Day ${d.day}` })),
  { id: 'finale', label: 'Finish' }
])

// Gradient backgrounds for each section
const gradients: Record<string, string> = {
  intro: 'linear-gradient(180deg, #0c1929 0%, #1a3a5c 50%, #2d5a7b 100%)',
  'day-1': 'linear-gradient(180deg, #1a3a5c 0%, #2d6a4f 50%, #40916c 100%)',
  'day-2': 'linear-gradient(180deg, #2d6a4f 0%, #52796f 50%, #84a98c 100%)',
  'day-3': 'linear-gradient(180deg, #52796f 0%, #6b705c 50%, #a5a58d 100%)',
  'day-4': 'linear-gradient(180deg, #6b705c 0%, #7f5539 50%, #b08968 100%)',
  'day-5': 'linear-gradient(180deg, #7f5539 0%, #9c6644 50%, #dda15e 100%)',
  'day-6': 'linear-gradient(180deg, #9c6644 0%, #bc6c25 50%, #fefae0 100%)',
  finale: 'linear-gradient(180deg, #219ebc 0%, #8ecae6 50%, #fefae0 100%)'
}

const currentGradient = computed(() => gradients[currentSection.value] || gradients.intro)

// Set day refs
const setDayRef = (el: any, day: number) => {
  if (el) dayRefs.value[day] = el
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(`[data-section="${sectionId}"]`)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

// Setup scroll triggers
onMounted(() => {
  // Main scroll progress
  ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      scrollProgress.value = self.progress
    }
  })

  // Section observers
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const section = entry.target.getAttribute('data-section')
          if (section) {
            currentSection.value = section
            // Extract day number
            const dayMatch = section.match(/day-(\d+)/)
            if (dayMatch) {
              currentDay.value = parseInt(dayMatch[1])
            } else if (section === 'finale') {
              currentDay.value = 7
            } else {
              currentDay.value = 0
            }
          }
        }
      })
    },
    { threshold: 0.5 }
  )

  // Observe all sections
  document.querySelectorAll('[data-section]').forEach((section) => {
    observer.observe(section)
  })

  onUnmounted(() => {
    observer.disconnect()
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
})
</script>

<style scoped>
.scrolly-container {
  @apply relative;
}
</style>
