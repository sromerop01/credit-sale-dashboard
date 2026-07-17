import type { Client } from '../types'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'

interface ClientTableProps {
  clients: Client[]
}

const rowBase =
  'grid grid-cols-[36px_1.4fr_1fr_130px_110px] items-center gap-3 border-b border-black max-sm:grid-cols-[36px_1fr_110px_90px]'

const formatBalance = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)} M`
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)} K`
  return `$${amount}`
}

const StatusBadge = ({ client }: { client: Client }) => {
  if (client.status === 'current') return <Badge tone="green">Al día</Badge>
  if (client.status === 'arrears')
    return <Badge tone="rust">Mora {client.arrearsDays} d</Badge>
  return <Badge tone="royal">Nuevo</Badge>
}

export function ClientTable({ clients }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="border-t border-black py-8 text-center text-[13px] text-black/65">
        Sin resultados. Prueba con otro término de búsqueda.
      </div>
    )
  }

  return (
    <div className="border-t border-black">
      <div
        className={`${rowBase} py-2 text-[10px] font-medium uppercase tracking-[0.06em] opacity-60`}
      >
        <div></div>
        <div>Cliente</div>
        <div className="max-sm:hidden">Ruta</div>
        <div className="text-center">Estado</div>
        <div className="text-right">Saldo</div>
      </div>
      {clients.map((c) => (
        <div key={c.id} className={`${rowBase} py-3 text-sm`}>
          <Avatar initials={c.initials} color={c.avatarColor} size="sm" />
          <div className="font-medium">{c.name}</div>
          <div className="text-[13px] opacity-75 max-sm:hidden">{c.routeLabel}</div>
          <div className="text-center">
            <StatusBadge client={c} />
          </div>
          <div className="text-right font-medium">{formatBalance(c.balance)}</div>
        </div>
      ))}
    </div>
  )
}
