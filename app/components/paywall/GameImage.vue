<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt: string
  ageBadge?: string
  priority?: boolean
}>(), { ageBadge: undefined, priority: false })
</script>

<template>
  <figure class="game-image">
    <img
      class="game-image__img"
      :src="src"
      :alt="alt"
      width="348"
      height="348"
      decoding="async"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
    >
    <span v-if="ageBadge" class="game-image__badge" :aria-label="`Возраст ${ageBadge}`">{{ ageBadge }}</span>
  </figure>
</template>

<style scoped>
.game-image {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--color-primary-subtle);
}

.game-image__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-image__badge {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: var(--color-bg);
  color: var(--color-primary);
  font-size: 20px;
  line-height: 24px;
  font-weight: 900;
}
</style>
