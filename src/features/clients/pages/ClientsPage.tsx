import { useState, useMemo } from 'react'
import { ClientTable } from '../components/ClientTable'
import { Button } from '@/components/ui/Button'
import { mockClients } from '../mock'
import { mockRoutes } from '@/features/routes/mock'

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
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-black bg-cream px-6 py-3 max-sm:px-4">
        <div className="text-xs text-black/70">
          Portafolio · <strong className="font-medium">Clientes</strong>
        </div>
        <Button>+ Nuevo cliente</Button>
      </header>

      <section className="bg-cyan px-8 pt-12 pb-10 text-black max-sm:px-5 max-sm:pt-8 max-sm:pb-7">
        <h1 className="mb-2 text-hero max-sm:text-[clamp(32px,9vw,56px)]">
          Clientes
        </h1>
        <p className="text-sm">
          {mockClients.length} clientes registrados · gestionados en{' '}
          {mockRoutes.length} rutas activas
        </p>
      </section>

      <div className="px-8 pt-7 pb-10 max-sm:px-4 max-sm:pt-5 max-sm:pb-8">
        <input
          type="text"
          className="mb-3 w-full rounded-none border border-black bg-transparent px-4 py-3 text-sm text-black outline-none placeholder:text-black/50 focus:bg-cream-soft"
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
