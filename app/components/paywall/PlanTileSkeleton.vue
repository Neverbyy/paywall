<template>
  <div class="skeleton" aria-hidden="true" />
</template>

<style scoped>
.skeleton {
  flex: 1 1 0;
  height: 112px;
  border-radius: 20px;
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

@media (min-width: 1024px) {
  .skeleton {
    height: 140px;
    border-radius: 24px;
  }
}
</style>
