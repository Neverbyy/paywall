<template>
  <div class="skeleton" aria-hidden="true" />
</template>

<style scoped>
.skeleton {
  height: 84px;
  border-radius: var(--radius-card);
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    var(--color-primary-subtle) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
}
</style>
