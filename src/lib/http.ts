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
