import { request } from '@/lib/http'
import type { LoginPayload } from './types'

export const authApi = {
  login: (payload: LoginPayload): Promise<void> =>
    request('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: (): Promise<void> =>
    request('/v1/auth/logout', { method: 'POST' }),

  me: (): Promise<void> =>
    request('/v1/auth/me'),
}
