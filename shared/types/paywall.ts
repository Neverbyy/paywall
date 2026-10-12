export type OfferId = 'pro_yearly' | 'pro_monthly'

export interface Offer {
  id: OfferId
  title: string
  subtitle: string
  price: number
  currency: 'RUB'
  period: 'year' | 'month'
  periodLabel: string
  badge: string | null
  recommended: boolean
}

export interface OffersResponse {
  offers: Offer[]
}

export interface PurchaseRequest {
  offerId: OfferId
}

export interface PurchaseResponse {
  purchaseId: string
  offerId: OfferId
  createdAt: string
}

export interface RestoreResponse {
  purchase: PurchaseResponse | null
}
