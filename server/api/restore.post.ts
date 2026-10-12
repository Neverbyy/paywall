import type { OfferId, RestoreResponse } from '#shared/types/paywall'
import { DEVICE_COOKIE } from '../middleware/device-id'

export default defineEventHandler(async (event): Promise<RestoreResponse> => {
  const deviceId = getCookie(event, DEVICE_COOKIE) ?? event.context.deviceId
  if (!deviceId) return { purchase: null }

  const { data, error } = await useSupabase()
    .from('test_purchases')
    .select('id, offer_id, created_at')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[restore] Supabase select failed:', error)
    throw createError({ statusCode: 502, statusMessage: 'Failed to restore purchases' })
  }

  return {
    purchase: data
      ? { purchaseId: data.id, offerId: data.offer_id as OfferId, createdAt: data.created_at }
      : null,
  }
})
