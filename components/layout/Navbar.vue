<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    ]"
  >
    <nav class="container-wide">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-summit rounded-xl flex items-center justify-center
                        shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Icon name="mdi:mountain" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="hidden sm:block">
            <span class="font-display text-2xl text-white tracking-wide">RAID</span>
            <span class="font-display text-2xl text-summit-400 tracking-wide">ALPINE</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link font-medium"
            :class="{ 'nav-link-active': isActive(link.to) }"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center gap-4">
          <a
            href="https://inforoute.ha-py.fr/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost text-sm"
          >
            <Icon name="heroicons:signal" class="w-4 h-4" />
            Road Status
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-snow-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <Icon
            :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
            class="w-6 h-6"
          />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/5"
      >
        <div class="container-wide py-6 space-y-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block py-2 text-lg font-medium text-snow-300 hover:text-white transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            href="https://inforoute.ha-py.fr/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 py-2 text-lg font-medium text-summit-400 hover:text-summit-300"
          >
            <Icon name="heroicons:signal" class="w-5 h-5" />
            Road Status
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { y } = useWindowScroll()

const scrolled = computed(() => y.value > 50)
const mobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/route', label: 'The Route' },
  { to: '/cols', label: 'The Cols' },
  { to: '/logistics', label: 'Logistics' },
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
