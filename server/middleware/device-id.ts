import { randomUUID } from 'node:crypto'

export const DEVICE_COOKIE = 'pw_device_id'

export default defineEventHandler((event) => {
  if (getCookie(event, DEVICE_COOKIE)) return

  const deviceId = randomUUID()
  setCookie(event, DEVICE_COOKIE, deviceId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: !import.meta.dev,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  event.context.deviceId = deviceId
})
