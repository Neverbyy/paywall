<script setup lang="ts">
defineProps<{
  label: string
  loading?: boolean
  disabled?: boolean
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="cta"
    :class="{ 'cta--loading': loading }"
    type="button"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="$emit('click')"
  >
    <PaywallIcon v-if="loading" class="cta__spinner" name="spinner" :size="20" />
    <span>{{ label }}</span>
  </button>
</template>

<style scoped>
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 56px;
  padding: 0 24px;
  border-radius: 28px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
  box-shadow: 0 4px 0 var(--color-primary-pressed);
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
}

.cta:not(:disabled):active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 var(--color-primary-pressed);
}

.cta:disabled:not(.cta--loading) {
  background: var(--color-border);
  color: var(--color-text-secondary);
  box-shadow: 0 4px 0 color-mix(in srgb, var(--color-border) 70%, var(--color-text-secondary));
}

.cta__spinner {
  flex-shrink: 0;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
