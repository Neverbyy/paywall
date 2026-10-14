<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  text: string
  size?: 'md' | 'lg'
}>(), { size: 'md' })
</script>

<template>
  <header class="hero" :class="`hero--${size}`">
    <h1 class="hero__title">{{ title }}</h1>
    <p class="hero__text">{{ text }}</p>
  </header>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hero__title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.hero__text {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.hero--lg {
  gap: 8px;
}

.hero--lg .hero__title {
  font-size: 32px;
  line-height: 40px;
}

.hero--lg .hero__text {
  font-size: 17px;
  line-height: 24px;
  font-weight: 400;
}
</style>
