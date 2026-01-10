<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="/images/geneva-lake-switzerland-shutterstock.jpeg"
          alt="Alpine Accommodation"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- Dark overlay with gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90" />
      <div class="absolute inset-0 bg-grid opacity-20" />

      <div class="relative container-wide">
        <div class="max-w-3xl">
          <span
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            class="inline-block text-sm font-semibold uppercase tracking-wider text-alpine-400 mb-4"
          >
            Rest & Recovery
          </span>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-5xl md:text-6xl lg:text-7xl font-display text-white"
          >
            Accommodation
          </h1>
        </div>
      </div>
    </section>

    <!-- Accommodations List -->
    <section class="section bg-slate-950">
      <div class="container-wide max-w-5xl">
        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            class="glass-dark rounded-3xl overflow-hidden"
          >
            <!-- Table Header -->
            <div class="grid grid-cols-12 gap-4 p-6 border-b border-white/10 bg-white/5">
              <div class="col-span-1">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Day</span>
              </div>
              <div class="col-span-3">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Town</span>
              </div>
              <div class="col-span-2">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Map</span>
              </div>
              <div class="col-span-3">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Accommodation</span>
              </div>
              <div class="col-span-3">
                <span class="text-sm font-semibold uppercase tracking-wider text-snow-500">Booking ID</span>
              </div>
            </div>

            <!-- Table Rows -->
            <div class="divide-y divide-white/5">
              <div
                v-for="(acc, index) in accommodations"
                :key="acc.day"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
                class="grid grid-cols-12 gap-4 p-6 hover:bg-white/5 transition-colors group"
              >
                <!-- Day -->
                <div class="col-span-1 flex items-center">
                  <div class="w-10 h-10 rounded-xl bg-alpine-500/20 flex items-center justify-center group-hover:bg-alpine-500/30 transition-colors">
                    <span class="text-lg font-semibold text-alpine-400">{{ acc.day }}</span>
                  </div>
                </div>

                <!-- Town -->
                <div class="col-span-3 flex items-center">
                  <div class="flex items-center gap-3">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 text-summit-400 flex-shrink-0" />
                    <span class="text-lg font-semibold text-white">{{ acc.town }}</span>
                  </div>
                </div>

                <!-- Map -->
                <div class="col-span-2">
                  <AccommodationMiniMap
                    v-if="townCoordinates[acc.town]"
                    :coordinates="townCoordinates[acc.town]"
                    :town-name="acc.town"
                    :radius-miles="2"
                    height="160px"
                  />
                </div>

                <!-- Accommodation -->
                <div class="col-span-3 flex items-center">
                  <div>
                    <div class="flex items-center gap-3">
                      <Icon name="heroicons:home" class="w-5 h-5 text-glacier-400 flex-shrink-0" />
                      <span class="text-lg text-snow-300">{{ acc.name }}</span>
                    </div>
                    <p v-if="acc.notes" class="text-sm text-snow-500 mt-2 ml-8">
                      {{ acc.notes }}
                    </p>
                  </div>
                </div>

                <!-- Booking ID -->
                <div class="col-span-3 flex items-center">
                  <div v-if="acc.bookingId" class="flex items-center gap-2">
                    <span class="text-sm font-mono text-snow-400 select-none">
                      {{ unlockedBookings.has(acc.day) ? acc.bookingId : '••••••••' }}
                    </span>
                    <button
                      @click="requestUnlock(acc.day)"
                      class="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-snow-500 hover:text-alpine-400"
                      :class="{ 'text-alpine-400': unlockedBookings.has(acc.day) }"
                      :title="unlockedBookings.has(acc.day) ? 'Booking ID revealed' : 'Click to reveal booking ID'"
                    >
                      <Icon
                        :name="unlockedBookings.has(acc.day) ? 'heroicons:eye' : 'heroicons:eye-slash'"
                        class="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden space-y-4">
          <div
            v-for="(acc, index) in accommodations"
            :key="acc.day"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <!-- Day Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-alpine-500/20 flex items-center justify-center">
                <span class="text-xl font-semibold text-alpine-400">{{ acc.day }}</span>
              </div>
              <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">
                {{ acc.day === 0 ? 'Arrival' : acc.day === 7 ? 'Departure' : `Day ${acc.day}` }}
              </span>
            </div>

            <!-- Map -->
            <div class="mb-4">
              <AccommodationMiniMap
                v-if="townCoordinates[acc.town]"
                :coordinates="townCoordinates[acc.town]"
                :town-name="acc.town"
                :radius-miles="2"
                height="180px"
              />
            </div>

            <!-- Town -->
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-1">
                <Icon name="heroicons:map-pin" class="w-4 h-4 text-summit-400" />
                <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">{{ acc.day === 0 ? 'Start Town' : 'Finish Town' }}</span>
              </div>
              <p class="text-lg font-semibold text-white ml-6">{{ acc.town }}</p>
            </div>

            <!-- Accommodation -->
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-1">
                <Icon name="heroicons:home" class="w-4 h-4 text-glacier-400" />
                <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">Accommodation</span>
              </div>
              <p class="text-lg text-snow-300 ml-6">{{ acc.name }}</p>
              <p v-if="acc.notes" class="text-sm text-snow-500 mt-2 ml-6">
                {{ acc.notes }}
              </p>
            </div>

            <!-- Booking ID -->
            <div v-if="acc.bookingId">
              <div class="flex items-center gap-2 mb-1">
                <Icon name="heroicons:ticket" class="w-4 h-4 text-yellow-400" />
                <span class="text-xs uppercase tracking-wider text-snow-500 font-semibold">Booking ID</span>
              </div>
              <div class="flex items-center gap-2 ml-6">
                <span class="text-sm font-mono text-snow-400 select-none">
                  {{ unlockedBookings.has(acc.day) ? acc.bookingId : '••••••••' }}
                </span>
                <button
                  @click="requestUnlock(acc.day)"
                  class="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-snow-500 hover:text-alpine-400"
                  :class="{ 'text-alpine-400': unlockedBookings.has(acc.day) }"
                  :title="unlockedBookings.has(acc.day) ? 'Booking ID revealed' : 'Click to reveal booking ID'"
                >
                  <Icon
                    :name="unlockedBookings.has(acc.day) ? 'heroicons:eye' : 'heroicons:eye-slash'"
                    class="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Note -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="mt-8 p-6 rounded-2xl bg-alpine-500/10 border border-alpine-500/30"
        >
          <div class="flex items-start gap-4">
            <Icon name="heroicons:information-circle" class="w-6 h-6 text-alpine-400 flex-shrink-0" />
            <div>
              <h4 class="font-semibold text-white mb-2">Accommodation Details</h4>
              <p class="text-snow-400">
                Accommodation bookings are currently being finalised. This page will be updated with
                specific hotel names, addresses, and contact information once confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Password Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showPasswordModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="showPasswordModal"
              class="glass-dark rounded-3xl p-8 max-w-md w-full border border-white/10"
            >
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-alpine-500/20 flex items-center justify-center">
                    <Icon name="heroicons:lock-closed" class="w-5 h-5 text-alpine-400" />
                  </div>
                  <h3 class="text-xl font-semibold text-white">Enter Password</h3>
                </div>
                <button
                  @click="closeModal"
                  class="p-2 rounded-lg hover:bg-white/10 transition-colors text-snow-500 hover:text-white"
                >
                  <Icon name="heroicons:x-mark" class="w-5 h-5" />
                </button>
              </div>

              <!-- Description -->
              <p class="text-snow-400 mb-6">
                Enter the password to reveal the booking ID for Day {{ currentUnlockDay }}.
              </p>

              <!-- Password Input -->
              <div class="mb-6">
                <input
                  v-model="passwordInput"
                  type="password"
                  placeholder="Enter password"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-snow-600 focus:outline-none focus:border-alpine-400 focus:ring-2 focus:ring-alpine-400/20 transition-all"
                  @keyup.enter="verifyPassword"
                  @keyup.escape="closeModal"
                  ref="passwordInputRef"
                />
                <p v-if="passwordError" class="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
                  {{ passwordError }}
                </p>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  @click="closeModal"
                  class="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-snow-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="verifyPassword"
                  class="flex-1 px-4 py-3 rounded-xl bg-alpine-500 hover:bg-alpine-400 text-white font-medium transition-colors"
                >
                  Unlock
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { accommodations, townCoordinates } from '~/data/route'

