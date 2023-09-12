import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
  LandingPage,
  ClientAppPage,
  NotFoundPage,
  AdminSigninPage,
  AdminSignupPage,
  AdminDashboardPage
} from './pages'

import { useUserAuth } from '@/contexts/UserAuthContext'

const AppRoutes = () => {
  const { isUserLogged } = useUserAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* ======================================================= */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />

        {/* ======================================================= */}

        <Route path="/:userId" element={<ClientAppPage />} />
        <Route path="/:userId/not-found" element={<NotFoundPage />} />

        {/* ======================================================= */}

        <Route
          path="/admin/entrar"
          element={
            <PublicRoute isAuthenticated={isUserLogged}>
              <AdminSigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/cadastrar"
          element={
            <PublicRoute isAuthenticated={isUserLogged}>
              <AdminSignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute isAuthenticated={isUserLogged}>
              <AdminDashboardPage />
            </PrivateAdminRoute>
          }
        />

        {/* ======================================================= */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

interface RouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const PrivateAdminRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/entrar" replace />
  }

  return children
}

const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}
