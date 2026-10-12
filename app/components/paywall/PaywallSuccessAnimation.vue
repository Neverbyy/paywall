<script setup lang="ts">
const emit = defineEmits<{ done: [] }>()

const DURATION_MS = 1600
const REDUCED_MOTION_MS = 800

let timer: ReturnType<typeof setTimeout> | undefined
onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setTimeout(() => emit('done'), reduced ? REDUCED_MOTION_MS : DURATION_MS)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="celebrate" role="status" aria-live="polite">
    <svg class="celebrate__icon" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <circle class="celebrate__bg" cx="48" cy="48" r="48" />
      <circle class="celebrate__ring" cx="48" cy="48" r="44" pathLength="1" />
      <path class="celebrate__check" d="M30 49l12 12 24-26" pathLength="1" />
    </svg>
    <p class="celebrate__text">Оплата прошла!</p>
  </div>
</template>

<style scoped>
.celebrate {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.celebrate__icon {
  overflow: visible;
  animation: pulse 0.3s ease-in-out 0.9s both;
}

.celebrate__bg {
  fill: var(--color-success-subtle);
  transform-origin: center;
  animation: pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.celebrate__ring,
.celebrate__check {
  fill: none;
  stroke: var(--color-success);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.celebrate__ring {
  stroke-width: 4;
  transform: rotate(-90deg);
  transform-origin: center;
  animation: draw 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.15s forwards;
}

.celebrate__check {
  stroke-width: 6;
  animation: draw 0.35s cubic-bezier(0.65, 0, 0.35, 1) 0.55s forwards;
}

.celebrate__text {
  font-size: 20px;
  line-height: 26px;
  font-weight: 800;
  animation: rise 0.3s ease-out 0.7s both;
}

@keyframes pop {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

@keyframes pulse {
  50% { transform: scale(1.06); }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

</style>
