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

export interface LoginResponse {
  token: string
}

export interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export type LoginInputs = {
  email: string
  password: string
}
