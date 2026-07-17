export interface LoginPayload {
  email: string
  password: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  authError: 'server' | 'network' | null
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

export type LoginInputs = {
  email: string
  password: string
}
