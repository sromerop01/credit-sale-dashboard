import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { AuthShell } from './components/layout/AuthShell'
import { RoutesPage } from './pages/RoutesPage'
import { ClientsPage } from './pages/ClientsPage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas (auth) */}
      <Route element={<AuthShell />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas internas (con sidebar) */}
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/rutas" replace />} />
        <Route path="/rutas" element={<RoutesPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/rutas" replace />} />
    </Routes>
  )
}
