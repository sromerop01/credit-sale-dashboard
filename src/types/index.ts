export type AcumenColor = 'cyan' | 'royal' | 'green' | 'rust' | 'mint' | 'navy' | 'mostaza'

export interface Route {
  id: string
  code: string
  zone: string
  name: string
  collectorName: string | null
  clientCount: number
  collectedAmount: number
  arrearsCount: number
  color: AcumenColor
}

export type ClientStatus = 'current' | 'arrears' | 'new'

export interface Client {
  id: string
  initials: string
  name: string
  routeId: string
  routeLabel: string
  status: ClientStatus
  arrearsDays?: number
  balance: number
  avatarColor: AcumenColor
}

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
