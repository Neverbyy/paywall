<script lang="ts">
export interface Benefit {
  icon: 'star' | 'shield' | 'plane'
  color: 'fun-orange' | 'success' | 'primary'
  text: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  items: Benefit[]
  size?: 'md' | 'lg'
}>(), { size: 'md' })
</script>

<template>
  <ul class="benefits" :class="`benefits--${size}`">
    <li v-for="item in items" :key="item.text" class="benefits__item">
      <span class="benefits__icon" :style="{ background: `var(--color-${item.color})` }">
        <PaywallIcon :name="item.icon" :size="size === 'lg' ? 18 : 16" />
      </span>
      {{ item.text }}
    </li>
  </ul>
</template>

<style scoped>
.benefits {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.benefits__item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
}

.benefits__icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  color: var(--color-on-primary);
}

.benefits--lg {
  gap: 10px;
}

.benefits--lg .benefits__icon {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
</style>
