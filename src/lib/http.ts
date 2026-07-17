const API_URL = import.meta.env.VITE_API_URL

/**
 * Cliente HTTP base: JSON + cookies de sesión contra VITE_API_URL.
 * En error HTTP lanza { response: { data, status } } (ver getErrorKind).
 */
export async function request<T = void>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
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

  // Tolera respuestas sin cuerpo (204, logout, etc.)
  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

export type ErrorKind = 'client' | 'server' | 'network'

export interface ApiError {
  response: {
    data: unknown
    status: number
  }
}

/** Extrae el status HTTP del error que lanza request(), o null si fue error de red. */
export function getErrorStatus(err: unknown): number | null {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const status = (err as ApiError).response?.status
    return typeof status === 'number' ? status : null
  }
  return null
}

/** Clasifica el error en 4xx (client), 5xx (server) o sin conexión (network). */
export function getErrorKind(err: unknown): ErrorKind {
  const status = getErrorStatus(err)
  if (status === null) return 'network'
  if (status >= 500) return 'server'
  return 'client'
}
