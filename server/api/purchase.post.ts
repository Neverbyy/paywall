import type { PurchaseResponse } from '#shared/types/paywall'
import { findOffer } from '../data/offers'
import { DEVICE_COOKIE } from '../middleware/device-id'

export default defineEventHandler(async (event): Promise<PurchaseResponse> => {
  const body = await readBody<{ offerId?: unknown }>(event).catch(() => undefined)
  const offer = findOffer(body?.offerId)
  if (!offer) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown offerId' })
  }

  const deviceId = getCookie(event, DEVICE_COOKIE) ?? event.context.deviceId
  if (!deviceId) {
    throw createError({ statusCode: 400, statusMessage: 'Device id is missing' })
  }

  const { data, error } = await useSupabase()
    .from('test_purchases')
    .insert({
      offer_id: offer.id,
      device_id: deviceId,
      amount: offer.price,
      currency: offer.currency,
    })
    .select('id, offer_id, created_at')
    .single()

  if (error || !data) {
    console.error('[purchase] Supabase insert failed:', error)
    throw createError({ statusCode: 502, statusMessage: 'Failed to save purchase' })
  }

  return {
    purchaseId: data.id,
    offerId: offer.id,
    createdAt: data.created_at,
  }
})
