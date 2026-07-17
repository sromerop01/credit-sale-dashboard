import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Route as RouteIcon,
  Users,
  BarChart3,
  UserCircle2,
  Settings,
  X,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface NavItem {
  to: string
  icon: LucideIcon
  label: string
  disabled?: boolean
}

interface NavGroup {
  label: string
  items: NavItem[]
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const itemBase =
  'flex cursor-pointer items-center gap-2 px-3 py-2 text-[13px] text-cream opacity-75 transition duration-100 hover:opacity-100'

const groups: NavGroup[] = [
  {
    label: 'Inicio',
    items: [
      { to: '/resumen', icon: LayoutDashboard, label: 'Resumen', disabled: true },
    ],
  },
  {
    label: 'Portafolio',
    items: [
      { to: '/prestamos', icon: Wallet, label: 'Préstamos', disabled: true },
      { to: '/rutas', icon: RouteIcon, label: 'Rutas' },
      { to: '/clientes', icon: Users, label: 'Clientes' },
    ],
  },
  {
    label: 'Análisis',
    items: [
      { to: '/reportes', icon: BarChart3, label: 'Reportes', disabled: true },
      { to: '/cobradores', icon: UserCircle2, label: 'Cobradores', disabled: true },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { to: '/configuracion', icon: Settings, label: 'Configuración', disabled: true },
    ],
  },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside
      className={`sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-navy px-3 py-5 text-cream max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-20 max-md:transition-transform max-md:duration-200 ${
        isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
      }`}
    >
      <button
        type="button"
        className="mb-4 hidden cursor-pointer items-center justify-center self-end p-1 text-cream opacity-60 hover:opacity-100 max-md:flex"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        <X size={16} />
      </button>
      <div className="mb-7 flex items-center gap-2 px-1 text-sm font-bold text-cream">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-xs bg-cyan text-sm font-bold text-navy">
          C
        </div>
        <span>Credit Sale</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.label} className="mb-4">
            <div className="mx-1 mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-mint/75">
              {g.label}
            </div>
            {g.items.map((item) => {
              const Icon = item.icon
              if (item.disabled) {
                return (
                  <div
                    key={item.to}
                    className={`${itemBase} cursor-not-allowed opacity-35 hover:opacity-35`}
                    aria-disabled="true"
                    title="Próximamente"
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </div>
                )
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `${itemBase} ${
                      isActive ? 'bg-cyan font-medium text-navy opacity-100' : ''
                    }`
                  }
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2 border-t border-cream/20 pt-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rust text-[11px] font-bold text-white">
          SR
        </div>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium text-cream">
            Santiago R.
          </div>
          <div className="text-[11px] text-mint/70">Administrador</div>
        </div>
        <button
          type="button"
          className="ml-auto shrink-0 p-1 text-mint opacity-55 transition-opacity duration-100 hover:opacity-100"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  )
}
