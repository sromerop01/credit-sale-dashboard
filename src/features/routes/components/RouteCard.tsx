import type { AcumenColor } from '@/types'
import type { Route } from '../types'

interface RouteCardProps {
  route: Route
  onClick?: () => void
}

/* Fondo de la card + color del borde superior de las metas
   (en cards oscuras las lineas van blancas / cream). */
const colorStyles: Record<AcumenColor, { card: string; meta: string }> = {
  cyan: { card: 'bg-cyan text-black', meta: 'border-black' },
  royal: { card: 'bg-royal text-white', meta: 'border-white' },
  green: { card: 'bg-green text-black', meta: 'border-black' },
  mint: { card: 'bg-mint text-black', meta: 'border-black' },
  rust: { card: 'bg-rust text-white', meta: 'border-white' },
  mostaza: { card: 'bg-mostaza text-white', meta: 'border-white' },
  navy: { card: 'bg-navy text-cream', meta: 'border-cream' },
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
  const { card, meta } = colorStyles[route.color]

  return (
    <article
      className={`flex min-h-60 flex-col justify-between rounded-none px-5 pt-6 pb-5 ${card}`}
    >
      <div>
        <p className="mb-3 text-xs font-medium">
          Ruta {route.code} · {route.zone}
        </p>
        <h3 className="mb-1 text-2xl font-bold leading-[1.15] tracking-[-0.01em]">
          {route.name}
        </h3>
        <p className="text-[13px] opacity-85">
          {route.collectorName
            ? `Cobrador: ${route.collectorName}`
            : 'Sin cobrador asignado'}
        </p>
      </div>
      <div>
        <div className="mt-4 mb-3 flex gap-3">
          {[
            `${route.clientCount} clientes`,
            formatCurrency(route.collectedAmount),
            arrearsLabel(route.arrearsCount),
          ].map((text) => (
            <div
              key={text}
              className={`flex-1 border-t pt-1 text-[11px] font-medium ${meta}`}
            >
              {text}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onClick}
          className="cursor-pointer bg-transparent p-0 text-left text-[13px] font-medium underline hover:opacity-70"
        >
          {route.collectorName ? 'Ver ruta' : 'Asignar cobrador'}
        </button>
      </div>
    </article>
  )
}
