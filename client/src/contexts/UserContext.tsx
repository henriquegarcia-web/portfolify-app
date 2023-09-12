/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

interface UserContextData {
  userId: string | null
}

// ===================================================================

export const UserContext = createContext<UserContextData>({} as UserContextData)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)

  // =================================================================

  // useEffect(() => {
  //   console.log('LOGADO ======>', isUserLogged)
  // }, [isUserLogged])

  const UserContextValues = useMemo(() => {
    return {
      userId
    }
  }, [userId])

  return (
    <UserContext.Provider value={UserContextValues}>
      {children}
    </UserContext.Provider>
  )
}

function useUser(): UserContextData {
  const context = useContext(UserContext)

  if (!context) throw new Error('useUser must be used within a UserProvider')

  return context
}

export { UserProvider, useUser }
