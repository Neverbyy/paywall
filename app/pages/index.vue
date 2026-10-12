<script setup lang="ts">
import type { OfferId, OffersResponse } from '#shared/types/paywall'
import type { Benefit } from '~/components/paywall/PaywallBenefits.vue'

const HERO_IMAGE = { src: '/game1.png', alt: 'Герои игры катаются на аттракционах' }
const HERO_TITLE = 'Откройте все игры!'
const HERO_TEXT = 'Развивающие игры для детей 3–7 лет: счёт, буквы и логика.'
const BENEFITS: Benefit[] = [
  { icon: 'star', color: 'fun-orange', text: '50+ развивающих игр и заданий' },
  { icon: 'shield', color: 'success', text: 'Без рекламы и случайных покупок' },
  { icon: 'plane', color: 'primary', text: 'Играйте даже без интернета' },
]

const { data, status: offersStatus, refresh: reloadOffers } = await useFetch<OffersResponse>('/api/offers')
const offers = computed(() => data.value?.offers ?? [])

const selectedId = ref<OfferId | null>(null)
watch(offers, (list) => {
  if (!list.some(offer => offer.id === selectedId.value)) {
    selectedId.value = (list.find(offer => offer.recommended) ?? list[0])?.id ?? null
  }
}, { immediate: true })
const selectedOffer = computed(() => offers.value.find(offer => offer.id === selectedId.value))

const { status, purchase, restoring, buy, restore, completeCelebration, clearError, reset } = usePurchase()
const isBusy = computed(() => status.value === 'loading')
const purchasedOffer = computed(() => offers.value.find(offer => offer.id === purchase.value?.offerId))

const ctaLabel = computed(() => {
  if (status.value === 'loading') return 'Оформляем подписку…'
  if (status.value === 'error') return 'Повторить оплату'
  const offer = selectedOffer.value
  return offer ? `Оформить за ${formatPrice(offer.price)} ${offer.periodLabel}` : 'Оформить подписку'
})

const selectOffer = (id: OfferId) => {
  selectedId.value = id
  clearError()
}

const onBuy = () => {
  if (selectedId.value) buy(selectedId.value)
}

const toast = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined
const showToast = (message: string) => {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 2500)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

const onRestore = async () => {
  try {
    if (!(await restore())) showToast('Покупки не найдены')
  }
  catch {
    showToast('Не удалось проверить покупки')
  }
}
</script>

<template>
  <main class="screen">
    <div class="screen__card">
      <aside class="screen__value">
        <PaywallGameImage class="screen__value-image" v-bind="HERO_IMAGE" age-badge="4+" />
        <div class="screen__value-body">
          <PaywallHero size="lg" :title="HERO_TITLE" :text="HERO_TEXT" />
          <PaywallBenefits size="lg" :items="BENEFITS" />
        </div>
      </aside>

      <Transition name="phase" mode="out-in">
        <PaywallSuccessAnimation
          v-if="status === 'celebrating'"
          key="celebrate"
          @done="completeCelebration"
        />

        <div v-else-if="status === 'success' && purchase && purchasedOffer" key="success" class="screen__phase">
          <PaywallSuccess :offer="purchasedOffer" :purchase="purchase" @done="reset" />
        </div>

        <div v-else key="paywall" class="screen__phase">
          <div class="screen__content">
            <div class="screen__intro">
              <PaywallGameImage class="screen__intro-image" v-bind="HERO_IMAGE" age-badge="4+" priority />
              <PaywallHero :title="HERO_TITLE" :text="HERO_TEXT" />
              <PaywallBenefits :items="BENEFITS" />
            </div>

            <div class="screen__heading">
              <h2 class="screen__heading-title">Выберите тариф</h2>
              <p class="screen__heading-text">Полный доступ ко всем играм на любом устройстве.</p>
            </div>

            <section aria-label="Тарифы">
              <PaywallErrorBanner
                v-if="offersStatus === 'error'"
                title="Не удалось загрузить тарифы"
                text="Проверьте интернет и попробуйте ещё раз."
                action-label="Повторить"
                @action="reloadOffers()"
              />
              <div v-else-if="offersStatus === 'pending' && !offers.length" class="screen__plans" aria-busy="true">
                <PaywallPlanCardSkeleton />
                <PaywallPlanCardSkeleton />
              </div>
              <template v-else>
                <div
                  class="screen__plans screen__plans--list"
                  :class="{ 'screen__plans--locked': isBusy }"
                  role="radiogroup"
                  aria-label="Выберите тариф"
                >
                  <PaywallPlanCard
                    v-for="offer in offers"
                    :key="offer.id"
                    :offer="offer"
                    :selected="offer.id === selectedId"
                    :disabled="isBusy"
                    @select="selectOffer(offer.id)"
                  />
                </div>
                <div
                  class="screen__plans screen__plans--tiles"
                  :class="{ 'screen__plans--locked': isBusy }"
                  role="radiogroup"
                  aria-label="Выберите тариф"
                >
                  <PaywallPlanTile
                    v-for="offer in offers"
                    :key="offer.id"
                    :offer="offer"
                    :selected="offer.id === selectedId"
                    :disabled="isBusy"
                    @select="selectOffer(offer.id)"
                  />
                </div>
              </template>
            </section>
          </div>

          <footer class="screen__footer">
            <PaywallErrorBanner v-if="status === 'error'" text="Оплата не прошла. Деньги не списаны." />
            <PaywallCtaButton
              :label="ctaLabel"
              :loading="isBusy"
              :disabled="!selectedOffer || restoring"
              @click="onBuy"
            />
            <p class="screen__note">Автопродление. Отменить можно в любой момент.</p>
            <button
              class="screen__restore"
              :class="{ 'screen__restore--muted': isBusy }"
              type="button"
              :disabled="isBusy || restoring"
              @click="onRestore"
            >
              {{ restoring ? 'Проверяем покупки…' : 'Восстановить покупки' }}
            </button>
          </footer>
        </div>
      </Transition>
    </div>

    <Transition name="toast">
      <p v-if="toast" class="screen__toast" role="status">{{ toast }}</p>
    </Transition>
  </main>
