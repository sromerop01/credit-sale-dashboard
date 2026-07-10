import type { Client } from '../../types'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import styles from './ClientTable.module.css'

interface ClientTableProps {
  clients: Client[]
}

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
      <div className={styles.empty}>
        Sin resultados. Prueba con otro término de búsqueda.
      </div>
    )
  }

  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.head}`}>
        <div></div>
        <div>Cliente</div>
        <div className={styles.route}>Ruta</div>
        <div className={styles.center}>Estado</div>
        <div className={styles.right}>Saldo</div>
      </div>
      {clients.map((c) => (
        <div key={c.id} className={styles.row}>
          <Avatar initials={c.initials} color={c.avatarColor} size="sm" />
          <div className={styles.name}>{c.name}</div>
          <div className={styles.route}>{c.routeLabel}</div>
          <div className={styles.center}>
            <StatusBadge client={c} />
          </div>
          <div className={styles.balance}>{formatBalance(c.balance)}</div>
        </div>
      ))}
    </div>
  )
}
