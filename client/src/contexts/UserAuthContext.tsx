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

import { handleGetUserData, handleLogoutUser } from '@/firebase/auth'
import { auth, onAuthStateChanged } from '@/firebase/firebase'

import { toaster } from 'evergreen-ui'

import { IUserData } from '@/@types/Auth'

interface UserAuthContextData {
  userId: string | null
  userData: IUserData | null
  isUserLogged: boolean

  handleLogout: () => void
}

// ===================================================================

export const UserAuthContext = createContext<UserAuthContextData>(
  {} as UserAuthContextData
)

const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<IUserData | null>(null)

  // -----------------------------------------------------------------

  const isUserLogged = useMemo(() => {
    return !!userId
  }, [userId])

  // =================================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const uid = user.uid
        setUserId(uid)

        const userDataResponse = await handleGetUserData()
        setUserData(userDataResponse)
      } else {
        setUserId(null)
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  // =================================================================

  const handleLogout = useCallback(async () => {
    const response = await handleLogoutUser()

    console.log('deslogando', response)

    if (!response) {
      toaster.danger('Falha ao fazer login')
      return
    }
  }, [])

  // =================================================================

  useEffect(() => {
    console.log('LOGADO ======>', isUserLogged)
  }, [isUserLogged])

  const UserAuthContextValues = useMemo(() => {
    return {
      userId,
      userData,
      isUserLogged,
      handleLogout
    }
  }, [userId, userData, isUserLogged, handleLogout])

  return (
    <UserAuthContext.Provider value={UserAuthContextValues}>
      {children}
    </UserAuthContext.Provider>
  )
}

function useUserAuth(): UserAuthContextData {
  const context = useContext(UserAuthContext)

  if (!context)
    throw new Error('useUserAuth must be used within a UserProvider')

  return context
}

export { UserAuthProvider, useUserAuth }