useHead({
  title: 'Accommodation',
})

// Password for unlocking booking IDs (you can change this)
const UNLOCK_PASSWORD = 'alpine2026'

// State
const showPasswordModal = ref(false)
const currentUnlockDay = ref<number | null>(null)
const passwordInput = ref('')
const passwordError = ref('')
const unlockedBookings = ref(new Set<number>())
const passwordInputRef = ref<HTMLInputElement | null>(null)

// Request to unlock a booking ID
const requestUnlock = (day: number) => {
  if (unlockedBookings.value.has(day)) {
    // Already unlocked, lock it again
    unlockedBookings.value.delete(day)
    return
  }

  // Show password modal
  currentUnlockDay.value = day
  showPasswordModal.value = true
  passwordInput.value = ''
  passwordError.value = ''

  // Focus input after modal is shown
  nextTick(() => {
    passwordInputRef.value?.focus()
  })
}

// Verify password and unlock
const verifyPassword = () => {
  if (passwordInput.value === UNLOCK_PASSWORD) {
    // Correct password - unlock the booking
    if (currentUnlockDay.value !== null) {
      unlockedBookings.value.add(currentUnlockDay.value)
    }
    closeModal()
  } else {
    // Wrong password
    passwordError.value = 'Incorrect password. Please try again.'
    passwordInput.value = ''
  }
}

// Close modal
const closeModal = () => {
  showPasswordModal.value = false
  currentUnlockDay.value = null
  passwordInput.value = ''
  passwordError.value = ''
}
</script>
