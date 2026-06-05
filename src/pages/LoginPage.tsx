import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../dashboad-react-laravel/src/components/ui/Button'
import { Input } from '../../../dashboad-react-laravel/src/components/ui/Input'
import styles from '../../../dashboad-react-laravel/src/pages/LoginPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [magicEmail, setMagicEmail] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: conectar con la API real de auth
    navigate('/rutas')
  }

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: enviar enlace por correo
    alert(`Enviaríamos un enlace de acceso a ${magicEmail}`)
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Bienvenido<br />de nuevo
        </h1>
        <p className={styles.subtitle}>
          Credit Sale · Plataforma de cartera, rutas y cobranza
        </p>
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
          <div className={styles.row}>
            <a href="#recover" className={styles.forgot}>
              ¿Has olvidado tu contraseña?
            </a>
            <Button type="submit" variant="ghost">
              Iniciar sesión
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
