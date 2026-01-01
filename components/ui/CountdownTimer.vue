<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 900 } }"
    class="glass-dark rounded-3xl p-6 md:p-8 mt-10"
  >
    <div class="text-center mb-6">
      <h3 class="text-xl md:text-2xl font-semibold text-white mb-1">Event Starts In</h3>
      <p class="text-sm text-snow-500">Countdown to midnight, July 11th 2026</p>
    </div>

    <div class="grid grid-cols-4 gap-4 md:gap-6">
      <div class="text-center">
        <div class="glass rounded-2xl p-4 md:p-6">
          <div class="text-4xl md:text-5xl lg:text-6xl font-display text-gradient">
            {{ days }}
          </div>
          <div class="text-xs md:text-sm text-snow-500 uppercase tracking-wider mt-2">Days</div>
        </div>
      </div>

      <div class="text-center">
        <div class="glass rounded-2xl p-4 md:p-6">
          <div class="text-4xl md:text-5xl lg:text-6xl font-display text-white">
            {{ hours }}
          </div>
          <div class="text-xs md:text-sm text-snow-500 uppercase tracking-wider mt-2">Hours</div>
        </div>
      </div>

      <div class="text-center">
        <div class="glass rounded-2xl p-4 md:p-6">
          <div class="text-4xl md:text-5xl lg:text-6xl font-display text-white">
            {{ minutes }}
          </div>
          <div class="text-xs md:text-sm text-snow-500 uppercase tracking-wider mt-2">Minutes</div>
        </div>
      </div>

      <div class="text-center">
        <div class="glass rounded-2xl p-4 md:p-6">
          <div class="text-4xl md:text-5xl lg:text-6xl font-display text-gradient">
            {{ seconds }}
          </div>
          <div class="text-xs md:text-sm text-snow-500 uppercase tracking-wider mt-2">Seconds</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

let intervalId: NodeJS.Timeout | null = null

// Target date: July 11, 2026 at 12:00 AM (midnight)
const targetDate = new Date('2026-07-11T00:00:00').getTime()

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    // Countdown finished
    days.value = '00'
    hours.value = '00'
    minutes.value = '00'
    seconds.value = '00'
    if (intervalId) {
      clearInterval(intervalId)
    }
    return
  }

  // Calculate time components
  const d = Math.floor(distance / (1000 * 60 * 60 * 24))
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((distance % (1000 * 60)) / 1000)

  // Update with zero padding
  days.value = String(d).padStart(2, '0')
  hours.value = String(h).padStart(2, '0')
  minutes.value = String(m).padStart(2, '0')
  seconds.value = String(s).padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  intervalId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
