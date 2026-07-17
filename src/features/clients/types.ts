import type { AcumenColor } from '@/types'

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
