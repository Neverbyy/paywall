<script lang="ts">
export interface Benefit {
  icon: 'star' | 'shield' | 'plane'
  color: 'fun-orange' | 'success' | 'primary'
  text: string
  short: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  items: Benefit[]
  variant?: 'tiles' | 'list'
}>(), { variant: 'list' })
</script>

<template>
  <ul class="benefits" :class="`benefits--${variant}`">
    <li v-for="item in items" :key="item.text" class="benefits__item">
      <span class="benefits__icon" :style="{ background: `var(--color-${item.color})` }">
        <PaywallIcon :name="item.icon" :size="variant === 'list' ? 18 : 16" />
      </span>
      {{ variant === 'tiles' ? item.short : item.text }}
    </li>
  </ul>
</template>

<style scoped>
.benefits {
  display: flex;
}

.benefits__icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  color: var(--color-on-primary);
}

.benefits--tiles {
  gap: 8px;
}

.benefits--tiles .benefits__item {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 10px 6px;
  border-radius: 16px;
  background: var(--color-bg);
  box-shadow: 0 3px 0 var(--color-border);
  font-size: 13px;
  line-height: 16px;
  font-weight: 800;
  text-align: center;
}

.benefits--tiles .benefits__icon {
  width: 28px;
  height: 28px;
}

@media (max-width: 374px) {
  .benefits--tiles .benefits__item {
    padding: 10px 4px;
    font-size: 12px;
  }
}

.benefits--list {
  flex-direction: column;
  gap: 10px;
}

.benefits--list .benefits__item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
}

.benefits--list .benefits__icon {
  width: 32px;
  height: 32px;
}
</style>
