import type { AcumenColor } from '@/types'

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
