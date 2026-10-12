<script setup lang="ts">
withDefaults(defineProps<{
  name: 'check' | 'star' | 'shield' | 'plane' | 'alert' | 'spinner'
  size?: number
}>(), { size: 24 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-if="name === 'check'"
      d="M5 12.5l4.5 4.5L19 7.5"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else-if="name === 'star'"
      d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      v-else-if="name === 'shield'"
      d="M12 3l7.5 3v5.5c0 4.6-3.1 8-7.5 9.5-4.4-1.5-7.5-4.9-7.5-9.5V6z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      v-else-if="name === 'plane'"
      d="M21 3L3 10.5l7 2.8 2.7 7.2z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <template v-else-if="name === 'alert'">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2" />
      <path d="M12 7.5v5.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="12" cy="16.5" r="1.3" fill="currentColor" />
    </template>
    <template v-else-if="name === 'spinner'">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.35" stroke-width="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </template>
  </svg>
</template>
