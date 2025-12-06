<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: delay } }"
    class="stat-card group"
  >
    <div class="flex items-center justify-center mb-3">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        :class="iconBgClass"
      >
        <Icon :name="icon" class="w-6 h-6" :class="iconClass" />
      </div>
    </div>
    <div class="stat-value" :class="valueClass">
      {{ formattedValue }}
    </div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number | string
  label: string
  icon: string
  suffix?: string
  delay?: number
  variant?: 'default' | 'summit' | 'alpine' | 'glacier'
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  delay: 0,
  variant: 'default',
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString() + props.suffix
  }
  return props.value + props.suffix
})

const iconBgClass = computed(() => {
  const variants = {
    default: 'bg-white/5 group-hover:bg-white/10',
    summit: 'bg-summit-500/20 group-hover:bg-summit-500/30',
    alpine: 'bg-alpine-500/20 group-hover:bg-alpine-500/30',
    glacier: 'bg-glacier-500/20 group-hover:bg-glacier-500/30',
  }
  return variants[props.variant]
})

const iconClass = computed(() => {
  const variants = {
    default: 'text-snow-400',
    summit: 'text-summit-400',
    alpine: 'text-alpine-400',
    glacier: 'text-glacier-400',
  }
  return variants[props.variant]
})

const valueClass = computed(() => {
  const variants = {
    default: 'text-white',
    summit: 'text-gradient',
    alpine: 'text-gradient-alpine',
    glacier: 'text-glacier-300',
  }
  return variants[props.variant]
})
</script>
