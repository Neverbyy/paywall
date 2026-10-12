<script setup lang="ts">
import type { Offer, PurchaseResponse } from '#shared/types/paywall'

const props = defineProps<{
  offer: Offer
  purchase: PurchaseResponse
}>()

defineEmits<{ done: [] }>()

const periodText = computed(() => (props.offer.period === 'year' ? 'на год' : 'на месяц'))
</script>

<template>
  <div class="success__content">
    <PaywallGameImage class="success__image" src="/game2.png" alt="Лисёнок и динозаврик радуются" priority />
    <header class="success__hero">
      <h1 class="success__title">Ура! Всё открыто!</h1>
      <p class="success__text">Pro {{ periodText }} активен — все игры и задания уже ждут вашего ребёнка.</p>
    </header>
    <dl class="success__details">
      <div class="success__row">
        <dt>Тариф</dt>
        <dd>Pro · {{ offer.title }}</dd>
      </div>
      <div class="success__row">
        <dt>Сумма</dt>
        <dd>{{ formatPrice(offer.price) }}</dd>
      </div>
      <div class="success__row">
        <dt>Дата</dt>
        <dd>{{ formatDate(purchase.createdAt) }}</dd>
      </div>
    </dl>
  </div>
  <footer class="success__footer">
    <PaywallCtaButton label="Играть!" @click="$emit('done')" />
    <p class="success__note">Это тестовая покупка — деньги не списаны.</p>
  </footer>
</template>

<style scoped>
.success__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
}

.success__image {
  height: 230px;
  border-radius: 24px;
}

.success__hero {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.success__title {
  font-size: 26px;
  line-height: 32px;
  font-weight: 800;
}

.success__text {
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text-secondary);
}

.success__details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius-card);
  background: var(--color-bg);
}

.success__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 15px;
  line-height: 20px;
}

.success__row dt {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.success__row dd {
  font-weight: 800;
  text-align: right;
}

.success__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.success__note {
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--color-text-secondary);
}

@media (min-width: 1024px) {
  .success__content {
    gap: 20px;
  }

  .success__image {
    height: 230px;
  }

  .success__title {
    font-size: 28px;
    line-height: 34px;
  }

  .success__details {
    background: var(--color-surface);
  }
}
</style>
