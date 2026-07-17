import { RouteCard } from '../components/RouteCard'
import { Button } from '@/components/ui/Button'
import { mockRoutes } from '../mock'

export function RoutesPage() {
  const activeCount = mockRoutes.filter((r) => r.collectorName !== null).length
  const collectorNames = new Set<string>()
  for (const r of mockRoutes) {
    if (r.collectorName) collectorNames.add(r.collectorName)
  }
  const collectorCount = collectorNames.size

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-black bg-cream px-6 py-3 max-sm:px-4">
        <div className="text-xs text-black/70">
          Portafolio · <strong className="font-medium">Rutas de cobro</strong>
        </div>
        <Button>+ Nuevo cobro</Button>
      </header>

      <section className="bg-rust px-8 pt-12 pb-10 text-white max-sm:px-5 max-sm:pt-8 max-sm:pb-7">
        <h1 className="mb-2 text-hero max-sm:text-[clamp(32px,9vw,56px)]">
          Rutas de cobro
        </h1>
        <p className="text-sm opacity-95">
          Martes 5 de mayo · {activeCount} rutas activas · {collectorCount}{' '}
          cobradores en campo
        </p>
      </section>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 min-[1100px]:grid-cols-4">
        {mockRoutes.map((r) => (
          <RouteCard key={r.id} route={r} />
        ))}
      </div>
    </div>
  )
}
