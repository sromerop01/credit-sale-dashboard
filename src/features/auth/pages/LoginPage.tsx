import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

const loginSchema = z.object({
  email: z.email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})

type LoginInputs = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [magicEmail, setMagicEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  })

  if (isLoading) return null
  if (isAuthenticated) return <Navigate to="/rutas" replace />

  const handleLogin = async (data: LoginInputs) => {
    setError(null)
    setLoading(true)
    try {
      await login({ email: data.email, password: data.password })
      navigate('/rutas', { replace: true })
    } catch {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Enviamos un enlace de acceso a ${magicEmail}`)
  }

  return (
    <div className="grid flex-1 grid-cols-[1.1fr_1fr] items-start gap-10 px-8 py-10 max-lg:grid-cols-1 max-lg:gap-8 max-sm:gap-6 max-sm:px-5 max-sm:py-6">
      <section className="flex min-h-[60vh] flex-col justify-between max-lg:min-h-0">
        <h1 className="m-0 text-[clamp(72px,10vw,168px)] font-bold leading-[0.95] tracking-[-0.03em] text-black">
          Bienvenido de nuevo
        </h1>
      </section>

      <section className="mt-12 flex w-full max-w-[480px] flex-col gap-6 justify-self-end max-lg:mt-0 max-lg:max-w-full max-lg:justify-self-stretch">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleLogin)}>
          <Input
            label="Correo"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-[13px] font-medium text-rust">{errors.email.message}</p>
          )}
          <Input
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-[13px] font-medium text-rust">{errors.password.message}</p>
          )}
          {error && (
            <p className="text-[13px] font-medium text-rust">{error}</p>
          )}
          <div className="mt-2 flex items-center justify-between gap-4">
            <a
              href="#recover"
              className="text-[13px] font-bold text-black underline underline-offset-[3px]"
            >
              ¿Has olvidado tu contraseña?
            </a>
            <Button type="submit" variant="ghost" disabled={loading || !isValid}>
              {loading ? 'Entrando…' : 'Iniciar sesión'}
            </Button>
          </div>
        </form>

        <div className="my-2 h-px bg-black opacity-60" />

        <form className="flex flex-col gap-3" onSubmit={handleMagicLink}>
          <p className="mb-1 text-[13px] text-black">
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
          <Button type="submit" variant="ghost" className="mt-2 self-start">
            Inicia sesión con tu correo electrónico
          </Button>
          <a
            href="#solicitar"
            className="mt-8 inline-block self-start text-xs font-bold uppercase tracking-[0.08em] text-black underline underline-offset-4"
          >
            Solicitar acceso
          </a>
        </form>
      </section>
    </div>
  )
}
