import type { LoginPayload } from './types'

const API_URL = import.meta.env.VITE_API_URL

async function request(path: string, options: RequestInit = {}): Promise<void> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw {
      response: {
        data: errorData || { message: 'Error en la solicitud' },
        status: response.status,
      },
    }
  }
}

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
