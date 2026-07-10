import { useState, useMemo } from 'react'
import { ClientTable } from '../../components/features/ClientTable'
import { Button } from '../../components/ui/Button'
import { mockClients, mockRoutes } from '../../data/mock'
import styles from './ClientsPage.module.css'

export function ClientsPage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return mockClients
    return mockClients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.routeLabel.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.bc}>
          Portafolio · <strong>Clientes</strong>
        </div>
        <Button>+ Nuevo cliente</Button>
      </header>

      <section className={styles.hero}>
        <h1>Clientes</h1>
        <p>
          {mockClients.length} clientes registrados · gestionados en{' '}
          {mockRoutes.length} rutas activas
        </p>
      </section>

      <div className={styles.body}>
        <input
          type="text"
          className={styles.search}
          placeholder="Buscar por nombre, cédula o teléfono…"
          aria-label="Buscar clientes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ClientTable clients={filtered} />
      </div>
    </div>
  )
}
