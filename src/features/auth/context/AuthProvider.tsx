import { useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { authApi } from '../api'
import { LoginPayload } from '../types'
import { getErrorKind } from '@/lib/http'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<'server' | 'network' | null>(null)

  useEffect(() => {
    authApi
      .me()
      .then(() => setIsAuthenticated(true))
      .catch((err) => {
        setIsAuthenticated(false)

        switch (getErrorKind(err)) {
          case 'client':
            // 4xx (ej. 401): esperado, el usuario no tiene sesión.
            setAuthError(null)
            break
          case 'server':
            console.error('Error del servidor al verificar sesión', err)
            setAuthError('server')
            break
          case 'network':
            console.error('No se pudo conectar con la API', err)
            setAuthError('network')
            break
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    await authApi.login(payload)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(async () => {
    setIsAuthenticated(false)
    await authApi.logout().catch(() => {})
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, authError, login, logout }),
    [isAuthenticated, isLoading, authError, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
