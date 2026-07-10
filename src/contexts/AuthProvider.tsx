import { useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { authApi } from '../api/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authApi
      .me()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(() => {
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(async () => {
    setIsAuthenticated(false)
    await authApi.logout().catch(() => {})
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout }),
    [isAuthenticated, isLoading, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
