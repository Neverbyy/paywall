<script setup lang="ts">
defineProps<{
  title?: string
  text: string
  actionLabel?: string
}>()

defineEmits<{ action: [] }>()
</script>

<template>
  <div class="error" :class="{ 'error--compact': !title }" role="alert">
    <PaywallIcon class="error__icon" name="alert" :size="20" />
    <div class="error__message">
      <p v-if="title" class="error__title">{{ title }}</p>
      <p class="error__text">{{ text }}</p>
      <button v-if="actionLabel" class="error__action" type="button" @click="$emit('action')">
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-danger-border);
  border-radius: 16px;
  background: var(--color-danger-subtle);
  color: var(--color-danger-text);
}

.error--compact {
  align-items: center;
}

.error__icon {
  flex-shrink: 0;
  color: var(--color-danger);
}

.error__message {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
}

.error__title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.error__text {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.error--compact .error__text {
  font-weight: 700;
}

.error__action {
  min-height: 44px;
  margin: -6px 0 -12px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
