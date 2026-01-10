<template>
  <footer class="relative bg-slate-950 border-t border-white/5">
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pointer-events-none" />

    <div class="relative container-wide py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-summit rounded-xl flex items-center justify-center">
              <Icon name="mdi:mountain" class="w-6 h-6 text-white" />
            </div>
            <div>
              <span class="font-display text-2xl text-white tracking-wide">RAID</span>
              <span class="font-display text-2xl text-summit-400 tracking-wide">ALPINE</span>
            </div>
          </div>
          <p class="text-snow-500 max-w-md leading-relaxed">
            A 770km cycling adventure through the French Alps, from the shores of Lake Geneva
            to the Mediterranean coast in Nice. Conquer legendary cols and experience the
            ultimate alpine challenge.
          </p>

          <!-- Stats -->
          <div class="flex gap-8 mt-6">
            <div>
              <div class="text-2xl font-display text-white">770km</div>
              <div class="text-xs text-snow-600 uppercase tracking-wider">Distance</div>
            </div>
            <div>
              <div class="text-2xl font-display text-white">18,000m</div>
              <div class="text-xs text-snow-600 uppercase tracking-wider">Elevation</div>
            </div>
            <div>
              <div class="text-2xl font-display text-white">6 Days</div>
              <div class="text-xs text-snow-600 uppercase tracking-wider">Duration</div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/route" class="text-snow-500 hover:text-summit-400 transition-colors">
                The Route
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cols" class="text-snow-500 hover:text-summit-400 transition-colors">
                Famous Cols
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/logistics" class="text-snow-500 hover:text-summit-400 transition-colors">
                Logistics
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/accommodation" class="text-snow-500 hover:text-summit-400 transition-colors">
                Accommodation
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sitemap" class="text-snow-500 hover:text-summit-400 transition-colors">
                Sitemap
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="font-semibold text-white mb-4">Resources</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="https://inforoute.ha-py.fr/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-snow-500 hover:text-summit-400 transition-colors flex items-center gap-2"
              >
                Road Conditions
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.strava.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-snow-500 hover:text-summit-400 transition-colors flex items-center gap-2"
              >
                Strava Routes
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.meteofrance.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-snow-500 hover:text-summit-400 transition-colors flex items-center gap-2"
              >
                Weather
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-snow-600 text-sm">
          Lake Geneva to Nice
        </p>
        <p class="text-snow-600 text-sm">
          Built with Vue.js & Nuxt
        </p>
      </div>
    </div>
  </footer>
</template>
