import type { Route } from '../../types/types'
import styles from './RouteCard.module.css'

interface RouteCardProps {
  route: Route
  onClick?: () => void
}

const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)} M`
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)} K`
  return `$${amount}`
}

const arrearsLabel = (count: number): string => {
  if (count === 0) return 'Sin mora'
  if (count === 1) return '1 en mora'
  return `${count} en mora`
}

export function RouteCard({ route, onClick }: RouteCardProps) {
  return (
    <article className={`${styles.card} ${styles[route.color]}`}>
      <div>
        <p className={styles.tag}>
          Ruta {route.code} · {route.zone}
        </p>
        <h3 className={styles.title}>{route.name}</h3>
        <p className={styles.sub}>
          {route.collectorName
            ? `Cobrador: ${route.collectorName}`
            : 'Sin cobrador asignado'}
        </p>
      </div>
      <div>
        <div className={styles.meta}>
          <div>{route.clientCount} clientes</div>
          <div>{formatCurrency(route.collectedAmount)}</div>
          <div>{arrearsLabel(route.arrearsCount)}</div>
        </div>
        <button onClick={onClick} className={styles.link}>
          {route.collectorName ? 'Ver ruta' : 'Asignar cobrador'}
        </button>
      </div>
    </article>
  )
}
