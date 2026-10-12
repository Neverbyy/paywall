import type { Offer, OfferId } from '#shared/types/paywall'

export const offers: Offer[] = [
  {
    id: 'pro_yearly',
    title: 'Год',
    subtitle: 'Всего 166 ₽ в месяц',
    price: 1990,
    currency: 'RUB',
    period: 'year',
    periodLabel: 'в год',
    badge: '−58%',
    recommended: true,
  },
  {
    id: 'pro_monthly',
    title: 'Месяц',
    subtitle: 'Оплата каждый месяц',
    price: 399,
    currency: 'RUB',
    period: 'month',
    periodLabel: 'в месяц',
    badge: null,
    recommended: false,
  },
]

export const findOffer = (id: unknown): Offer | undefined =>
  offers.find(offer => offer.id === (id as OfferId))
