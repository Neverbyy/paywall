<script setup lang="ts">
import type { Offer } from '#shared/types/paywall'

defineProps<{
  offer: Offer
  selected: boolean
  disabled?: boolean
}>()

defineEmits<{ select: [] }>()
</script>

<template>
  <label class="tile" :class="{ 'tile--selected': selected, 'tile--disabled': disabled }">
    <input
      class="visually-hidden"
      type="radio"
      name="plan-desktop"
      :value="offer.id"
      :checked="selected"
      :disabled="disabled"
      @change="$emit('select')"
    >
    <span class="tile__top">
      <span class="tile__radio">
        <PaywallIcon v-if="selected" name="check" :size="14" />
      </span>
      <span v-if="offer.badge" class="tile__badge">{{ offer.badge }}</span>
    </span>
    <span class="tile__info">
      <span class="tile__title">{{ offer.title }}</span>
      <span class="tile__price">{{ formatPrice(offer.price) }}</span>
      <span class="tile__period">{{ offer.periodLabel }}</span>
    </span>
    <span class="tile__subtitle">{{ offer.subtitle }}</span>
  </label>
</template>

<style scoped>
.tile {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  padding: 20px;
  border: 2px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-bg);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.tile--selected {
  border: 3px solid var(--color-primary);
  background: var(--color-primary-subtle);
}

.tile--disabled {
  cursor: default;
}

.tile:not(.tile--selected):not(.tile--disabled):hover {
  border-color: color-mix(in srgb, var(--color-primary) 40%, var(--color-border));
}

.tile:has(input:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.tile__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tile__radio {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: var(--color-bg);
  box-shadow: inset 0 0 0 2px var(--color-border);
  color: var(--color-on-primary);
}

.tile--selected .tile__radio {
  background: var(--color-primary);
  box-shadow: none;
}

.tile__badge {
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
}

.tile__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tile__title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
}

.tile__price {
  font-size: 30px;
  line-height: 36px;
  font-weight: 800;
  white-space: nowrap;
}

.tile__period,
.tile__subtitle {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--color-text-secondary);
}
</style>
