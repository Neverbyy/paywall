import type { OffersResponse } from '#shared/types/paywall'
import { offers } from '../data/offers'

export default defineEventHandler((): OffersResponse => ({ offers }))
