import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Route as RouteIcon,
  Users,
  BarChart3,
  UserCircle2,
  Settings,
  X,
  type LucideIcon,
} from 'lucide-react'
import styles from './Sidebar.module.css'

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
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar menú">
        <X size={16} />
      </button>
      <div className={styles.logo}>
        <div className={styles.mark}>C</div>
        <span>Credit Sale</span>
      </div>

      <nav className={styles.nav}>
        {groups.map((g) => (
          <div key={g.label} className={styles.group}>
            <div className={styles.groupLabel}>{g.label}</div>
            {g.items.map((item) => {
              const Icon = item.icon
              if (item.disabled) {
                return (
                  <div
                    key={item.to}
                    className={`${styles.item} ${styles.disabled}`}
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
                    `${styles.item} ${isActive ? styles.active : ''}`
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

      <div className={styles.user}>
        <div className={styles.userAvatar}>SR</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Santiago R.</div>
          <div className={styles.userRole}>Administrador</div>
        </div>
      </div>
    </aside>
  )
}
