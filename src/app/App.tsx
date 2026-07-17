import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { AuthShell } from '@/components/layout/AuthShell'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { RoutesPage } from '@/features/routes/pages/RoutesPage'
import { ClientsPage } from '@/features/clients/pages/ClientsPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas (auth) */}
      <Route element={<AuthShell />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas internas — requieren autenticación */}
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/rutas" replace />} />
        <Route path="/rutas" element={<RoutesPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
