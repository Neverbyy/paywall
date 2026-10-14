<script setup lang="ts">
import type { Offer } from '#shared/types/paywall'

const props = defineProps<{
  offer: Offer
  selected: boolean
  disabled?: boolean
}>()

defineEmits<{ select: [] }>()

const perLabel = computed(() => (props.offer.period === 'year' ? '/год' : '/мес'))
</script>

<template>
  <label class="tile" :class="{ 'tile--selected': selected, 'tile--disabled': disabled }">
    <input
      class="visually-hidden"
      type="radio"
      name="plan"
      :value="offer.id"
      :checked="selected"
      :disabled="disabled"
      @change="$emit('select')"
    >
    <span v-if="offer.badge" class="tile__sticker">{{ offer.badge }}</span>
    <span class="tile__row">
      <span class="tile__radio">
        <PaywallIcon v-if="selected" name="check" :size="13" class="tile__check" />
      </span>
      <span class="tile__title">{{ offer.title }}</span>
    </span>
    <span class="tile__price-block">
      <span class="tile__price-row">
        <span class="tile__price">{{ formatPrice(offer.price) }}</span>
        <span class="tile__per">{{ perLabel }}</span>
      </span>
      <span class="tile__subtitle">{{ offer.subtitle }}</span>
    </span>
  </label>
</template>

<style scoped>
.tile {
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 14px;
  border: 2px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-bg);
  box-shadow: 0 3px 0 var(--color-border);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
}

.tile--selected {
  border: 3px solid var(--color-primary);
  background: var(--color-primary-subtle);
}

.tile--disabled {
  cursor: default;
}

.tile:not(.tile--disabled):active {
  transform: translateY(2px);
}

.tile:has(input:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.tile__sticker {
  position: absolute;
  top: -10px;
  right: 10px;
  padding: 3px 8px;
  border-radius: 10px;
  background: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-bg);
  color: var(--color-on-accent);
  font-size: 12px;
  line-height: 16px;
  font-weight: 900;
  transform: rotate(-6deg);
  transform-origin: top left;
}

.tile__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tile__radio {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-bg);
  box-shadow: inset 0 0 0 2px var(--color-border);
  color: var(--color-on-primary);
}

.tile--selected .tile__radio {
  background: var(--color-primary);
  box-shadow: none;
}

.tile__title {
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
}

.tile__price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tile__price-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  white-space: nowrap;
}

.tile__price {
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
}

.tile__per {
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.tile__subtitle {
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

@media (min-width: 1024px) {
  .tile {
    gap: 12px;
    padding: 20px;
    border-radius: 24px;
  }

  .tile:not(.tile--selected):not(.tile--disabled):hover {
    border-color: color-mix(in srgb, var(--color-primary) 40%, var(--color-border));
  }

  .tile__radio {
    width: 24px;
    height: 24px;
  }

  .tile__check {
    width: 14px;
    height: 14px;
  }

  .tile__title {
    font-size: 18px;
    line-height: 24px;
  }

  .tile__price {
    font-size: 30px;
    line-height: 36px;
  }

  .tile__per {
    font-size: 15px;
    line-height: 20px;
  }

  .tile__subtitle {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