</template>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: var(--screen-max-width);
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  padding:
    max(16px, env(safe-area-inset-top))
    max(var(--screen-gutter), env(safe-area-inset-right))
    max(34px, env(safe-area-inset-bottom))
    max(var(--screen-gutter), env(safe-area-inset-left));
}

.screen__card {
  display: contents;
}

.screen__value,
.screen__heading {
  display: none;
}

.screen__intro {
  display: contents;
}

.screen__intro-image {
  height: 190px;
  border-radius: 24px;
}

.screen__phase {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
}

.phase-enter-active,
.phase-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.phase-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.phase-leave-to {
  opacity: 0;
}

.screen__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
}

.screen__plans {
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: opacity 0.2s ease;
}

.screen__plans--locked {
  opacity: 0.5;
  pointer-events: none;
}

.screen__plans--tiles {
  display: none;
}

.screen__footer {
  position: sticky;
  bottom: max(34px, env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: var(--color-sky);
  box-shadow: 0 max(34px, env(safe-area-inset-bottom)) 0 var(--color-sky);
}

.screen__footer::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 100%;
  left: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgb(238 247 255 / 0), var(--color-sky));
  pointer-events: none;
}

.screen__note {
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--color-text-secondary);
}

.screen__restore {
  height: 44px;
  padding: 0 12px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  color: var(--color-primary);
  transition: opacity 0.2s ease;
}

.screen__restore--muted {
  opacity: 0.4;
}

.screen__toast {
  position: fixed;
  left: 50%;
  bottom: calc(max(34px, env(safe-area-inset-bottom)) + 56px);
  z-index: 2;
  max-width: calc(100% - 40px);
  padding: 10px 16px;
  border-radius: 16px;
  background: var(--color-text-primary);
  color: var(--color-on-primary);
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  transform: translateX(-50%);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}

@media (min-width: 1024px) {
  .screen {
    display: grid;
    place-items: center;
    max-width: none;
    padding: 32px;
    background: var(--color-sky);
  }

  .screen__card {
    display: flex;
    width: 960px;
    min-height: 640px;
    border-radius: 32px;
    overflow: hidden;
    background: var(--color-bg);
    box-shadow: 0 24px 64px rgb(27 42 74 / 0.1);
  }

  .screen__value {
    display: flex;
    flex: none;
    flex-direction: column;
    width: 440px;
    background: var(--color-primary-subtle);
  }

  .screen__value-image {
    height: 260px;
  }

  .screen__value-image :deep(.game-image__badge) {
    right: 16px;
    bottom: 16px;
  }

  .screen__value-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px 40px 40px;
  }

  .screen__phase {
    gap: 24px;
    min-width: 0;
    padding: 30px;
  }

  .screen__content {
    gap: 24px;
  }

  .screen__intro,
  .screen__plans--list {
    display: none;
  }

  .screen__heading {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .screen__heading-title {
    margin: 0;
    font-size: 28px;
    line-height: 34px;
    font-weight: 800;
  }

  .screen__heading-text {
    font-size: 16px;
    line-height: 22px;
    color: var(--color-text-secondary);
  }

  .screen__plans--tiles {
    display: flex;
    flex-direction: row;
  }

  .screen__footer {
    position: static;
    background: none;
    box-shadow: none;
  }

  .screen__footer::before {
    display: none;
  }
}
</style>
