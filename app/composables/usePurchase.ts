import type { OfferId, PurchaseResponse, RestoreResponse } from '#shared/types/paywall'

export type PurchaseStatus = 'idle' | 'loading' | 'error' | 'celebrating' | 'success'

export const usePurchase = () => {
  const status = ref<PurchaseStatus>('idle')
  const purchase = ref<PurchaseResponse | null>(null)
  const restoring = ref(false)

  const buy = async (offerId: OfferId) => {
    if (status.value === 'loading') return
    status.value = 'loading'
    try {
      purchase.value = await $fetch<PurchaseResponse>('/api/purchase', {
        method: 'POST',
        body: { offerId },
      })
      status.value = 'celebrating'
    }
    catch {
      status.value = 'error'
    }
  }

  const restore = async (): Promise<boolean> => {
    if (restoring.value || status.value === 'loading') return false
    restoring.value = true
    try {
      const response = await $fetch<RestoreResponse>('/api/restore', { method: 'POST' })
      if (!response.purchase) return false
      purchase.value = response.purchase
      status.value = 'success'
      return true
    }
    finally {
      restoring.value = false
    }
  }

  const completeCelebration = () => {
    if (status.value === 'celebrating') status.value = 'success'
  }

  const clearError = () => {
    if (status.value === 'error') status.value = 'idle'
  }

  const reset = () => {
    status.value = 'idle'
    purchase.value = null
  }

  return { status, purchase, restoring, buy, restore, completeCelebration, clearError, reset }
}
