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
  <label class="plan" :class="{ 'plan--selected': selected, 'plan--disabled': disabled }">
    <input
      class="visually-hidden"
      type="radio"
      name="plan"
      :value="offer.id"
      :checked="selected"
      :disabled="disabled"
      @change="$emit('select')"
    >
    <span class="plan__radio">
      <PaywallIcon v-if="selected" name="check" :size="14" />
    </span>
    <span class="plan__info">
      <span class="plan__title-row">
        <span class="plan__title">{{ offer.title }}</span>
        <span v-if="offer.badge" class="plan__badge">{{ offer.badge }}</span>
      </span>
      <span class="plan__subtitle">{{ offer.subtitle }}</span>
    </span>
    <span class="plan__price">
      <span class="plan__amount">{{ formatPrice(offer.price) }}</span>
      <span class="plan__period">{{ offer.periodLabel }}</span>
    </span>
  </label>
</template>

<style scoped>
.plan {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-bg);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.plan--selected {
  border: 3px solid var(--color-primary);
  background: var(--color-primary-subtle);
}

.plan--disabled {
  cursor: default;
}

.plan:has(input:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.plan__radio {
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

.plan--selected .plan__radio {
  background: var(--color-primary);
  box-shadow: none;
}

.plan__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.plan__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.plan__title,
.plan__amount {
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
}

.plan__badge {
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
}

.plan__subtitle {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.plan__price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
  white-space: nowrap;
}

.plan__period {
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  color: var(--color-text-secondary);
}
</style>
