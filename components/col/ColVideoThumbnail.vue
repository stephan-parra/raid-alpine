<template>
  <div class="relative group cursor-pointer" @click="openVideo">
    <!-- Video thumbnail -->
    <div
      v-if="video"
      class="relative aspect-video rounded-xl overflow-hidden bg-slate-800"
    >
      <img
        :src="`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`"
        :alt="video.title || 'Col video'"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <!-- Play button overlay -->
      <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Icon name="heroicons:play-solid" class="w-7 h-7 text-slate-900 ml-1" />
        </div>
      </div>
      <!-- Source badge -->
      <div class="absolute bottom-2 left-2">
        <span
          v-if="video.source === 'col-collective'"
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 text-xs font-medium text-white"
        >
          <Icon name="mdi:youtube" class="w-3.5 h-3.5 text-red-500" />
          Col Collective
        </span>
        <span
          v-else-if="video.source === 'tour-de-france'"
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 text-xs font-medium text-yellow-400"
        >
          <Icon name="mdi:trophy" class="w-3.5 h-3.5" />
          Tour de France
        </span>
      </div>
    </div>

    <!-- Placeholder when no video -->
    <div
      v-else
      class="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5"
    >
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
          <Icon name="mdi:mountain" class="w-6 h-6 text-summit-400" />
        </div>
        <span class="text-sm font-medium text-white">{{ colName }}</span>
        <span class="text-xs text-snow-500 mt-1">{{ elevation }}m</span>
      </div>
      <!-- Decorative gradient -->
      <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-summit-600/20 to-transparent" />
    </div>
  </div>

  <!-- Video Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        @click.self="closeVideo"
      >
        <div class="relative w-full max-w-4xl">
          <!-- Close button -->
          <button
            @click="closeVideo"
            class="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-8 h-8" />
          </button>
          <!-- YouTube embed -->
          <div class="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              v-if="video"
              :src="`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ColVideo } from '~/data/route'

const props = defineProps<{
  video?: ColVideo
  colName: string
  elevation: number
}>()

const showModal = ref(false)

function openVideo() {
  if (props.video) {
    showModal.value = true
    document.body.style.overflow = 'hidden'
  }
}

function closeVideo() {
  showModal.value = false
  document.body.style.overflow = ''
}

// Close on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showModal.value) {
      closeVideo()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
