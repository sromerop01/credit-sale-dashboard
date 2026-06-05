import { RouteCard } from '../components/modules/RouteCard'
import { Button } from '../../../dashboad-react-laravel/src/components/ui/Button'
import { mockRoutes } from '../data/mock'
import styles from './RoutesPage.module.css'

export function RoutesPage() {
  const activeCount = mockRoutes.filter((r) => r.collectorName !== null).length
  const collectorCount = new Set(
    mockRoutes.filter((r) => r.collectorName).map((r) => r.collectorName)
  ).size

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.bc}>
          Portafolio · <strong>Rutas de cobro</strong>
        </div>
        <Button>+ Nuevo cobro</Button>
      </header>

      <section className={styles.hero}>
        <h1>Rutas de cobro</h1>
        <p>
          Martes 5 de mayo · {activeCount} rutas activas · {collectorCount}{' '}
          cobradores en campo
        </p>
      </section>

      <div className={styles.grid}>
        {mockRoutes.map((r) => (
          <RouteCard key={r.id} route={r} />
        ))}
      </div>
    </div>
  )
}
