import AppRoutes from './Routes'

import { UserAuthProvider } from '@/contexts/UserAuthContext'
import { UserProvider } from '@/contexts/UserContext'

function App() {
  return (
    <UserAuthProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </UserAuthProvider>
  )
}

export default App
