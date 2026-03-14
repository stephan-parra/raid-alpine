<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="/images/geneva-lake-switzerland-shutterstock.jpeg"
          alt="Lake Geneva, Switzerland"
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

    <!-- Agreed Travel Plan -->
    <section class="section bg-slate-950">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Confirmed"
          title="Agreed Travel Plan"
          description="The final logistics for getting to the start and home from the finish."
        />

        <!-- Timeline -->
        <div class="max-w-4xl mx-auto">
          <!-- Outbound: 11 Jul -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0 }"
            class="glass-dark rounded-3xl p-8 ring-2 ring-green-500/30 mb-8"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Icon name="heroicons:paper-airplane" class="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 class="text-2xl font-display text-white">Outbound &mdash; Friday 11 July</h3>
                <p class="text-snow-500 text-sm">London &rarr; Lyon &rarr; Thonon-les-Bains</p>
              </div>
            </div>

            <div class="space-y-6">
              <!-- Flight -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-summit-500/20 flex items-center justify-center">
                    <Icon name="heroicons:paper-airplane" class="w-4 h-4 text-summit-400" />
                  </div>
                  <div class="w-0.5 flex-1 bg-white/10 mt-2" />
                </div>
                <div class="pb-6">
                  <h4 class="font-semibold text-white">Fly: London Heathrow &rarr; Lyon Saint-Exup&eacute;ry</h4>
                  <div class="mt-2 space-y-1 text-snow-400 text-sm">
                    <p><strong class="text-snow-200">Flight:</strong> British Airways BA0356 &mdash; Airbus A320</p>
                    <p><strong class="text-snow-200">Depart:</strong> 07:15 LHR Terminal 5</p>
                    <p><strong class="text-snow-200">Arrive:</strong> 09:55 LYS Terminal 1</p>
                    <p><strong class="text-snow-200">Duration:</strong> 1h 40m</p>
                    <p><strong class="text-snow-200">Class:</strong> Economy O</p>
                  </div>
                </div>
              </div>

              <!-- Train to Thonon -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-glacier-500/20 flex items-center justify-center">
                    <Icon name="mdi:train" class="w-4 h-4 text-glacier-400" />
                  </div>
                  <div class="w-0.5 flex-1 bg-white/10 mt-2" />
                </div>
                <div class="pb-6">
                  <h4 class="font-semibold text-white">Train: Lyon Part-Dieu &rarr; Thonon-Les-Bains</h4>
                  <div class="mt-2 space-y-1 text-snow-400 text-sm">
                    <p><strong class="text-snow-200">Depart:</strong> 12:38 PM Lyon Part-Dieu</p>
                    <p><strong class="text-snow-200">Arrive:</strong> 3:29 PM Thonon-Les-Bains</p>
                    <p><strong class="text-snow-200">Duration:</strong> 2h 51m (1 connection)</p>
                    <p><strong class="text-snow-200">Price:</strong> from &euro;96.40</p>
                  </div>
                </div>
              </div>

              <!-- Arrive -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Icon name="heroicons:map-pin" class="w-4 h-4 text-green-400" />
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-green-400">Arrive Thonon-Les-Bains &mdash; Start Point</h4>
                  <p class="text-snow-400 text-sm mt-1">Ready for Day 1 of the RAID Alpine</p>
                </div>
              </div>
            </div>
          </div>

          <!-- The Ride -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="glass-dark rounded-3xl p-8 ring-2 ring-summit-500/30 mb-8"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-summit-500/20 flex items-center justify-center">
                <Icon name="mdi:bicycle" class="w-5 h-5 text-summit-400" />
              </div>
              <div>
                <h3 class="text-2xl font-display text-white">The Ride &mdash; 12&ndash;17 July</h3>
                <p class="text-snow-500 text-sm">Thonon-les-Bains &rarr; Nice</p>
              </div>
            </div>
            <p class="text-snow-400">
              6 days cycling through the French Alps. 763 km, 17,360 m of climbing, crossing some of the most iconic cols in cycling.
            </p>
          </div>

          <!-- Return: 18 Jul -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="glass-dark rounded-3xl p-8 ring-2 ring-alpine-500/30"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-alpine-500/20 flex items-center justify-center">
                <Icon name="heroicons:home" class="w-5 h-5 text-alpine-400" />
              </div>
              <div>
                <h3 class="text-2xl font-display text-white">Return &mdash; Friday 18 July</h3>
                <p class="text-snow-500 text-sm">Nice &rarr; Avignon &rarr; Lyon &rarr; London</p>
              </div>
            </div>

            <div class="space-y-6">
              <!-- Train Nice to Avignon -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-glacier-500/20 flex items-center justify-center">
                    <Icon name="mdi:train" class="w-4 h-4 text-glacier-400" />
                  </div>
                  <div class="w-0.5 flex-1 bg-white/10 mt-2" />
                </div>
                <div class="pb-6">
                  <h4 class="font-semibold text-white">Train: Nice &rarr; Avignon Centre</h4>
                  <div class="mt-2 space-y-1 text-snow-400 text-sm">
                    <p><strong class="text-snow-200">Duration:</strong> ~4h 38m (1 connection)</p>
                    <p><strong class="text-snow-200">Price:</strong> from &euro;136.80</p>
                    <p class="text-snow-500 italic">Multiple departures available from 7:25 AM</p>
                  </div>
                </div>
              </div>

              <!-- Train Avignon to Lyon -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-glacier-500/20 flex items-center justify-center">
                    <Icon name="mdi:train" class="w-4 h-4 text-glacier-400" />
                  </div>
                  <div class="w-0.5 flex-1 bg-white/10 mt-2" />
                </div>
                <div class="pb-6">
                  <h4 class="font-semibold text-white">Train: Avignon Centre &rarr; Lyon Part-Dieu</h4>
                  <div class="mt-2 space-y-1 text-snow-400 text-sm">
                    <p><strong class="text-snow-200">Duration:</strong> ~2h 27&ndash;30m (Direct TER)</p>
                    <p><strong class="text-snow-200">Price:</strong> from &euro;171.60</p>
                    <p class="text-snow-500 italic">Multiple departures from 2:10 PM &mdash; need to connect with 21:30 flight</p>
                  </div>
                </div>
              </div>

              <!-- Flight home -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-summit-500/20 flex items-center justify-center">
                    <Icon name="heroicons:paper-airplane" class="w-4 h-4 text-summit-400" />
                  </div>
                  <div class="w-0.5 flex-1 bg-white/10 mt-2" />
                </div>
                <div class="pb-6">
                  <h4 class="font-semibold text-white">Fly: Lyon Saint-Exup&eacute;ry &rarr; London Heathrow</h4>
                  <div class="mt-2 space-y-1 text-snow-400 text-sm">
                    <p><strong class="text-snow-200">Flight:</strong> British Airways BA0363 &mdash; Airbus A319</p>
                    <p><strong class="text-snow-200">Depart:</strong> 21:30 LYS Terminal 1</p>
                    <p><strong class="text-snow-200">Arrive:</strong> 22:10 LHR Terminal 5</p>
                    <p><strong class="text-snow-200">Duration:</strong> 1h 40m</p>
                    <p><strong class="text-snow-200">Class:</strong> Economy O</p>
                  </div>
                </div>
              </div>

              <!-- Home -->
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Icon name="heroicons:home" class="w-4 h-4 text-green-400" />
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-green-400">Home</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Options Considered -->
    <section class="section bg-slate-900/50">
      <div class="container-wide">
        <UiSectionHeading
          eyebrow="Archive"
          title="Other Options Considered"
          description="These alternatives were explored during planning but not selected."
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-60">
          <!-- Option 1: Drive Own Car -->
          <div class="glass-dark rounded-3xl p-8">
            <div class="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
              <Icon name="heroicons:truck" class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 1: Drive Own Car</h3>
            <div class="space-y-4 text-snow-400">
              <p>
                <strong class="text-white">Drive to Dover with bikes onboard</strong><br>
                Load bikes onto/into your own car and drive to Dover.
              </p>
              <p>
                <strong class="text-white">Ferry to Calais or Dunkirk</strong><br>
                Cross the Channel by ferry. Book in advance for best rates.
              </p>
              <p>
                <strong class="text-white">Drive to Thonon-les-Bains</strong><br>
                Approximately 850km drive (9-9.5 hours) from Calais. Complete in one day and park close to the start point.
              </p>
              <div class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-2 text-green-400">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>No rental logistics</span>
                </div>
                <div class="flex items-center gap-2 text-green-400 mt-2">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>Maximum flexibility</span>
                </div>
                <div class="flex items-center gap-2 text-green-400 mt-2">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>Simplest planning</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Long driving day to France</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Option 2: Drive -->
          <div class="glass-dark rounded-3xl p-8">
            <div class="w-14 h-14 rounded-2xl bg-alpine-500/20 flex items-center justify-center mb-6">
              <Icon name="heroicons:truck" class="w-7 h-7 text-alpine-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 2: Hire Drive</h3>
            <div class="space-y-4 text-snow-400">
              <p>
                <strong class="text-white">Van hire UK (one-way)</strong><br>
                Hire small van from Enterprise: Leamington Spa → Dover (~£100)
              </p>
              <p>
                <strong class="text-white">Drive to Calais → Thonon</strong><br>
                Approximately 850km drive (9-9.5 hours). One-way drop-off available from major rental companies.
              </p>
              <div class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-2 text-green-400">
                  <Icon name="heroicons:check" class="w-5 h-5" />
                  <span>Maximum flexibility with bikes</span>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2">
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  <span>Multiple legs to organise</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Option 3: Train -->
          <div class="glass-dark rounded-3xl p-8">
            <div class="w-14 h-14 rounded-2xl bg-glacier-500/20 flex items-center justify-center mb-6">
              <Icon name="mdi:train" class="w-7 h-7 text-glacier-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 3: Train</h3>
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

          <!-- Option 4: Fly (via Geneva) -->
          <div class="glass-dark rounded-3xl p-8">
            <div class="w-14 h-14 rounded-2xl bg-summit-500/20 flex items-center justify-center mb-6">
              <Icon name="heroicons:paper-airplane" class="w-7 h-7 text-summit-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 4: Fly (via Geneva)</h3>
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
          </div>

          <!-- Option 5: Fly & Hire Bikes -->
          <div class="glass-dark rounded-3xl p-8">
            <div class="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
              <Icon name="mdi:bicycle" class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-2xl font-display text-white mb-4">Option 5: Fly & Hire Bikes</h3>
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
