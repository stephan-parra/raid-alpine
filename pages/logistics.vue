<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-alpine" />
      <div class="absolute inset-0 bg-grid opacity-20" />

      <div class="relative container-wide">
        <div class="max-w-3xl">
          <span
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            class="inline-block text-sm font-semibold uppercase tracking-wider text-summit-400 mb-4"
          >
            Planning
          </span>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-5xl md:text-6xl lg:text-7xl font-display text-white"
          >
            Logistics Guide
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="text-xl text-snow-400 mt-6 max-w-2xl"
          >
            Everything you need to plan your RAID Alpine adventure.
            From getting there to what to pack, we've got you covered.
          </p>
        </div>
      </div>
    </section>

    <!-- Getting There -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Transport"
          title="Getting There"
          description="Four options to reach the start at Thonon-les-Bains."
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Option 1: Drive -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            class="glass-dark rounded-3xl p-8"
          >
            <div class="w-14 h-14 rounded-2xl bg-alpine-500/20 flex items-center justify-center mb-6">
              <Icon name="heroicons:truck" class="w-7 h-7 text-alpine-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 1: Drive</h3>
            <div class="space-y-4 text-snow-400">
              <p>
                <strong class="text-white">Van hire UK (one-way)</strong><br>
                Hire small van from Enterprise: Leamington Spa → Dover (~£100)
              </p>
              <p>
                <strong class="text-white">Drive to Calais → Thonon</strong><br>
                780-850km drive (7.5-8 hours). One-way drop-off available from major rental companies.
              </p>
              <div class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-2 text-green-400">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>Maximum flexibility with bikes</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Multiple legs to organize</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Option 2: Train -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="glass-dark rounded-3xl p-8"
          >
            <div class="w-14 h-14 rounded-2xl bg-glacier-500/20 flex items-center justify-center mb-6">
              <Icon name="mdi:train" class="w-7 h-7 text-glacier-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 2: Train</h3>
            <div class="space-y-4 text-snow-400">
              <p>
                <strong class="text-white">Leamington Spa → Dover</strong><br>
                £13.50-£45 (book in advance). Journey: 3h 18m - 4h 11m via London.
              </p>
              <p>
                <strong class="text-white">Ferry + Train to Thonon</strong><br>
                TGV from Calais via Paris. Duration: 7h 24m (fastest) to 11h.
              </p>
              <div class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-2 text-green-400">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>No driving, relatively cheap</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Complex logistics with bikes</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Option 3: Fly -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="glass-dark rounded-3xl p-8 ring-2 ring-summit-500/30"
          >
            <div class="absolute -top-3 right-6">
              <span class="px-3 py-1 bg-summit-500 text-white text-xs font-semibold rounded-full">
                Recommended
              </span>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-summit-500/20 flex items-center justify-center mb-6">
              <Icon name="heroicons:paper-airplane" class="w-7 h-7 text-summit-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 3: Fly</h3>
            <div class="space-y-4 text-snow-400">
              <p>
                <strong class="text-white">Fly to Geneva</strong><br>
                BA includes bikes in checked luggage - no extra charge!
              </p>
              <p>
                <strong class="text-white">Transfer to Thonon</strong><br>
                ~1 hour transfer. Store bike boxes at airport or nearby.
              </p>
              <p>
                <strong class="text-white">Return from Nice</strong><br>
                Train/transfer to Nice Airport, fly home.
              </p>
              <div class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-2 text-green-400">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>Fastest, least complex</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Bike box logistics</span>
                </div>
              </div>
            </div>

            <a
              href="https://www.britishairways.com/en-gb/information/baggage-essentials/sports-equipment"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 mt-6 text-summit-400 hover:text-summit-300 transition-colors text-sm"
            >
              BA Sports Equipment Info
              <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
            </a>
          </div>

          <!-- Option 4: Fly & Hire Bikes -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="glass-dark rounded-3xl p-8"
          >
            <div class="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
              <Icon name="mdi:bicycle" class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 4: Fly & Hire Bikes</h3>
            <div class="space-y-4 text-snow-400">
              <p>
                Faster option depending on bike rental availability and flight schedules.
              </p>
              <p>
                <strong class="text-white">Outbound</strong><br>
                Fly to Nice, hire bikes locally, train to Thonon-les-Bains to begin the ride.
              </p>
              <p>
                <strong class="text-white">Return</strong><br>
                Drop bikes back in Nice after finishing, fly home.
              </p>
              <div class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-2 text-green-400">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>No bike box logistics</span>
                </div>
                <div class="flex items-center gap-2 text-green-400 mt-2">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>Lighter travel</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Need to find suitable bike hire</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Bike hire expensive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Packing List -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Preparation"
          title="What to Pack"
          description="Essential gear for conquering the Alps."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Cycling Essentials -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-summit-500/20 flex items-center justify-center">
                <Icon name="mdi:bike" class="w-5 h-5 text-summit-400" />
              </div>
              <h3 class="text-xl font-semibold text-white">Cycling Essentials</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="item in packingCycling" :key="item" class="flex items-start gap-3 text-snow-400">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Clothing -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-alpine-500/20 flex items-center justify-center">
                <Icon name="mdi:tshirt-crew" class="w-5 h-5 text-alpine-400" />
              </div>
              <h3 class="text-xl font-semibold text-white">Clothing</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="item in packingClothing" :key="item" class="flex items-start gap-3 text-snow-400">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Off-Bike -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-glacier-500/20 flex items-center justify-center">
                <Icon name="heroicons:briefcase" class="w-5 h-5 text-glacier-400" />
              </div>
              <h3 class="text-xl font-semibold text-white">Off-Bike</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="item in packingOffBike" :key="item" class="flex items-start gap-3 text-snow-400">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Important note -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="mt-8 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30"
        >
          <div class="flex items-start gap-4">
            <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 class="font-semibold text-white mb-2">Altitude Warning</h4>
              <p class="text-snow-400">
                Temperatures at 2,800m can be below 5°C even in summer. Pack warm layers for descents
                and be prepared for rapidly changing weather conditions in the mountains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Planning Notes -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Tips"
          title="Planning Notes"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Accommodation -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0 }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:home" class="w-8 h-8 text-summit-400 mb-4" />
            <h3 class="text-xl font-semibold text-white mb-4">Accommodation</h3>
            <ul class="space-y-2 text-snow-400">
              <li>• Book hotels along route in advance</li>
              <li>• Confirm bike storage availability</li>
              <li>• Check dinner options (mountain towns may have limited restaurants)</li>
              <li>• Consider half-board options where available</li>
            </ul>
          </div>

          <!-- Food -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 100 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:cake" class="w-8 h-8 text-alpine-400 mb-4" />
            <h3 class="text-xl font-semibold text-white mb-4">Food & Nutrition</h3>
            <ul class="space-y-2 text-snow-400">
              <li>• Breakfast at hotels when possible</li>
              <li>• Lunch: cafes on route or carry supplies</li>
              <li>• Carry energy bars, gels for long climbs</li>
              <li>• Stay hydrated - 2-3 bottles minimum per day</li>
            </ul>
          </div>

          <!-- Weather -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:cloud" class="w-8 h-8 text-glacier-400 mb-4" />
            <h3 class="text-xl font-semibold text-white mb-4">Weather</h3>
            <ul class="space-y-2 text-snow-400">
              <li>• High cols can be cold even in summer</li>
              <li>• Check col opening dates (some closed until June)</li>
              <li>• Weather changes quickly at altitude</li>
              <li>• Always carry a rain jacket</li>
            </ul>
            <a
              href="https://www.meteofrance.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 mt-4 text-glacier-400 hover:text-glacier-300 transition-colors text-sm"
            >
              Météo France
              <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
            </a>
          </div>

          <!-- Training -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 300 } }"
            class="glass-dark rounded-2xl p-6"
          >
            <Icon name="heroicons:chart-bar" class="w-8 h-8 text-yellow-400 mb-4" />
            <h3 class="text-xl font-semibold text-white mb-4">Training</h3>
            <ul class="space-y-2 text-snow-400">
              <li>• 6 consecutive big days requires serious fitness</li>
              <li>• Practice long climbs (2+ hours)</li>
              <li>• Train nutrition and hydration strategies</li>
              <li>• Get used to riding back-to-back days</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources -->
    <section class="section bg-slate-900/50">
      <div class="container-narrow">
        <UiSectionHeading
          eyebrow="Useful Links"
          title="Resources"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://inforoute.ha-py.fr/"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-dark rounded-xl p-6 hover:bg-white/10 transition-colors group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <Icon name="heroicons:signal" class="w-6 h-6 text-summit-400" />
                <div>
                  <h4 class="font-semibold text-white">Road Conditions</h4>
                  <p class="text-sm text-snow-500">InfoRoute Hautes-Alpes</p>
                </div>
              </div>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5 text-snow-500 group-hover:text-white transition-colors" />
            </div>
          </a>

          <a
            href="https://www.meteofrance.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-dark rounded-xl p-6 hover:bg-white/10 transition-colors group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <Icon name="heroicons:cloud" class="w-6 h-6 text-alpine-400" />
                <div>
                  <h4 class="font-semibold text-white">Weather Forecast</h4>
                  <p class="text-sm text-snow-500">Météo France</p>
                </div>
              </div>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5 text-snow-500 group-hover:text-white transition-colors" />
            </div>
          </a>

          <a
            href="https://www.strava.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-dark rounded-xl p-6 hover:bg-white/10 transition-colors group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <Icon name="mdi:strava" class="w-6 h-6 text-orange-500" />
                <div>
                  <h4 class="font-semibold text-white">Strava</h4>
                  <p class="text-sm text-snow-500">Route segments & leaderboards</p>
                </div>
              </div>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5 text-snow-500 group-hover:text-white transition-colors" />
            </div>
          </a>

          <a
            href="https://www.britishairways.com/en-gb/information/baggage-essentials/sports-equipment"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-dark rounded-xl p-6 hover:bg-white/10 transition-colors group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <Icon name="heroicons:paper-airplane" class="w-6 h-6 text-glacier-400" />
                <div>
                  <h4 class="font-semibold text-white">BA Bike Policy</h4>
                  <p class="text-sm text-snow-500">Sports equipment info</p>
                </div>
              </div>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5 text-snow-500 group-hover:text-white transition-colors" />
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Logistics',
})

const packingCycling = [
  'Road bike + spares/tools',
  'Multi-tool & puncture repair kit',
  'Spare tubes (2-3)',
  'Bike computer/GPS',
  'Lights (front & rear)',
  'Bottle cages & bottles',
]

const packingClothing = [
  '6 days cycling kit (or wash en route)',
  'Layers for cold at altitude',
  'Rain jacket (waterproof)',
  'Arm/leg warmers',
  'Gilet/vest',
  'Sunglasses & sunscreen',
]

const packingOffBike = [
  'Casual clothes for evenings',
  'Toiletries',
  'First aid kit',
  'Phone & charger',
  'Carnet for col stamps',
  'Cash & cards',
]
</script>
