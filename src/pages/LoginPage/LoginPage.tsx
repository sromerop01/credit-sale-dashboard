import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [magicEmail, setMagicEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isLoading) return null
  if (isAuthenticated) return <Navigate to="/rutas" replace />

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/rutas', { replace: true })
    } catch {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Enviaríamos un enlace de acceso a ${magicEmail}`)
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Bienvenido de nuevo
        </h1>
        <a href="#solicitar" className={styles.requestAccess}>
          Solicitar acceso
        </a>
      </section>

      <section className={styles.forms}>
        <form className={styles.formBlock} onSubmit={handleLogin}>
          <Input
            label="Correo"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.row}>
            <a href="#recover" className={styles.forgot}>
              ¿Has olvidado tu contraseña?
            </a>
            <Button type="submit" variant="ghost" disabled={loading}>
              {loading ? 'Entrando…' : 'Iniciar sesión'}
            </Button>
          </div>
        </form>

        <div className={styles.divider} />

        <form className={styles.formBlock} onSubmit={handleMagicLink}>
          <p className={styles.magicHint}>
            O accede con un enlace enviado por correo electrónico
          </p>
          <Input
            label="Correo"
            type="email"
            autoComplete="email"
            required
            value={magicEmail}
            onChange={(e) => setMagicEmail(e.target.value)}
          />
          <Button type="submit" variant="ghost" className={styles.magicBtn}>
            Inicia sesión con tu correo electrónico
          </Button>
        </form>
      </section>
    </div>
  )
}
